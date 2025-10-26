import { execSync } from "child_process";

interface DopplerArgs {
  [key: string]: unknown;
}

/**
 * Execute a Doppler CLI command
 */
export async function executeCommand(
  toolName: string,
  args: DopplerArgs
): Promise<any> {
  const command = buildDopplerCommand(toolName, args);

  try {
    const output = execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    // Try to parse as JSON, if it fails return raw output
    try {
      return JSON.parse(output);
    } catch {
      return { output: output.trim() };
    }
  } catch (error: any) {
    // Handle execution errors
    const stderr = error.stderr?.toString() || "";
    const stdout = error.stdout?.toString() || "";
    const message = stderr || stdout || error.message;
    throw new Error(`Doppler CLI command failed: ${message}`);
  }
}

/**
 * Build the Doppler CLI command based on the tool name and arguments
 */
function buildDopplerCommand(toolName: string, args: DopplerArgs): string {
  const parts = ["doppler"];

  // Helper to safely get string value
  const getString = (key: string): string | undefined => {
    const value = args[key];
    return typeof value === "string" ? value : undefined;
  };

  switch (toolName) {
    case "doppler_secrets_get":
      parts.push("secrets", "get", getString("name")!);
      if (getString("project")) parts.push("--project", getString("project")!);
      if (getString("config")) parts.push("--config", getString("config")!);
      parts.push("--json");
      break;

    case "doppler_secrets_list":
      parts.push("secrets", "list");
      if (getString("project")) parts.push("--project", getString("project")!);
      if (getString("config")) parts.push("--config", getString("config")!);
      parts.push("--json");
      break;

    case "doppler_secrets_set":
      parts.push("secrets", "set", `${getString("name")}=${getString("value")}`);
      if (getString("project")) parts.push("--project", getString("project")!);
      if (getString("config")) parts.push("--config", getString("config")!);
      parts.push("--json");
      break;

    case "doppler_secrets_delete":
      parts.push("secrets", "delete", getString("name")!);
      if (getString("project")) parts.push("--project", getString("project")!);
      if (getString("config")) parts.push("--config", getString("config")!);
      parts.push("--json", "--yes"); // --yes to skip confirmation
      break;

    case "doppler_projects_list":
      parts.push("projects", "list");
      parts.push("--json");
      break;

    case "doppler_projects_create":
      parts.push("projects", "create", getString("name")!);
      if (getString("description")) parts.push("--description", getString("description")!);
      parts.push("--json");
      break;

    case "doppler_configs_list":
      parts.push("configs", "list");
      if (getString("project")) parts.push("--project", getString("project")!);
      parts.push("--json");
      break;

    case "doppler_configs_create":
      parts.push("configs", "create", getString("name")!);
      parts.push("--project", getString("project")!);
      parts.push("--environment", getString("environment")!);
      parts.push("--json");
      break;

    case "doppler_environments_list":
      parts.push("environments", "list");
      if (getString("project")) parts.push("--project", getString("project")!);
      parts.push("--json");
      break;

    case "doppler_run":
      parts.push("run");
      if (getString("project")) parts.push("--project", getString("project")!);
      if (getString("config")) parts.push("--config", getString("config")!);
      parts.push("--", getString("command")!);
      // Note: doppler run doesn't support --json flag
      break;

    case "doppler_me":
      parts.push("me");
      parts.push("--json");
      break;

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }

  return parts.join(" ");
}
