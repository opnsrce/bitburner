import { NS } from "../types";

export default class Server {
    private _ns: NS;
    constructor(ns: NS, name: string) {
        this._ns = ns;

        this._ns.getServer(name);
    }
}
