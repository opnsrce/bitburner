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
    });
});
