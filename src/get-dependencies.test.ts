import { getDependencieNames } from "./get-dependencies";
import { PackageDetails } from "./types";
describe("getDependencieNames", () => {
    it("works", () => {
        const packages: PackageDetails[] = [
            {
                name: "my-app",
                dependencies: ["my-components"],
                scripts: ["build"],
            },
            {
                name: "my-components",
                dependencies: ["my-utilities"],
                scripts: ["build"],
            },
            {
                name: "my-utilities",
                dependencies: [],
                scripts: ["build"],
            },
            {
                name: "my-admin-app",
                dependencies: ["my-utilities"],
                scripts: ["build"],
            },
        ];
        const actual = getDependencieNames(packages, "my-app");
        expect(actual).toContain("my-app");
        expect(actual).toContain("my-components");
        expect(actual).toContain("my-utilities");
        expect(actual).not.toContain("my-admin-app");
    });
});
