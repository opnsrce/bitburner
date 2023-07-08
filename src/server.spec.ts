import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import Server from "./server";
import { NS, Server as BitBurnerServer } from "../types";

const mockNsGetServer = (ns: NS, mockServer: Partial<BitBurnerServer>) => {
    return jest
        .spyOn(ns, "getServer")
        .mockImplementation((host?: string | undefined) => {
            return {
                cpuCores: 1,
                ftpPortOpen: false,
                hasAdminRights: false,
                hostname: host || "",
                httpPortOpen: false,
                ip: "192.168.11.1",
                isConnectedTo: false,
                maxRam: 32,
                organizationName: "",
                purchasedByPlayer: false,
                ramUsed: 0,
                smtpPortOpen: false,
                sqlPortOpen: false,
                sshPortOpen: false,
                ...mockServer
            };
        });
};

describe("Server", () => {
    describe("constructor", () => {
        let server: Server;
        let ns: NS;

        describe("hostname", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should set 'hostname'", () => {
                expect(server.hostname).toBe("n00dles");
            });
        });

        describe("When getServer().backdoorInstalled is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { backdoorInstalled: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isBackdoored' to false", () => {
                expect(server.isBackdoored).toBe(false);
            });
        });

        describe("When getServer().backdoorInstalled is false", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { backdoorInstalled: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isBackdoored' to false", () => {
                expect(server.isBackdoored).toBe(false);
            });
        });

        describe("When getServer().backdoorInstalled is true", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { backdoorInstalled: true });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isBackdoored' to true", () => {
                expect(server.isBackdoored).toBe(true);
            });
        });

        describe("When getServer().ftpPortOpen is true", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { ftpPortOpen: true });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isFtpPortOpen' to true", () => {
                expect(server.isFtpPortOpen).toBe(true);
            });
        });

        describe("When getServer().ftpOpen is false", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { ftpPortOpen: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isFtpPortOpen' to false", () => {
                expect(server.isFtpPortOpen).toBe(false);
            });
        });

        describe("When getServer().hackDifficulty is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'securityLevel' to 0", () => {
                expect(server.securityLevel).toBe(0);
            });
        });

        describe("When getServer().hackDifficulty is 1", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { hackDifficulty: 1 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'securityLevel' to 1", () => {
                expect(server.securityLevel).toBe(1);
            });
        });

        describe("cpuCores", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { cpuCores: 5 });
                server = new Server(ns, "n00dles");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should set 'cpuCores'", () => {
                expect(server.cpuCores).toBe(5);
            });
        });

        describe("When getServer().hasAdminRights is true", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { hasAdminRights: true });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isRooted' to true", () => {
                expect(server.isRooted).toBe(true);
            });
        });

        describe("When getServer().hasAdminRights is false", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { hasAdminRights: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isRooted' to false", () => {
                expect(server.isRooted).toBe(false);
            });
        });

        describe("When getServer().httpPortOpen is true", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { httpPortOpen: true });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isHttpPortOpen' to true", () => {
                expect(server.isHttpPortOpen).toBe(true);
            });
        });

        describe("When getServer().httpPortOpen is false", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { httpPortOpen: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isHttpPortOpen' to false", () => {
                expect(server.isHttpPortOpen).toBe(false);
            });
        });

        describe("ip", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { ip: "192.168.11.1" });
                server = new Server(ns, "n00dles");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should set 'ip'", () => {
                expect(server.ip).toBe("192.168.11.1");
            });
        });

        describe("maxRam", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { maxRam: 10 });
                server = new Server(ns, "n00dles");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should set 'maxRam'", () => {
                expect(server.maxRam).toBe(10);
            });
        });

        describe("When getServer().minDifficulty is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'minSecurityLevel' to 0", () => {
                expect(server.minSecurityLevel).toBe(0);
            });
        });

        describe("When getServer().minDifficulty is 1", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { minDifficulty: 1 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'minSecurityLevel' to 1", () => {
                expect(server.minSecurityLevel).toBe(1);
            });
        });

        describe("When getServer().moneyAvailable is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'money' to 0", () => {
                expect(server.money).toBe(0);
            });
        });

        describe("When getServer().moneyAvailable is 1", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { moneyAvailable: 1 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'money' to 1", () => {
                expect(server.money).toBe(1);
            });
        });

        describe("When getServer().moneyMax is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'maxMoney' to 0", () => {
                expect(server.maxMoney).toBe(0);
            });
        });

        describe("When getServer().moneyMax is 100", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { moneyMax: 100 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'maxMoney' to 100", () => {
                expect(server.maxMoney).toBe(100);
            });
        });

        describe("When getServer().numOpenPortsRequired is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'numOpenPortsRequired' to 0", () => {
                expect(server.numOpenPortsRequired).toBe(0);
            });
        });

        describe("When getServer().numOpenPortsRequired is 5", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { numOpenPortsRequired: 5 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'numOpenPortsRequired' to 5", () => {
                expect(server.numOpenPortsRequired).toBe(5);
            });
        });

        describe("When getServer().openPortCount is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'numOpenPorts' to 0", () => {
                expect(server.numOpenPorts).toBe(0);
            });
        });

        describe("When getServer().openPortCount is 5", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { openPortCount: 5 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'numOpenPorts' to 5", () => {
                expect(server.numOpenPorts).toBe(5);
            });
        });

        describe("organizationName", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { organizationName: "HackTech" });
                server = new Server(ns, "n00dles");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should set 'organizationName'", () => {
                expect(server.organizationName).toBe("HackTech");
            });
        });

        describe("When getServer().purchasedByPlayer is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { purchasedByPlayer: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isBackdoored' to false", () => {
                expect(server.isBackdoored).toBe(false);
            });
        });

        describe("When getServer().purchasedByPlayer is false", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { purchasedByPlayer: false });
                server = new Server(ns, "n00dles");
            });

            it("should set 'isBackdoored' to false", () => {
                expect(server.isBackdoored).toBe(false);
            });
        });

        describe("When getServer().purchasedByPlayer is true", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { purchasedByPlayer: true });
                server = new Server(ns, "n00dles");
            });

            it("should set 'purchasedByPlayer' to true", () => {
                expect(server.purchasedByPlayer).toBe(true);
            });
        });

        describe("ramUsed", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { ramUsed: 0 });
                server = new Server(ns, "n00dles");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should set 'ramUsed'", () => {
                expect(server.ramUsed).toBe(0);
            });
        });

        describe("When getServer().requiredHackingSkill is undefined", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, {});
                server = new Server(ns, "n00dles");
            });

            it("should set 'requiredHackingLevel' to 0", () => {
                expect(server.requiredHackingLevel).toBe(0);
            });
        });

        describe("When getServer().requiredHackingSkill is 5", () => {
            beforeEach(() => {
                ns = getNsMock();
                mockNsGetServer(ns, { requiredHackingSkill: 5 });
                server = new Server(ns, "n00dles");
            });

            it("should set 'requiredHackingLevel' to 5", () => {
                expect(server.requiredHackingLevel).toBe(5);
            });
        });
    });
});
