# Agents

Custom subagents for specialized tasks.

## What Are Agents?

Agents are specialized Claude instances that handle specific types of tasks. When Claude encounters a task matching an agent's expertise, it can delegate to that agent.

Think of agents as:
- Specialists with deep knowledge in one area
- Autonomous workers that complete tasks independently
- Custom configurations of Claude for specific jobs

## Built-in Agents

Claude Code includes several built-in agents:

| Agent | Purpose |
|-------|---------|
| `Explore` | Fast codebase exploration |
| `Plan` | Implementation planning |
| `Bash` | Command execution |

## Why Custom Agents?

Custom agents let you:

1. **Specialize** - Create experts for your domain
2. **Automate** - Handle repetitive tasks consistently
3. **Parallelize** - Run multiple agents simultaneously
4. **Encapsulate** - Package complex workflows

## Example Agents

| Agent | What It Does |
|-------|--------------|
| [explore-enhanced](./examples/explore-enhanced/) | Deep codebase analysis |
| [test-runner](./examples/test-runner/) | Run and analyze tests |
| [security-reviewer](./examples/security-reviewer/) | Security vulnerability scanning |

## When to Use Agents

### Good Use Cases
- Complex, multi-step tasks
- Tasks requiring specialized knowledge
- Parallel execution of independent work
- Consistent handling of recurring tasks

### When Not to Use
- Simple, one-off tasks
- Tasks requiring real-time user interaction
- When a skill would suffice

## Agents vs Skills

| Aspect | Skills | Agents |
|--------|--------|--------|
| Complexity | Simple commands | Complex workflows |
| Autonomy | User-guided | Self-directed |
| State | Stateless | Can maintain context |
| Execution | Inline | Background capable |

## Getting Started

1. Read [AGENT_GUIDE.md](./AGENT_GUIDE.md) for how to create agents
2. Check out the [examples](./examples/) for inspiration
3. Start simple, add complexity as needed

---

[← Tools Overview](../README.md) | [Agent Guide →](./AGENT_GUIDE.md)
