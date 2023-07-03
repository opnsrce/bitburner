import { NS } from "../types";

const getNsMock = (args?: (string | number | boolean)[]) => {
    const nsMock: Partial<NS> = {
        args: args,
        scan: (host?: string | undefined): string[] => {
            switch (host) {
                case "home":
                    return ["n00dles", "foodnstuff"];
                case "n00dles":
                    return ["home", "zero", "max-hardware"];
                default:
                    return ["n00dles"];
            }
        }
    };

    return nsMock as NS;
};

export default getNsMock;
