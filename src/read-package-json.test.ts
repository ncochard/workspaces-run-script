import { readPackageJson } from "./read-package-json";
import { join } from "path";
describe("readPackageJson", () => {
    it("works", () => {
        const path = join(__dirname, "..");
        const pkg = readPackageJson(path);
        if (!pkg) {
            throw new Error("Cannot be null");
        }
        expect(pkg.dependencies).toContain("commander");
        expect(pkg.dependencies).toContain("eslint");
        expect(pkg.name).toBe("workspaces-run-script");
        expect(pkg.scripts).toContain("build");
    });
});
