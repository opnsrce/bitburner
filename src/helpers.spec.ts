import { describe, expect, it } from "@jest/globals";
import nsMock from "../test/ns-mock";
import { findServers } from "./helpers";
import { NS } from "../types";

describe("findServers", () => {
    describe("When the root is defined as 'home'", () => {
        it("should recursively map the network from 'home'", () => {
            const result = findServers(nsMock as NS, "home");
            const expectedMap = [
                "foodnstuff",
                "max-hardware",
                "n00dles",
                "zero"
            ];

            expect(result).toStrictEqual(expectedMap);
        });
    });

    describe("When the root is defined as 'n00dles'", () => {
        it("should recursively map the network from 'n00dles'", () => {
            const result = findServers(nsMock as NS, "n00dles");
            const expectedMap = ["max-hardware", "zero"];

            expect(result).toStrictEqual(expectedMap);
        });
    });

    describe("When the root is defined as 'max-hardware'", () => {
        it("should recursively map the network from 'max-hardware'", () => {
            const result = findServers(nsMock as NS, "max-hardware");
            const expectedMap: Array<string> = [];

            expect(result).toStrictEqual(expectedMap);
        });
    });
});
