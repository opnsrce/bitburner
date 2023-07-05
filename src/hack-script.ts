import { NS } from "../types";
import { parseNetScriptArgs } from "./helpers";

/**
 * Executes hack on a server.
 *
 * @param ns - Netscript library instance
 * @returns The result of hack.
 */
export const main = async (ns: NS) => {
    const { target, hackLimit } = parseNetScriptArgs(ns);
    const hostname = target || ns.getHostname();
    const maxMoney = ns.getServerMaxMoney(hostname);
    const hackModifier = hackLimit * 0.01;
    const minMoney = maxMoney - maxMoney * hackModifier;

    let currentMoney = ns.getServerMoneyAvailable(hostname);

    while (currentMoney > minMoney) {
        await ns.hack(hostname);
        currentMoney = ns.getServerMoneyAvailable(hostname);
    }
};
