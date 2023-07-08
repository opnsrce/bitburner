import { Server as BitBurnerServer } from "../types";

const mockServer: BitBurnerServer = {
    cpuCores: 1,
    ftpPortOpen: false,
    hasAdminRights: false,
    hostname: "",
    httpPortOpen: false,
    ip: "192.168.11.1",
    isConnectedTo: false,
    maxRam: 32,
    organizationName: "",
    purchasedByPlayer: false,
    ramUsed: 0,
    smtpPortOpen: false,
    sqlPortOpen: false,
    sshPortOpen: false
};

export default mockServer;
