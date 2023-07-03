import { NS } from "../types";
import { parseArgs, ParseArgsConfig } from "node:util";
import { FlagSchema } from "../types";
const getNsMock = (args?: (string | number | boolean)[]) => {
    const nsMock: Partial<NS> = {
        args: args,
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
        flags(schemas: FlagSchema[]) {
            const args = [...(this.args || [])] as string[];

            const convertSchemasToParserOptions = (
                accumulator: any,
                schema: FlagSchema
            ) => {
                const [fieldName, defaultValue] = schema;
                const type = typeof defaultValue;

                accumulator[fieldName.replace(/\-/g, "")] = {
                    type: type === "boolean" ? type : "string",
                    multiple: Array.isArray(defaultValue),
                    default: defaultValue
                };

                return accumulator;
            };

            const { positionals, values } = parseArgs({
                args,
                allowPositionals: true,
                strict: false,
                options: schemas.reduce(convertSchemasToParserOptions, {})
            } as ParseArgsConfig);

            return {
                _: positionals,
                ...values
            };
        }
    };

    return nsMock as NS;
};

export default getNsMock;
