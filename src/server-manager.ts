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
            return this._servers.get(hostname) as Server;
        }

        const server = new Server(this._ns, hostname);
        this._servers.set(hostname, server);

        return server;
    }

    getServer(hostname: string) {
        const server = this._servers.get(hostname);

        if (server) {
            return server;
        }

        throw new Error(`Server '${hostname}' does not exist.`);
    }

    async uploadScriptToServer(scripts: string[] | string, hostname: string) {
        this.getServer(hostname);

        return await this._ns.scp(scripts, hostname, "home");
    }

    isServerRunning(hostname: string) {
        return this._ns.ps(hostname);
    }
}

export default ServerManager;
