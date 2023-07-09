import { describe, expect, it } from "@jest/globals";
import ServerManager from "./server-manager";
import Server from "./server";
import getNsMock from "../test/ns-mock";
import { NS } from "../types";

describe("ServerManager", () => {
    const getMockServerManager = (ns: NS) => {
        const serverManager = new ServerManager(ns);

        jest.spyOn(serverManager, "addServer");

        return serverManager;
    };

    describe("addServer", () => {
        describe("When the passed in server is not already tracked", () => {
            it("should return the server that was added", () => {
                const ns = getNsMock();
                const expectedServer = new Server(ns, "new");

                const serverManager = getMockServerManager(ns);
                const server = serverManager.addServer("new");

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
});
