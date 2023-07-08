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

        describe("hostname", () => {
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
    });
});
