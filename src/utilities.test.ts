import { makeBoolean } from "./utilities";
describe("match", () => {
    it("works", () => {
        expect(makeBoolean("true")).toBeTruthy();
    });
});
