/** Configuration object returned by parseNetScriptArgs. */
export type ScriptConfig = {
    /** Contains unrecognized arguments passed to the script. */
    args: string[];
    /** The target server the script will run against / execute on. */
    target: string;
    /** If true, script will keep running after main operation finishes. */
    keepOpen: boolean;
};
