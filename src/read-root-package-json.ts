import { readFileSync } from "fs";
import { join } from "path";

export function readRootPackageJson(path: string): string[] {
    const pkgStr = readFileSync(join(path, "package.json"));
    const pkg = JSON.parse(pkgStr.toString());
    const workspaces: string[] = pkg.workspaces || [];
    return workspaces;
}
