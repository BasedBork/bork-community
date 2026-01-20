# MCP Deep Dive

Creating and extending MCP servers.

## MCP Protocol Overview

### Architecture

```
Claude Code ←→ MCP Client ←→ MCP Server ←→ External Service
                  │              │
            (in Claude)    (you build this)
```

### Protocol Messages

```
initialize    → Handshake and capabilities
tools/list    → List available tools
tools/call    → Execute a tool
resources/*   → Access resources
prompts/*     → Get prompt templates
```

## Building an MCP Server

### Basic Structure (TypeScript)

```typescript
import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

const server = new Server({
  name: "my-mcp-server",
  version: "1.0.0",
});

// Define tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "my_tool",
      description: "Does something useful",
      inputSchema: {
        type: "object",
        properties: {
          param1: { type: "string", description: "First parameter" },
        },
        required: ["param1"],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "my_tool") {
    const { param1 } = request.params.arguments;
    const result = await doSomething(param1);
    return { content: [{ type: "text", text: result }] };
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start server
const transport = new StdioServerTransport();
server.connect(transport);
```

### Basic Structure (Python)

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

app = Server("my-mcp-server")

@app.list_tools()
async def list_tools():
    return [
        Tool(
            name="my_tool",
            description="Does something useful",
            inputSchema={
                "type": "object",
                "properties": {
                    "param1": {"type": "string", "description": "First param"}
                },
                "required": ["param1"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "my_tool":
        result = await do_something(arguments["param1"])
        return [TextContent(type="text", text=result)]
    raise ValueError(f"Unknown tool: {name}")

async def main():
    async with stdio_server() as (read, write):
        await app.run(read, write)
```

## Tool Design

### Input Schema

```typescript
inputSchema: {
  type: "object",
  properties: {
    // Required with description
    query: {
      type: "string",
      description: "Search query to execute"
    },
    // Optional with default
    limit: {
      type: "number",
      description: "Maximum results",
      default: 10
    },
    // Enum options
    format: {
      type: "string",
      enum: ["json", "text", "markdown"],
      description: "Output format"
    },
    // Nested objects
    filters: {
      type: "object",
      properties: {
        startDate: { type: "string" },
        endDate: { type: "string" }
      }
    }
  },
  required: ["query"]
}
```

### Tool Response Patterns

```typescript
// Simple text response
return { content: [{ type: "text", text: "Result text" }] };

// Structured data
return {
  content: [
    {
      type: "text",
      text: JSON.stringify(data, null, 2),
    },
  ],
};

// Multiple content blocks
return {
  content: [
    { type: "text", text: "## Results" },
    { type: "text", text: JSON.stringify(results) },
    { type: "text", text: "## Summary" },
    { type: "text", text: summary },
  ],
};

// Error response
throw new Error("Descriptive error message");
```

## Resources

### Listing Resources

```typescript
server.setRequestHandler("resources/list", async () => ({
  resources: [
    {
      uri: "myapp://documents/readme",
      name: "README",
      description: "Project readme file",
      mimeType: "text/markdown",
    },
  ],
}));
```

### Reading Resources

```typescript
server.setRequestHandler("resources/read", async (request) => {
  const { uri } = request.params;
  const content = await fetchResource(uri);
  return {
    contents: [
      {
        uri,
        mimeType: "text/plain",
        text: content,
      },
    ],
  };
});
```

## Authentication

### Environment Variables

```typescript
const apiKey = process.env.SERVICE_API_KEY;
if (!apiKey) {
  throw new Error("SERVICE_API_KEY required");
}

const client = new ServiceClient({ apiKey });
```

### OAuth Flow

```typescript
// Store tokens
let accessToken = process.env.ACCESS_TOKEN;
let refreshToken = process.env.REFRESH_TOKEN;

async function getValidToken() {
  if (isExpired(accessToken)) {
    const tokens = await refreshAccessToken(refreshToken);
    accessToken = tokens.access;
    refreshToken = tokens.refresh;
  }
  return accessToken;
}
```

## Error Handling

### Graceful Errors

```typescript
server.setRequestHandler("tools/call", async (request) => {
  try {
    return await handleTool(request);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return {
        content: [
          {
            type: "text",
            text: `Rate limited. Try again in ${error.retryAfter}s`,
          },
        ],
        isError: true,
      };
    }
    if (error instanceof AuthError) {
      return {
        content: [{ type: "text", text: "Authentication failed. Check credentials." }],
        isError: true,
      };
    }
    throw error;
  }
});
```

### Validation

```typescript
function validateInput(args: unknown): ValidatedArgs {
  if (!args || typeof args !== "object") {
    throw new Error("Arguments must be an object");
  }
  if (!("query" in args) || typeof args.query !== "string") {
    throw new Error("query must be a string");
  }
  return args as ValidatedArgs;
}
```

## Testing MCP Servers

### Manual Testing

```bash
# Start server
node dist/index.js

# In another terminal, send JSON-RPC
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

### Automated Testing

```typescript
import { Server } from "@modelcontextprotocol/sdk/server";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/testing";

describe("MCP Server", () => {
  let server: Server;

  beforeEach(() => {
    server = createServer();
  });

  it("lists tools", async () => {
    const transport = new InMemoryTransport();
    server.connect(transport);

    const response = await transport.request("tools/list", {});
    expect(response.tools).toHaveLength(3);
  });
});
```

## Deployment

### npm Package

```json
{
  "name": "@yourorg/mcp-server-myservice",
  "bin": {
    "mcp-server-myservice": "./dist/index.js"
  }
}
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

### Configuration

```json
{
  "servers": {
    "myservice": {
      "command": "mcp-server-myservice",
      "env": {
        "API_KEY": {"env": "MYSERVICE_API_KEY"}
      }
    }
  }
}
```

---

[← Agents Deep Dive](./AGENTS_DEEP_DIVE.md) | [Building Apps →](./BUILDING_APPS.md)
