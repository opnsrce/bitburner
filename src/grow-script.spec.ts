import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import { main as grow } from "./grow-script";
import { NS, BasicHGWOptions } from "../types";

describe("Grow Script", () => {
    const mockMoney = (
        ns: NS,
        availableMoneyStart: number,
        maxMoney: number
    ) => {
        jest.spyOn(ns, "getServerMaxMoney").mockImplementation(() => maxMoney);
        const mock = jest.spyOn(ns, "getServerMoneyAvailable");

        mock.mockReturnValue(maxMoney);

        for (let i = availableMoneyStart; i < maxMoney; i += 100) {
            mock.mockReturnValueOnce(Math.min(i, maxMoney));
        }
    };

    describe("When a target is passed in to the script", () => {
        const target = "n00dles";
        const ns = getNsMock(["--target", target]);

        beforeEach(() => {
            jest.spyOn(ns, "grow");
            mockMoney(ns, 100, 500);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should run ns.grow against the target", async () => {
            await grow(ns);

            expect(ns.grow).toBeCalledWith(target);
        });
    });

    describe("When a target is not passed in to the script", () => {
        const host = "host";
        const ns = getNsMock();

        beforeEach(() => {
            jest.spyOn(ns, "getHostname").mockImplementation(() => host);
            jest.spyOn(ns, "grow");
            mockMoney(ns, 100, 10000);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should run ns.grow against the host script", async () => {
            await grow(ns);

            expect(ns.grow).toBeCalledWith(host);
        });
    });

    describe("When the server's available money is at the max limit", () => {
        const ns = getNsMock(["--target", "n00dles"]);

        beforeEach(() => {
            jest.spyOn(ns, "grow");
            mockMoney(ns, 100, 100);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should not call ns.grow", async () => {
            await grow(ns);

            expect(ns.grow).not.toBeCalled();
        });
    });

    describe("When the server's available money grows to the server max", () => {
        const ns = getNsMock(["--target", "n00dles"]);

        let growMock: jest.SpiedFunction<
            (
                host: string,
                opts?: BasicHGWOptions | undefined
            ) => Promise<number>
        >;

        beforeEach(() => {
            growMock = jest.spyOn(ns, "grow");
            mockMoney(ns, 99, 100);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should stop calling grow once the limit is reached", async () => {
            await grow(ns);

            expect(growMock.mock.calls.length).toBe(1);
        });
    });

    describe("When growLimit is > 100", () => {
        const ns = getNsMock(["--target", "n00dles", "--growLimit", 200]);

        let growMock: jest.SpiedFunction<
            (
                host: string,
                opts?: BasicHGWOptions | undefined
            ) => Promise<number>
        >;

        beforeEach(() => {
            growMock = jest.spyOn(ns, "grow");
            mockMoney(ns, 99, 100);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should stop calling grow once the server's funds are full", async () => {
            await grow(ns);

            expect(growMock.mock.calls.length).toBe(1);
        });
    });
});
