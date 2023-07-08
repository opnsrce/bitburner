import { NS } from "../types";

export default class Server {
    private _ns: NS;
    private _cpuCores: number;
    private _hostname: string;
    private _ip: string;
    private _maxMoney: number;
    private _maxRam: number;
    private _minSecurityLevel: number;
    private _organizationName: string;
    private _purchasedByPlayer: boolean;

    constructor(ns: NS, hostname: string) {
        this._ns = ns;

        const serverData = this._ns.getServer(hostname);

        this._cpuCores = serverData.cpuCores;
        this._hostname = hostname;
        this._ip = serverData.ip;
        this._maxMoney = serverData.moneyMax || 0;
        this._maxRam = serverData.maxRam;
        this._minSecurityLevel = serverData.minDifficulty || 0;
        this._organizationName = serverData.organizationName;
        this._purchasedByPlayer = serverData.purchasedByPlayer || false;
    }

    get cpuCores() {
        return this._cpuCores;
    }

    get hostname() {
        return this._hostname;
    }

    get ip() {
        return this._ip;
    }

    get isBackdoored() {
        return this.fetchServerData().backdoorInstalled || false;
    }

    get isFtpPortOpen() {
        return this.fetchServerData().ftpPortOpen || false;
    }

    get isHttpPortOpen() {
        return this.fetchServerData().httpPortOpen || false;
    }

    get isRooted() {
        return this.fetchServerData().hasAdminRights || false;
    }

    get isSmtpPortOpen() {
        return this.fetchServerData().smtpPortOpen || false;
    }

    get isSqlPortOpen() {
        return this.fetchServerData().sqlPortOpen || false;
    }

    get isSshPortOpen() {
        return this.fetchServerData().sshPortOpen || false;
    }

    get maxMoney() {
        return this._maxMoney;
    }

    get maxRam() {
        return this._maxRam;
    }

    get minSecurityLevel() {
        return this._minSecurityLevel;
    }

    get money() {
        return this.fetchServerData().moneyAvailable || 0;
    }

    get numOpenPorts() {
        return this.fetchServerData().openPortCount || 0;
    }

    get numOpenPortsRequired() {
        return this.fetchServerData().numOpenPortsRequired || 0;
    }

    get organizationName() {
        return this._organizationName;
    }

    get purchasedByPlayer() {
        return this._purchasedByPlayer;
    }

    get ramUsed() {
        return this.fetchServerData().ramUsed;
    }

    get requiredHackingLevel() {
        return this.fetchServerData().requiredHackingSkill || 0;
    }

    get securityLevel() {
        return this.fetchServerData().hackDifficulty || 0;
    }

    get serverGrowth() {
        return this.fetchServerData().serverGrowth || 0;
    }

    private fetchServerData() {
        return this._ns.getServer(this.hostname);
    }
}
