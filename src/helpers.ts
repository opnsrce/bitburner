import { FlagSchema, NS, ScriptConfig } from "../types";
import defaultScriptConfig from "./default-script-config";

/**
 * Maps the server network starting from root.
 * @remarks
 * RAM cost: 0.2GB
 *
 * Returns all of the servers connected to the passed in server.
 *
 * @param ns - Netscript library
 * @param root - Server to start scanning from.
 * @returns Array of strings
 */
export const findServers = (
    ns: NS,
    root: string,
    nodes: Array<string> = []
): Array<string> => {
    const servers = ns.scan(root);

    if (root !== "home") {
        servers.shift();
    }

    for (let server of servers) {
        nodes.push(server);
        findServers(ns, server, nodes);
    }

    return nodes.sort();
};

/**
 * Parses the array of arguments passed to NS into a ScriptConfig.
 *
 * @param ns - Netscript library instance
 * @returns Object of parsed script parameters.
 */
export const parseNetScriptArgs = (ns: NS): ScriptConfig => {
    const schema = convertObjectToSchema(defaultScriptConfig);
    const parsedFlags = ns.flags(schema);

    const { growLimit, hackLimit, weakenModifier } = ns.flags(schema);

    if (
        isNaN(growLimit as any) ||
        (growLimit as number) < 0 ||
        (growLimit as number) > 100
    ) {
        throw new Error("growLimit must be a number between 0 and 100");
    }

    if (
        isNaN(hackLimit as any) ||
        (hackLimit as number) < 0 ||
        (hackLimit as number) > 100
    ) {
        throw new Error("hackLimit must be a number between 0 and 100");
    }

    if (isNaN(weakenModifier as any) || (weakenModifier as number) < 0) {
        throw new Error(
            "weakenModifier must be a number greater than or equal to 0"
        );
    }

    return {
        args: parsedFlags._ as string[],
        target: parsedFlags.target as string,
        growLimit: parsedFlags.growLimit as number,
        hackLimit: parsedFlags.hackLimit as number,
        weakenModifier: parsedFlags.weakenModifier as number
    };
};

/**
 * Converts an object into a Schema.
 *
 * @remarks
 * @see {@link NS.flags} for more info
 * @param object The object to convert
 * @returns An array of Flag Schemas
 */
export const convertObjectToSchema = (object: Object): FlagSchema[] => {
    const schema: FlagSchema[] = [];

    for (const key in object) {
        const value = object[key as keyof object];

        schema.push([key, value]);
    }

    return schema;
};
