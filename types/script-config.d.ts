/** Configuration object returned by parseNetScriptArgs. */
export type ScriptConfig = {
    /** Contains unrecognized arguments passed to the script. */
    args: string[];
    /** The target server the script will run against / execute on. */
    target: string;
    /**
     * What percentage of getServerMaxMoney() to grow to before terminating.
     *
     * @defaultValue
     * Defaults to 100 (100% of getServerMaxMoney())
     * @remarks
     * Only applies to scripts that use ns.grow().
     * @see {@link NS.getServerMaxMoney}
     **/
    growLimit: number;

    /**
     * What percentage of the server's maximum available funds to take before
     * terminating.
     *
     * @defaultValue
     * Defaults to 100 (100% of getServerMaxMoney())
     * @remarks
     * Only applies to scripts that use {@link NS.grow | ns.grow}.
     * @see {@link NS.getServerMaxMoney | getServerMaxMoney}
     **/
    hackLimit: number;
    /**
     * What number to add to a server's minimum security level before it is
     * considered fully weakend. A higher number means the weaken script will
     * finish sooner
     *
     * @defaultValue
     * Defaults to 0 (The server is considered weakend when it's current
     * security level matches its minimum security-level).
     * @remarks
     * Only applies to scripts that use {@link NS.weaken | ns.weaken}.
     * @see {@link NS.getServerMaxMoney | getServerMaxMoney}
     **/
    weakenModifier: number;
};
