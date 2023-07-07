import { NS } from "../types";

export default class Server {
    private _ns: NS;
    private _hostname: string;

    constructor(ns: NS, hostname: string) {
        this._ns = ns;
        this._hostname = hostname;

        this._ns.getServer(hostname);
    }

    get hostname() {
        return this._hostname;
    }
}
