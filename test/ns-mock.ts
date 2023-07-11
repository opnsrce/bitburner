import { BasicHGWOptions, NS, ParsedArgs, ProcessInfo } from "../types";
import { parseArgs, ParseArgsConfig } from "node:util";
import { FlagSchema } from "../types";
import BitBurnerServerMock from "./bitburner-server-mock";

const getNsMock = (args?: (string | number | boolean)[]) => {
    const nsMock: Partial<NS> = {
        args: args,
        getHostname: () => "",
        getServerMaxMoney: () => 0,
        getServerMoneyAvailable: () => 0,
        getServerMinSecurityLevel: () => 1,
        getServerSecurityLevel: () => 1,
        getServer: (host: string) => {
            return BitBurnerServerMock;
        },
        grow: (host: string, options?: BasicHGWOptions): Promise<number> => {
            return Promise.resolve(1);
        },
        hack: (host: string, options?: BasicHGWOptions): Promise<number> => {
            return Promise.resolve(1);
        },
        weaken: (host: string, options?: BasicHGWOptions): Promise<number> => {
            return Promise.resolve(1);
        },
        scan: (host?: string | undefined): string[] => {
            switch (host) {
                case "home":
                    return ["n00dles", "foodnstuff"];
                case "n00dles":
                    return ["home", "zero", "max-hardware"];
                default:
                    return ["n00dles"];
            }
        },
        flags(schemas: FlagSchema[]): ParsedArgs {
            const convertSchemasToParserOptions = (
                accumulator: any,
                schema: FlagSchema
            ) => {
                const [fieldName, defaultValue] = schema;
                const type = typeof defaultValue;

                if (fieldName === "args") {
                    return accumulator;
                }

                accumulator[fieldName.replace(/\-/g, "")] = {
                    type: type === "boolean" ? type : "string",
                    multiple: Array.isArray(defaultValue),
                    default:
                        type === "boolean"
                            ? defaultValue
                            : defaultValue.toString()
                };

                return accumulator;
            };

            const convertNumericValuesToNumbers = (values: any) => {
                const valuesClone = {
                    ...values
                };

                for (let key in valuesClone) {
                    const value = valuesClone[key];
                    const isString =
                        typeof value === "string" && value.length > 0;
                    if (isString && !isNaN(Number(value))) {
                        valuesClone[key] = Number(value);
                    }
                }

                return valuesClone;
            };

            const { positionals, values } = parseArgs({
                args,
                allowPositionals: true,
                strict: false,
                options: schemas.reduce(convertSchemasToParserOptions, {})
            } as ParseArgsConfig);

            return {
                _: positionals,
                ...convertNumericValuesToNumbers(values)
            };
        },
        ps(host?: string | undefined): ProcessInfo[] {
            return [
                {
                    filename: "hack.js",
                    threads: 4,
                    args: [],
                    pid: 1,
                    temporary: false
                }
            ];
        },
        scp(
            files: string | string[],
            destination: string,
            source?: string | undefined
        ) {
            return true;
        }
    };

    return nsMock as NS;
};

export default getNsMock;
