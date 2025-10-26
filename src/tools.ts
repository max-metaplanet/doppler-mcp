import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const toolDefinitions: Tool[] = [
  {
    name: "doppler_secrets_get",
    description: "Get a secret value from Doppler",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the secret to retrieve",
        },
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
        config: {
          type: "string",
          description: "The Doppler config name (optional if set via doppler setup)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "doppler_secrets_list",
    description: "List all secrets in a Doppler config",
    inputSchema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
        config: {
          type: "string",
          description: "The Doppler config name (optional if set via doppler setup)",
        },
      },
    },
  },
  {
    name: "doppler_secrets_set",
    description: "Set a secret value in Doppler",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the secret to set",
        },
        value: {
          type: "string",
          description: "The value to set for the secret",
        },
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
        config: {
          type: "string",
          description: "The Doppler config name (optional if set via doppler setup)",
        },
      },
      required: ["name", "value"],
    },
  },
  {
    name: "doppler_secrets_delete",
    description: "Delete a secret from Doppler",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the secret to delete",
        },
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
        config: {
          type: "string",
          description: "The Doppler config name (optional if set via doppler setup)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "doppler_projects_list",
    description: "List all Doppler projects",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "doppler_projects_create",
    description: "Create a new Doppler project",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the project to create",
        },
        description: {
          type: "string",
          description: "Optional description for the project",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "doppler_configs_list",
    description: "List all configs in a Doppler project",
    inputSchema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
      },
    },
  },
  {
    name: "doppler_configs_create",
    description: "Create a new config in a Doppler project",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the config to create",
        },
        project: {
          type: "string",
          description: "The Doppler project name",
        },
        environment: {
          type: "string",
          description: "The environment for the config (e.g., dev, staging, prod)",
        },
      },
      required: ["name", "project", "environment"],
    },
  },
  {
    name: "doppler_environments_list",
    description: "List all environments in a Doppler project",
    inputSchema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
      },
    },
  },
  {
    name: "doppler_run",
    description: "Run a command with Doppler secrets injected as environment variables",
    inputSchema: {
      type: "object",
      properties: {
        command: {
          type: "string",
          description: "The command to run with Doppler secrets",
        },
        project: {
          type: "string",
          description: "The Doppler project name (optional if set via doppler setup)",
        },
        config: {
          type: "string",
          description: "The Doppler config name (optional if set via doppler setup)",
        },
      },
      required: ["command"],
    },
  },
  {
    name: "doppler_me",
    description: "Get information about the current authenticated Doppler user",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
