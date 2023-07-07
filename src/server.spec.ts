import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import Server from "./server";
import { NS, Server as BitBurnerServer } from "../types";

describe("Server", () => {
    describe("constructor", () => {
        let ns: NS;

        describe("When a server hostname is defined", () => {
            const serverName = "n00dles";
            let server: Server;
            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "getServer");

                server = new Server(ns, serverName);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should call ns.getServer with the server's hostname", () => {
                expect(ns.getServer).toBeCalledWith(serverName);
            });

            it("should set the server's hostname", () => {
                expect(server.hostname).toBe(serverName);
            });

            describe("server.isBackdoored", () => {
                describe("When server.backdoorInstalled is undefined", () => {
                    const serverName = "n00dles";
                    let server: Server;

                    beforeEach(() => {
                        ns = getNsMock();

                        jest.spyOn(ns, "getServer").mockImplementation(
                            (host?: string | undefined) => {
                                return {
                                    name: serverName
                                } as unknown as BitBurnerServer;
                            }
                        );

                        server = new Server(ns, serverName);
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it("should set server.isBackdoored to false", () => {
                        expect(server.isBackdoored).toBe(false);
                    });
                });

                describe("When server.backdoorInstalled is false", () => {
                    const serverName = "n00dles";
                    let server: Server;

                    beforeEach(() => {
                        ns = getNsMock();

                        jest.spyOn(ns, "getServer").mockImplementation(
                            (host?: string | undefined) => {
                                return {
                                    name: serverName,
                                    backdoorInstalled: false
                                } as unknown as BitBurnerServer;
                            }
                        );

                        server = new Server(ns, serverName);
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it("should set server.isBackdoored to false", () => {
                        expect(server.isBackdoored).toBe(false);
                    });
                });

                describe("When server.backdoorInstalled is true", () => {
                    const serverName = "n00dles";
                    let server: Server;

                    beforeEach(() => {
                        ns = getNsMock();

                        jest.spyOn(ns, "getServer").mockImplementation(
                            (host?: string | undefined) => {
                                return {
                                    name: serverName,
                                    backdoorInstalled: true
                                } as unknown as BitBurnerServer;
                            }
                        );

                        server = new Server(ns, serverName);
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it("should set server.isBackdoored to true", () => {
                        expect(server.isBackdoored).toBe(true);
                    });
                });
            });
        });
    });
});
