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
                Error("growLimit must be a number between 0 and 100")
            );
        });
    });

    describe("when --growLimit is set to a non-numeric value", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--growLimit", "test"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("growLimit must be a number between 0 and 100")
            );
        });
    });

    describe("when --growLimit is set to a number < 0", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--growLimit", "-5"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("growLimit must be a number between 0 and 100")
            );
        });
    });

    describe("when --hackLimit is set to a number > 100", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--hackLimit", "200"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("hackLimit cannot be greater than 100 percent")
            );
        });
    });

    describe("when --hackLimit is set to a non-numeric value", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--hackLimit", "test"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("hackLimit must be a number between 0 and 100")
            );
        });
    });

    describe("when --hackLimit is set to a number < 0", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--hackLimit", "-5"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("hackLimit cannot be less than 0 percent")
            );
        });
    });

    describe("when --weakenModifier is set to a number < 0", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--weakenModifier", "-1"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("weakenModifier cannot be less than 0")
            );
        });
    });

    describe("when --weakenModifier is not a number", () => {
        let ns: NS;
        const args: (string | number | boolean)[] = ["--weakenModifier", "bla"];

        beforeEach(() => {
            ns = getNsMock(args);
        });

        it("should throw an error", () => {
            expect(() => parseNetScriptArgs(ns)).toThrow(
                Error("weakenModifier must be a number greater than -1")
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
