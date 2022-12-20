import glob from "glob";

export function expendGlobs(cwd: string, globs: string[]): string[] {
    return globs.reduce((agg: string[], current: string) => {
        let result = [...agg];
        glob.sync(current, { nodir: false, cwd }).forEach(newPath => {
            result = result.filter(r => !newPath.startsWith(r));
            result.push(newPath);
        });
        return result;
    }, [] as string[]);
}
