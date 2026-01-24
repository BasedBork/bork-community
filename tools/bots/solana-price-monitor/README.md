# Solana Price Monitor

A production-ready Telegram bot and CLI tool that monitors Solana tokens for price-move alerts. Get notified when tokens experience significant price movements over a 24-hour window.

## Features

- **Price Alerts**: Automatic alerts for 30% and 100% price movements (up and down)
- **24-Hour Monitoring Window**: Tracks prices from baseline for a full day
- **Telegram Bot**: Multi-user bot for tracking tokens via Telegram
- **Access Modes**: Private, public, or community mode with admin controls
- **Rate Limiting**: Per-user rate limiting to prevent abuse
- **State Persistence**: Survives restarts - monitoring state saved to disk
- **Webhook Notifications**: Optional webhook support for external integrations
- **Health Checks**: HTTP health endpoint for container orchestration
- **Cloud Ready**: Dockerfile and Fly.io configuration included

## Requirements

- Node.js 18 or higher
- npm or yarn

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd solana-price-monitor

# Install dependencies
npm install

# Build TypeScript
npm run build

# Set up environment
cp .env.example .env
# Edit .env with your bot token and settings

# Run the bot
npm run bot
```

## Telegram Bot

### Setup

1. **Create a bot** via [@BotFather](https://t.me/BotFather) on Telegram
   - Send `/newbot` and follow the prompts
   - Copy the bot token

2. **Get your user ID** (for private mode)
   - Message [@userinfobot](https://t.me/userinfobot) on Telegram
   - It will reply with your user ID

3. **Configure and run**
   ```bash
   export TELEGRAM_BOT_TOKEN=your_bot_token_here
   export TELEGRAM_MODE=private
   export ALLOWED_USER_IDS=your_user_id
   npm run bot
   ```

### Bot Commands

| Command | Description |
|---------|-------------|
| (paste CA) | Start monitoring that token |
| `/status` | Show your active monitors |
| `/stop <CA>` | Stop monitoring a specific token |
| `/stopall` | Stop all your monitors |
| `/help` | Show available commands |

### Admin Commands (community mode)

| Command | Description |
|---------|-------------|
| `/stats` | Show bot statistics |
| `/broadcast <msg>` | Send message to all active users |

## Access Modes

| Mode | Description |
|------|-------------|
| `private` | Only users in `ALLOWED_USER_IDS` can use the bot |
| `public` | Anyone can use the bot, no admin features |
| `community` | Anyone can use, users in `TELEGRAM_ADMIN_IDS` have admin commands |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TELEGRAM_BOT_TOKEN` | Yes | - | Bot token from @BotFather |
| `TELEGRAM_MODE` | No | `private` | Access mode: `private`, `public`, `community` |
| `ALLOWED_USER_IDS` | For private | - | Comma-separated allowed user IDs |
| `TELEGRAM_ADMIN_IDS` | For community | - | Comma-separated admin user IDs |
| `LOG_LEVEL` | No | `info` | Logging: `debug`, `info`, `warn`, `error` |
| `POLL_INTERVAL_MS` | No | `30000` | Price check interval (ms) |
| `MAX_MONITORS_PER_USER` | No | `10` | Monitor limit per user |
| `RATE_LIMIT_PER_MINUTE` | No | `20` | Commands per minute per user |
| `DATA_DIR` | No | `./data` | State file directory |
| `HEALTH_CHECK_PORT` | No | `8080` | Health endpoint port |

## Deployment

### Fly.io (Recommended)

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly
fly auth login

# Launch app (first time)
fly launch --no-deploy

# Create persistent volume for state
fly volumes create bot_data --size 1 --region iad

# Set secrets
fly secrets set TELEGRAM_BOT_TOKEN=your_token_here
fly secrets set TELEGRAM_MODE=community
fly secrets set TELEGRAM_ADMIN_IDS=your_user_id

