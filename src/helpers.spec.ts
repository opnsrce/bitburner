import { describe, expect, it } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import {
    findServers,
    parseNetScriptArgs,
    convertObjectToSchema
} from "./helpers";
import { NS, ScriptConfig } from "../types";

import defaultScriptConfig from "./default-script-config";

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
    describe("When no flags or arguments are set", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = [];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should return the default script config", () => {
            const result = parseNetScriptArgs(ns);

            expect(result).toStrictEqual(defaultScriptConfig);
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
                ...defaultScriptConfig,
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
                ...defaultScriptConfig,
                args: ["extra", "more"]
            };

            expect(result).toStrictEqual(expectedConfig);
        });
    });

    describe("when --growLimit is set to a number > 100", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--growLimit", "200"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("growLimit cannot be greater than 100 percent")
            );
        });
    });
});

describe("convertObjectToSchema", () => {
    describe("When the object has no keys", () => {
        const object = {};

        const result = convertObjectToSchema(object);
        const expectedResult: Array<void> = [];

        it("should return an empty array", () => {
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe("When the object is {myNum: 5}", () => {
        const object = { myNum: 5 };

        const result = convertObjectToSchema(object);
        const expectedResult = [["myNum", 5]];

        it(`should return [["myNum", 5]]`, () => {
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe("When the object is {myBool: true}", () => {
        const object = { myBool: true };

        const result = convertObjectToSchema(object);
        const expectedResult = [["myBool", true]];

        it(`should return [["myBool", true]]`, () => {
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe(`When the object is {myStr: "str"}`, () => {
        const object = { myStr: "str" };

        const result = convertObjectToSchema(object);
        const expectedResult = [["myStr", "str"]];

        it(`should return [["myStr", "str"]]`, () => {
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe(`When the object is {myArr: [5]}`, () => {
        const object = { myArr: [5] };

        const result = convertObjectToSchema(object);
        const expectedResult = [["myArr", [5]]];

        it(`should return [["myArr", [5]]]`, () => {
            expect(result).toStrictEqual(expectedResult);
        });
    });
});
