import { describe, expect, it } from "@jest/globals";
import add from "./index";

describe("Add", () => {
    describe("When the inputs are 5 and 2", () => {
        it("should return 7", () => {
            expect(add(5, 2)).toEqual(7);
        });
    });
});
