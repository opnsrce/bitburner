import { describe, expect, it } from "@jest/globals";
import ServerManager from "./server-manager";
import Server from "./server";
import getNsMock from "../test/ns-mock";
import { NS, ProcessInfo } from "../types";

describe("ServerManager", () => {
    describe("addServer", () => {
        describe("When the passed in server is not already tracked", () => {
            let ns: NS;
            let serverManager: ServerManager;
            let server: Server;

            beforeEach(() => {
                ns = getNsMock();
                serverManager = new ServerManager(ns);
                server = serverManager.addServer("new");
            });

            it("should return the server that was added", () => {
                const expectedServer = new Server(ns, "new");

                expect(server).toStrictEqual(expectedServer);
            });
        });

        describe("When the passed in server is already tracked", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();
                serverManager = new ServerManager(ns);
            });

            it("should not update the list of servers", () => {
                const server: any = serverManager.addServer("n00dles");
                server.added = true;

                const secondServer = serverManager.addServer("n00dles");

                expect(server).toStrictEqual(secondServer);
            });
        });
    });

    describe("getServer", () => {
        describe("When passed an existing server", () => {
            let ns: NS;
            let serverManager: ServerManager;
            let server: Server;

            beforeEach(() => {
                ns = getNsMock();
                serverManager = new ServerManager(ns);
                server = new Server(ns, "n00dles");
                serverManager.addServer("n00dles");
            });

            it("should return that server", () => {
                const retrievedServer = serverManager.getServer("n00dles");

                expect(retrievedServer).toStrictEqual(server);
            });
        });

        describe("When passed an unknown server", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();
                serverManager = new ServerManager(ns);
            });

            it("should return undefined", () => {
                const retrievedServer = serverManager.getServer("n00dles");

                expect(retrievedServer).toStrictEqual(undefined);
            });
        });
    });

    describe("uploadScriptToServer", () => {
        describe("When passed an unknown server", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();
                serverManager = new ServerManager(ns);
            });

            it("should throw an error", () => {
                const error = new Error("'n00dles' is not a valid server name");

                expect(
                    async () =>
                        await serverManager.uploadScriptToServer(
                            "test",
                            "n00dles"
                        )
                ).rejects.toThrow(error);
            });
        });

        describe("When passed a single file and a valid server name", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "scp");
                serverManager = new ServerManager(ns);
                serverManager.addServer("n00dles");
            });

            it("should upload that file to the server", async () => {
                await serverManager.uploadScriptToServer("script", "n00dles");

                expect(ns.scp).toHaveBeenCalledWith(
                    "script",
                    "n00dles",
                    "home"
                );
            });
        });

        describe("When passed an array of files and a valid server name", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "scp");
                serverManager = new ServerManager(ns);
                serverManager.addServer("n00dles");
            });

            it("should every file to the server", async () => {
                const scripts = ["script1", "script2"];
                await serverManager.uploadScriptToServer(scripts, "n00dles");

                expect(ns.scp).toHaveBeenCalledWith(scripts, "n00dles", "home");
            });
        });
    });

    describe("isServerRunning", () => {
        describe("When a server has a script running on it", () => {
            let ns: NS;
            let serverManager: ServerManager;
            const processInfo: ProcessInfo[] = [
                {
                    filename: "hack.js",
                    threads: 4,
                    args: [],
                    pid: 1,
                    temporary: false
                }
            ];

            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "ps").mockImplementation(
                    (host?: string | undefined) => processInfo
                );
                serverManager = new ServerManager(ns);
                serverManager.addServer("n00dles");
            });
            it("Should return process info", () => {
                expect(serverManager.isServerRunning("n00dles")).toStrictEqual(
                    processInfo
                );
            });
        });

        describe("When a isn't running any scripts", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "ps").mockImplementation(
                    (host?: string | undefined) => []
                );
                serverManager = new ServerManager(ns);
                serverManager.addServer("n00dles");
            });
            it("Should return an empty array", () => {
                expect(serverManager.isServerRunning("n00dles")).toStrictEqual(
                    []
                );
            });
        });
    });
});
