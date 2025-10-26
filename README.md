# Doppler MCP Server

A Model Context Protocol (MCP) server that wraps the Doppler CLI for seamless secrets management integration with Claude and other MCP clients.

## Overview

This MCP server provides a bridge between MCP-compatible applications (like Claude Desktop) and the Doppler CLI, allowing you to manage secrets, projects, configs, and environments through natural language interactions.

## Prerequisites

- Node.js 18 or higher
- [Doppler CLI](https://docs.doppler.com/docs/install-cli) installed and authenticated
- An active Doppler account with appropriate permissions

## Installation

### From Source

```bash
# Clone or navigate to the repository
cd doppler-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

### Claude Desktop

Add this server to your Claude Desktop configuration file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "doppler": {
      "command": "node",
      "args": ["/absolute/path/to/doppler-mcp-server/build/index.js"]
    }
  }
}
```

### Other MCP Clients

For other MCP clients, configure them to run:

```bash
node /path/to/doppler-mcp-server/build/index.js
```

## Available Tools

The server exposes the following Doppler CLI operations as MCP tools:

### Secrets Management

- **doppler_secrets_get** - Get a specific secret value
  - Parameters: `name` (required), `project`, `config`

- **doppler_secrets_list** - List all secrets in a config
  - Parameters: `project`, `config`

- **doppler_secrets_set** - Set a secret value
  - Parameters: `name` (required), `value` (required), `project`, `config`

- **doppler_secrets_delete** - Delete a secret
  - Parameters: `name` (required), `project`, `config`

### Project Management

- **doppler_projects_list** - List all projects
  - Parameters: none

- **doppler_projects_create** - Create a new project
  - Parameters: `name` (required), `description`

### Config Management

- **doppler_configs_list** - List all configs in a project
  - Parameters: `project`

- **doppler_configs_create** - Create a new config
  - Parameters: `name` (required), `project` (required), `environment` (required)

### Environment Management

- **doppler_environments_list** - List all environments in a project
  - Parameters: `project`

### Utility

- **doppler_run** - Run a command with Doppler secrets injected
  - Parameters: `command` (required), `project`, `config`

- **doppler_me** - Get information about the authenticated user
  - Parameters: none

## Usage Examples

Once configured, you can interact with Doppler through your MCP client:

```
"List all my Doppler projects"
"Get the API_KEY secret from my production config"
"Set DATABASE_URL to postgres://... in the dev config"
"Create a new project called my-app"
"Show me all secrets in the staging config"
```

## Authentication

This server uses the Doppler CLI's authentication. Make sure you've authenticated the Doppler CLI before using this server:

```bash
doppler login
```

You can verify your authentication status:

```bash
doppler me
```

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

## How It Works

This server:

1. Listens for MCP tool requests via stdio
2. Translates tool calls into Doppler CLI commands
3. Executes the commands using your local Doppler CLI installation
4. Returns the results in JSON format back to the MCP client

## Troubleshooting

### "Command not found: doppler"

Make sure the Doppler CLI is installed and available in your PATH:

```bash
which doppler
doppler --version
```

### "Authentication required"

Authenticate with Doppler:

```bash
doppler login
```

### Server not appearing in Claude Desktop

1. Check that the path in `claude_desktop_config.json` is correct and absolute
2. Restart Claude Desktop completely
3. Check the Claude Desktop logs for errors

## Security Considerations

- This server executes Doppler CLI commands with the permissions of the authenticated user
- Secrets are transmitted through the MCP protocol - ensure your MCP client is trusted
- The server does not store any secrets, it only proxies requests to the Doppler CLI

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
