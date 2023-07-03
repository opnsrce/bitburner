import { describe, expect, it } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import { findServers, parseNetScriptArgs } from "./helpers";
import { NS, ScriptConfig } from "../types";

describe("findServers", () => {
    describe("When the root is defined as 'home'", () => {
        it("should recursively map the network from 'home'", () => {
            const result = findServers(getNsMock() as NS, "home");
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
            const result = findServers(getNsMock() as NS, "n00dles");
            const expectedMap = ["max-hardware", "zero"];

            expect(result).toStrictEqual(expectedMap);
        });
    });

    describe("When the root is defined as 'max-hardware'", () => {
        it("should recursively map the network from 'max-hardware'", () => {
            const result = findServers(getNsMock() as NS, "max-hardware");
            const expectedMap: Array<string> = [];

            expect(result).toStrictEqual(expectedMap);
        });
    });
});

describe("parseNetScriptArgs", () => {
    describe("When no arguments are defined", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = [];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should return a default script config", () => {
            const result = parseNetScriptArgs(ns);
            const expectedConfig: ScriptConfig = {
                args: [],
                target: ""
            };

            expect(result).toStrictEqual(expectedConfig);
        });
    });

    describe("When target is passed in to the script", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--target", "n00dles"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should set the 'target' in the script config", () => {
            const result = parseNetScriptArgs(ns);
            const expectedConfig: ScriptConfig = {
                args: [],
                target: "n00dles"
            };

            expect(result).toStrictEqual(expectedConfig);
        });
    });

    describe("When extra parameters are passed in", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = [
            "--target",
            "n00dles",
            "extra",
            "more"
        ];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should set the 'args' in the script config", () => {
            const result = parseNetScriptArgs(ns);
            const expectedConfig: ScriptConfig = {
                args: ["extra", "more"],
                target: "n00dles"
            };

            expect(result).toStrictEqual(expectedConfig);
        });
    });
});
