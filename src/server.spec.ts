import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import Server from "./server";
import { NS } from "../types";

describe("Server", () => {
    describe("constructor", () => {
        let ns: NS;

        describe("When a server name is defined", () => {
            beforeEach(() => {
                ns = getNsMock();

                jest.spyOn(ns, "getServer");
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("should call ns.getServer with the server name", () => {
                const serverName = "n00dles";

                new Server(ns, serverName);

                expect(ns.getServer).toBeCalledWith(serverName);
            });
        });
    });
});
