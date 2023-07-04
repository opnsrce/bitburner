import { NS } from "../types";
import { parseNetScriptArgs } from "./helpers";

/**
 * Executes grow on a server.
 *
 * @param ns - Netscript library instance
 * @returns The result of grow.
 */
export const main = async (ns: NS) => {
    const { keepOpen, target } = parseNetScriptArgs(ns);

    let result;

    do {
        result = await ns.grow(target || ns.getHostname());
    } while (keepOpen);

    return result;
};
