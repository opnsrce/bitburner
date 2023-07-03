import { NS } from "../types";

const nsMock: Partial<NS> = {
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

export default nsMock;