# Deploy
fly deploy

# View logs
fly logs
```

### Docker

```bash
# Build image
docker build -t solana-price-monitor .

# Run with environment file
docker run --env-file .env -p 8080:8080 solana-price-monitor
```

### Docker Compose

```bash
# Start with docker-compose
docker-compose up --build

# Run in background
docker-compose up -d
```

## Health Checks

The bot exposes HTTP health endpoints on port 8080:

| Endpoint | Description |
|----------|-------------|
| `/health` | Full health status with metrics |
| `/ready` | Readiness check (200 if ready) |
| `/live` | Liveness check (always 200 if process is alive) |

Example response:
```json
{
  "status": "healthy",
  "uptime": 3600,
  "activeMonitors": 5,
  "lastPollTime": 1705320000000,
  "version": "1.0.0"
}
```

## CLI Usage

The CLI tool monitors a single token from the command line.

```bash
# With mint address as argument
node dist/index.js --mint EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

# Interactive prompt for mint address
node dist/index.js

# With custom interval (60 seconds)
node dist/index.js --mint <MINT_ADDRESS> --interval 60

# With webhook notifications
node dist/index.js --mint <MINT_ADDRESS> --webhook https://your-webhook.com/alerts
```

### CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--mint <address>` | `-m` | Solana token mint address | Interactive prompt |
| `--interval <seconds>` | `-i` | Polling interval in seconds | 30 |
| `--webhook <url>` | `-w` | Webhook URL for notifications | None |

## Alert Thresholds

| Alert Type | Condition | Description |
|------------|-----------|-------------|
| `UP_30` | price >= baseline x 1.30 | 30% price increase |
| `DOWN_30` | price <= baseline x 0.70 | 30% price decrease |
| `UP_100` | price >= baseline x 2.00 | 100% price increase (2x) |
| `DOWN_100` | price <= baseline x 0.50 | 50% price decrease (halved) |

Each alert fires **at most once** per 24-hour monitoring window.

## Project Structure

```
solana-price-monitor/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── telegram-bot.ts       # Telegram bot entry point
│   ├── config.ts             # Configuration loading & validation
│   ├── access-control.ts     # Multi-user access control
│   ├── rate-limiter.ts       # Token bucket rate limiter
│   ├── health.ts             # HTTP health check server
│   ├── bot-state.ts          # Multi-user bot state management
│   ├── telegram-notifier.ts  # Telegram notification adapter
│   ├── monitor.ts            # Main monitoring logic
│   ├── price-provider.ts     # DexScreener API implementation
│   ├── state.ts              # CLI state persistence
│   ├── alerts.ts             # Alert definitions and checking
│   ├── notifier.ts           # Webhook notifications
│   ├── utils.ts              # Utility functions
│   └── types.ts              # TypeScript interfaces
├── data/                     # State persistence (gitignored)
├── dist/                     # Compiled JavaScript
├── .env.example              # Environment variable template
├── Dockerfile                # Container build configuration
├── fly.toml                  # Fly.io deployment config
├── docker-compose.yml        # Local Docker development
├── package.json
├── tsconfig.json
└── README.md
```

## Popular Token Mint Addresses

| Token | Mint Address |
|-------|--------------|
| SOL (Wrapped) | `So11111111111111111111111111111111111111112` |
| USDC | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |
| USDT | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` |
| BONK | `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263` |
| JUP | `JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN` |

## Price Data Source

This tool uses the [DexScreener API](https://docs.dexscreener.com/api/reference), which:

- Is free to use (no API key required)
- Provides accurate DEX prices
- Supports all Solana tokens with liquidity

## Development

```bash
# Build
npm run build

# Type check without emitting
npm run typecheck

# Clean build artifacts
npm run clean
```

## Safety

This tool is **read-only** and safe to use:

- No private keys required
- No wallet connections
- Only fetches public price data
- No transaction signing capability

## License

MIT
