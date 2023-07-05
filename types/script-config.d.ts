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
};
