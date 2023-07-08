import { NS } from "../types";

export default class Server {
    private _ns: NS;
    private _cpuCores: number;
    private _hostname: string;
    private _isBackdoored: boolean;
    private _isFtpPortOpen: boolean;
    private _isHttpPortOpen: boolean;
    private _securityLevel: number;
    private _isRooted: boolean;
    private _ip: string;
    private _maxRam: number;
    private _maxMoney: number;
    private _minSecurityLevel: number;
    private _money: number;
    private _numOpenPortsRequired: number;
    private _numOpenPorts: number;
    private _organizationName: string;
    private _purchasedByPlayer: boolean;
    private _ramUsed: number;

    constructor(ns: NS, hostname: string) {
        this._ns = ns;

        const serverData = this._ns.getServer(hostname);

        this._cpuCores = serverData.cpuCores;
        this._hostname = hostname;
        this._ip = serverData.ip;
        this._isBackdoored = serverData.backdoorInstalled || false;
        this._isFtpPortOpen = serverData.ftpPortOpen || false;
        this._isHttpPortOpen = serverData.httpPortOpen;
        this._isRooted = serverData.hasAdminRights;
        this._maxMoney = serverData.moneyMax || 0;
        this._maxRam = serverData.maxRam;
        this._minSecurityLevel = serverData.minDifficulty || 0;
        this._money = serverData.moneyAvailable || 0;
        this._numOpenPorts = serverData.openPortCount || 0;
        this._numOpenPortsRequired = serverData.numOpenPortsRequired || 0;
        this._organizationName = serverData.organizationName;
        this._purchasedByPlayer = serverData.purchasedByPlayer || false;
        this._ramUsed = serverData.ramUsed;
        this._securityLevel = serverData.hackDifficulty || 0;
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
        return this._isBackdoored;
    }

    get isFtpPortOpen() {
        return this._isFtpPortOpen;
    }

    get isHttpPortOpen() {
        return this._isHttpPortOpen;
    }

    get isRooted() {
        return this._isRooted;
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
        return this._money;
    }

    get numOpenPorts() {
        return this._numOpenPorts;
    }

    get numOpenPortsRequired() {
        return this._numOpenPortsRequired;
    }

    get organizationName() {
        return this._organizationName;
    }

    get purchasedByPlayer() {
        return this._purchasedByPlayer;
    }

    get ramUsed() {
        return this._ramUsed;
    }

    get securityLevel() {
        return this._securityLevel;
    }
}
