import { NS } from "../types";

export default class Server {
    private _ns: NS;
    private _hostname: string;
    private _isBackdoored: boolean;

    constructor(ns: NS, hostname: string) {
        this._ns = ns;
        this._hostname = hostname;

        const serverData = this._ns.getServer(hostname);

        this._isBackdoored = serverData.backdoorInstalled ? true : false;
    }

    get isBackdoored() {
        return this._isBackdoored;
    }

    get hostname() {
        return this._hostname;
    }
}
