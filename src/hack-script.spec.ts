import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import { main as hack } from "./hack-script";
import { BasicHGWOptions, NS } from "../types";

describe("Hack Script", () => {
    const mockMoney = (
        ns: NS,
        availableMoneyStart: number,
        maxMoney: number
    ) => {
        jest.spyOn(ns, "getServerMaxMoney").mockImplementation(() => maxMoney);
        const mock = jest.spyOn(ns, "getServerMoneyAvailable");

        mock.mockReturnValue(maxMoney);

        for (let i = availableMoneyStart; i >= 0; i -= 10) {
            mock.mockReturnValueOnce(i);
        }

        mock.mockReturnValueOnce(0);
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

    describe("When the server's funds are at the hackLimit", () => {
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

    describe("When the server's funds reach the hackLimit", () => {
        const ns = getNsMock(["--target", "n00dles", "--hackLimit", 50]);
        let mockHack: jest.SpiedFunction<
            (
                host: string,
                opts?: BasicHGWOptions | undefined
            ) => Promise<number>
        >;

        beforeEach(() => {
            mockHack = jest.spyOn(ns, "hack");
            mockMoney(ns, 260, 500);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should stop calling hack", async () => {
            await hack(ns);

            expect(mockHack.mock.calls.length).toBe(1);
        });
    });

    describe("When hackLimit is > 100", () => {
        const ns = getNsMock(["--target", "n00dles", "--hackLimit", 200]);

        let hackMock: jest.SpiedFunction<
            (
                host: string,
                opts?: BasicHGWOptions | undefined
            ) => Promise<number>
        >;

        beforeEach(() => {
            hackMock = jest.spyOn(ns, "hack");
            mockMoney(ns, 1, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should stop calling grow once the server's funds are empty", async () => {
            await hack(ns);

            expect(hackMock.mock.calls.length).toBe(1);
        });
    });
});
