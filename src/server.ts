import { NS } from "../types";

export default class Server {
    private _ns: NS;
    private _cpuCores: number;
    private _hostname: string;
    private _isBackdoored: boolean;
    private _isFtpPortOpen: boolean;
    private _securityLevel: number;
    private _isRooted: boolean;

    constructor(ns: NS, hostname: string) {
        this._ns = ns;
        this._hostname = hostname;

        const serverData = this._ns.getServer(hostname);

        this._cpuCores = serverData.cpuCores;
        this._isBackdoored = serverData.backdoorInstalled ? true : false;
        this._isFtpPortOpen = serverData.ftpPortOpen ? true : false;
        this._securityLevel = serverData.hackDifficulty
            ? serverData.hackDifficulty
            : 0;
        this._isRooted = serverData.hasAdminRights;
    }

    get cpuCores() {
        return this._cpuCores;
    }

    get isBackdoored() {
        return this._isBackdoored;
    }

    get hostname() {
        return this._hostname;
    }

    get isFtpPortOpen() {
        return this._isFtpPortOpen;
    }

    get isRooted() {
        return this._isRooted;
    }

    get securityLevel() {
        return this._securityLevel;
    }
}
