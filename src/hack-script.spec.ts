import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import { main as hack } from "./hack-script";
import { NS } from "../types";

describe("Hack Script", () => {
    const mockMoney = (
        ns: NS,
        availableMoneyStart: number,
        maxMoney: number
    ) => {
        jest.spyOn(ns, "getServerMaxMoney").mockImplementation(() => maxMoney);
        const mock = jest.spyOn(ns, "getServerMoneyAvailable");

        mock.mockReturnValue(maxMoney);
        mock.mockReturnValueOnce(availableMoneyStart);

        for (let i = availableMoneyStart; i >= 0; i -= 10) {
            mock.mockReturnValueOnce(i);
        }
    };

    describe("When a target is passed in to the script", () => {
        const target = "n00dles";
        const ns = getNsMock(["--target", target]);

        beforeEach(() => {
            jest.spyOn(ns, "hack");
            mockMoney(ns, 500, 500);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should run hack against the target", async () => {
            await hack(ns);

            expect(ns.hack).toBeCalledWith(target);
        });
    });

    describe("When a target is not passed in to the script", () => {
        const host = "host";
        const ns = getNsMock();

        beforeEach(() => {
            jest.spyOn(ns, "getHostname").mockImplementation(() => host);
            jest.spyOn(ns, "hack");
            mockMoney(ns, 500, 500);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should run hack against the host script", async () => {
            await hack(ns);

            expect(ns.hack).toBeCalledWith(host);
        });
    });

    describe("When the server has no money", () => {
        const ns = getNsMock(["--target", "n00dles"]);

        beforeEach(() => {
            jest.spyOn(ns, "hack");
            mockMoney(ns, 0, 0);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should not call hack", async () => {
            await hack(ns);

            expect(ns.hack).not.toBeCalled();
        });
    });

    describe("When the server's funds drop below the hackLimit", () => {
        const ns = getNsMock(["--target", "n00dles", "--hackLimit", 50]);

        beforeEach(() => {
            jest.spyOn(ns, "hack");
            mockMoney(ns, 250, 500);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should not call hack", async () => {
            await hack(ns);

            expect(ns.hack).not.toBeCalled();
        });
    });
});
