import { ScriptArg } from "./netscript";

export type ParsedArgs = {
    [key: string]: ScriptArg | string[];
};
