import { NS } from "../types";
import { parseNetScriptArgs } from "./helpers";

/**
 * Executes hack on a server.
 *
 * @param ns - Netscript library instance
 * @returns The result of hack.
 */
export const main = async (ns: NS) => {
    const { target, weakenModifier } = parseNetScriptArgs(ns);
    const hostname = target || ns.getHostname();
    const minSecurityLevel = ns.getServerMinSecurityLevel(target);

    let currentSecurityLevel = ns.getServerSecurityLevel(hostname);

    while (currentSecurityLevel > minSecurityLevel + weakenModifier) {
        await ns.weaken(hostname);
        currentSecurityLevel = ns.getServerSecurityLevel(hostname);
    }
};
