import {describe, it, expect} from "vitest";

describe("Example Test", () => {
    it("Passing Test", () => {
        const sum = 1+1;
        expect(sum).toEqual(2);
    });
});