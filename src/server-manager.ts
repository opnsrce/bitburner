import { NS } from "../types";
import Server from "./server";

export class ServerManager {
    private _servers: Map<string, Server>;
    private _ns: NS;

    constructor(ns: NS) {
        this._ns = ns;
        this._servers = new Map();
    }

    addServer(hostname: string) {
        if (this._servers.has(hostname)) {
            return this._servers.get(hostname);
        }

        const server = new Server(this._ns, hostname);
        this._servers.set(hostname, server);

        return server;
    }
}

export default ServerManager;
