import { NS } from "../types";
import { parseNetScriptArgs } from "./helpers";

/**
 * Executes grow on a server.
 *
 * @param ns - Netscript library instance
 * @returns The result of grow.
 */
export const main = async (ns: NS) => {
    const { target, growLimit } = parseNetScriptArgs(ns);
    const hostname = target || ns.getHostname();
    const maxMoney = ns.getServerMaxMoney(hostname) * (growLimit * 0.01);

    let currentMoney = ns.getServerMoneyAvailable(hostname);

    while (currentMoney < maxMoney) {
        await ns.grow(hostname);
        currentMoney = ns.getServerMoneyAvailable(hostname);
    }
};
