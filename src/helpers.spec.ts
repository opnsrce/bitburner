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
    let defaultConfig: ScriptConfig = {
        args: [],
        target: "",
        keepOpen: false
    };

    describe("When no flags or arguments are set", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = [];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should return the default script config", () => {
            const result = parseNetScriptArgs(ns);

            expect(result).toStrictEqual(defaultConfig);
        });
    });

    describe("When --target is set", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--target", "n00dles"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should set the 'target' property in the script config", () => {
            const result = parseNetScriptArgs(ns);
            const expectedConfig: ScriptConfig = {
                ...defaultConfig,
                target: "n00dles"
            };

            expect(result).toStrictEqual(expectedConfig);
        });
    });

    describe("When extra parameters are set", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["extra", "more"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should store the extra parameters in the 'args' property", () => {
            const result = parseNetScriptArgs(ns);
            const expectedConfig: ScriptConfig = {
                ...defaultConfig,
                args: ["extra", "more"]
            };

            expect(result).toStrictEqual(expectedConfig);
        });
    });
});
