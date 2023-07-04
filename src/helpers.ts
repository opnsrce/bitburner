import { NS, ScriptConfig } from "../types";

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
    const parsedFlags = ns.flags([
        ["target", ""],
        ["keepOpen", false]
    ]);

    return {
        args: parsedFlags._ as string[],
        target: parsedFlags.target as string,
        keepOpen: parsedFlags.keepOpen as boolean
    };
};
