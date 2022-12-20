import { PackageDetails } from "./types";
import { join } from "path";
import { readRootPackageJson } from "./read-root-package-json";
import { expendGlobs } from "./expend-globs";
import { readPackagesJson } from "./read-package-json";

export function getWorkspacePackages(): PackageDetails[] {
    const rootPackageJson = join(process.cwd());
    const globs = readRootPackageJson(rootPackageJson);
    const folders = expendGlobs(process.cwd(), globs);
    const packages = readPackagesJson(folders);
    const validNames = packages.map(pkg => pkg.name);
    return packages.map(
        (pkg: PackageDetails): PackageDetails => ({
            ...pkg,
            dependencies: pkg.dependencies.filter(d => validNames.includes(d)),
        })
    );
}
