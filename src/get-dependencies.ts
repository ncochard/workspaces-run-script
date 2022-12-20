import { PackageDetails } from "./types";
import { unique } from "./utilities";

export function getDependencieNames(packages: PackageDetails[], pkgName: string): string[] {
    const pkg = packages.find(p => p.name === pkgName);
    const children = pkg?.dependencies ?? [];
    const grandChildren = children.reduce(
        (agg, child: string): string[] => [...agg, ...getDependencieNames(packages, child)],
        [] as string[]
    );
    const all = [pkgName, ...children, ...grandChildren];
    return unique(all);
}

export function getDependencies(packages: PackageDetails[], pkgName: string): PackageDetails[] {
    const names = getDependencieNames(packages, pkgName);
    return packages
        .filter(pkg => names.includes(pkg.name))
        .map(
            (pkg: PackageDetails): PackageDetails => ({
                ...pkg,
                dependencies: pkg.dependencies.filter(d => names.includes(d)),
            })
        );
}
