import { getCommand } from "./command";
import { getWorkspacePackages } from "./get-workspace-packages";
import { getDependencies } from "./get-dependencies";
import { executeScripts } from "./execute-scripts";
import { PackageDetails, SequentialScript } from "./types";
import { executeCommand } from "./cross-spawn-promise";
import { prefixed } from "./feedback";

const getScript =
    (script: string) =>
    (pkg: PackageDetails): SequentialScript => ({
        dependencies: pkg.dependencies,
        name: pkg.name,
        execute: async () => {
            if (pkg.scripts.includes(script)) {
                prefixed(pkg.name, `Executing "yarn workspace ${pkg.name} ${script}"`);
                await executeCommand("yarn", ["workspace", pkg.name, script], pkg.name);
                prefixed(pkg.name, `Finished executing "yarn workspace ${pkg.name} ${script}"`);
            } else {
                prefixed(pkg.name, `No script "${script}" found in package.json.`);
            }
        },
    });

export async function main(): Promise<void> {
    const command = getCommand();
    const workspacePackages = getWorkspacePackages();
    const scripts = getDependencies(workspacePackages, command.package).map(getScript(command.script));
    await executeScripts(scripts, command);
}
