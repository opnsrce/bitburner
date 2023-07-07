import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import Server from "./server";
import { NS } from "../types";

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
        });
    });
});
