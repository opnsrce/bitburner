import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import { main as grow } from "./grow-script";

describe("Grow Script", () => {
    describe("When 'keepOpen' is not enabled", () => {
        const ns = getNsMock();
        const mockGrowResult = 5;
        const growMock = jest
            .spyOn(ns, "grow")
            .mockImplementation(() => Promise.resolve(mockGrowResult));

        afterEach(() => {
            growMock.mockClear();
        });

        it("should call 'ns.grow' once", async () => {
            await grow(ns);

            expect(growMock.mock.calls.length).toBe(1);
        });

        it("should return the result of 'ns.grow;", async () => {
            const result = await grow(ns);

            expect(result).toBe(mockGrowResult);
        });
    });

    describe("When a target is passed in to the script", () => {
        const target = "n00dles";
        const ns = getNsMock(["--target", target]);
        const growMock = jest.spyOn(ns, "grow");

        afterEach(() => {
            growMock.mockClear();
        });

        it("should run grow against the target", async () => {
            await grow(ns);

            expect(ns.grow).toBeCalledWith(target);
        });
    });

    describe("When a target is not passed in to the script", () => {
        const host = "host";
        const ns = getNsMock();
        const growMock = jest.spyOn(ns, "grow");
        const getHostnameMock = jest
            .spyOn(ns, "getHostname")
            .mockImplementation(() => host);

        afterEach(() => {
            growMock.mockClear();
            getHostnameMock.mockReset();
        });

        it("should run grow against the host script", async () => {
            await grow(ns);

            expect(ns.grow).toBeCalledWith(host);
        });
    });
});
