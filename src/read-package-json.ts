import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { PackageDetails } from "./types";

export function readPackageJson(path: string): PackageDetails | undefined {
    const file = join(path, "package.json");
    if (!existsSync(file)) {
        return undefined;
    }
    const pkgStr = readFileSync(file);
    const pkg = JSON.parse(pkgStr.toString());
    const scripts: string[] = Object.keys(pkg.scripts || {});
    const dependencies: string[] = Object.keys(pkg.dependencies || {});
    const devDependencies: string[] = Object.keys(pkg.devDependencies || {});
    const allDependencies: string[] = [...dependencies, ...devDependencies];
    const dedupedDependencies: string[] = allDependencies.filter((item, pos, self) => self.indexOf(item) === pos);
    return { name: pkg.name, dependencies: dedupedDependencies, scripts };
}

export function readPackagesJson(paths: string[]): PackageDetails[] {
    return paths.map(readPackageJson).filter(p => p !== undefined) as PackageDetails[];
}
