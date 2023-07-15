import { describe, expect, it } from "@jest/globals";
import ServerManager from "./server-manager";
import Server from "./server";
import getNsMock from "../test/ns-mock";
import { NS, ProcessInfo } from "../types";

describe("ServerManager", () => {
    const serverNotFoundError = new Error("Server 'n00dles' does not exist.");
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

            it("should throw an error", () => {
                expect(() => serverManager.getServer("n00dles")).toThrowError(
                    serverNotFoundError
                );
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
                expect(
                    async () =>
                        await serverManager.uploadScriptToServer(
                            "test",
                            "n00dles"
                        )
                ).rejects.toThrow(serverNotFoundError);
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
        describe("When passed an invalid server name", () => {
            let ns: NS;
            let serverManager: ServerManager;

            beforeEach(() => {
                ns = getNsMock();

                serverManager = new ServerManager(ns);
            });

            it("Should return throw an error", () => {
                expect(() => serverManager.isServerRunning("n00dles")).toThrow(
                    serverNotFoundError
                );
            });
        });
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

            it("Should return true", () => {
                expect(serverManager.isServerRunning("n00dles")).toBe(true);
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

            it("Should return false", () => {
                expect(serverManager.isServerRunning("n00dles")).toBe(false);
            });
        });
    });

    describe("shutdownServer", () => {
        describe("When a server is not running any script", () => {
            let ns: NS;
            let serverManager: ServerManager;
            let result: Promise<boolean>;

            beforeEach(() => {
                ns = getNsMock();

                serverManager = new ServerManager(ns);

                serverManager.addServer("notRunning");

                jest.spyOn(serverManager, "isServerRunning").mockImplementation(
                    () => false
                );

                jest.spyOn(ns, "killall");

                result = serverManager.shutdownServer("notRunning");
            });

            it("Should resolve immediately", async () => {
                expect(result).resolves.toBe(true);
            });

            it("Should only call isServerRunning once", async () => {
                expect(serverManager.isServerRunning).toBeCalledTimes(1);
            });

            it("Should not call ns.killall", async () => {
                expect(ns.killall).not.toBeCalled();
            });
        });

        describe("When a server is running a script", () => {
            let ns: NS;
            let serverManager: ServerManager;
            let result: Promise<boolean>;

            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "killall");

                serverManager = new ServerManager(ns);

                jest.spyOn(serverManager, "isServerRunning")
                    .mockImplementationOnce(() => true)
                    .mockImplementationOnce(() => true)
                    .mockImplementationOnce(() => true)
                    .mockImplementation(() => false);

                serverManager.addServer("running");

                jest.spyOn(serverManager, "isServerRunning");

                result = serverManager.shutdownServer("running");
            });

            it("Should call isServerRunning in a loop", async () => {
                expect(serverManager.isServerRunning).toBeCalledTimes(4);
            });

            it("Should attempt to kill all running scripts", async () => {
                expect(ns.killall).toBeCalledTimes(3);
            });

            it("Should eventually resolve", async () => {
                expect(result).resolves.toBe(true);
            });
        });
    });
});
