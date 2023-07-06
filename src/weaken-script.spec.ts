import { describe, expect, it, jest, afterEach } from "@jest/globals";
import getNsMock from "../test/ns-mock";
import { main as weaken } from "./weaken-script";
import { BasicHGWOptions, NS } from "../types";

describe("Weaken Script", () => {
    const mockSecurity = (
        ns: NS,
        currentSecurity: number,
        minSecurity: number
    ) => {
        jest.spyOn(ns, "getServerMinSecurityLevel").mockImplementation(
            () => minSecurity
        );
        const mock = jest.spyOn(ns, "getServerSecurityLevel");

        mock.mockReturnValue(currentSecurity);

        for (let i = currentSecurity; i >= minSecurity; i -= 1) {
            mock.mockReturnValueOnce(i);
        }

        mock.mockReturnValueOnce(minSecurity);
    };

    describe("When a target is passed in to the script", () => {
        const target = "n00dles";
        const ns = getNsMock(["--target", target]);

        beforeEach(() => {
            jest.spyOn(ns, "weaken");
            mockSecurity(ns, 5, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should run weaken against the target", async () => {
            await weaken(ns);

            expect(ns.weaken).toBeCalledWith(target);
        });
    });

    describe("When a target is not passed in to the script", () => {
        const host = "host";
        const ns = getNsMock();

        beforeEach(() => {
            jest.spyOn(ns, "getHostname").mockImplementation(() => host);
            jest.spyOn(ns, "weaken");
            mockSecurity(ns, 5, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should run weaken against the host script", async () => {
            await weaken(ns);

            expect(ns.weaken).toBeCalledWith(host);
        });
    });

    describe("When the server is at the minimum security level", () => {
        const ns = getNsMock(["--target", "n00dles"]);

        beforeEach(() => {
            jest.spyOn(ns, "weaken");
            mockSecurity(ns, 1, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should not call weaken", async () => {
            await weaken(ns);

            expect(ns.weaken).not.toBeCalled();
        });
    });

    describe("When the server's security level is at the minimum plus the modifier", () => {
        const ns = getNsMock(["--target", "n00dles", "--weakenModifier", 3]);

        beforeEach(() => {
            jest.spyOn(ns, "weaken");
            mockSecurity(ns, 4, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should not call weaken", async () => {
            await weaken(ns);

            expect(ns.weaken).not.toBeCalled();
        });
    });

    describe("When the server's security level reaches the minimum plus the modifier", () => {
        const ns = getNsMock(["--target", "n00dles"]);

        let weakenMock: jest.SpiedFunction<
            (
                host: string,
                opts?: BasicHGWOptions | undefined
            ) => Promise<number>
        >;

        beforeEach(() => {
            weakenMock = jest.spyOn(ns, "weaken");
            mockSecurity(ns, 2, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should stop calling weaken", async () => {
            await weaken(ns);

            expect(weakenMock.mock.calls.length).toBe(1);
        });
    });

    describe("When weakenModifier < 0", () => {
        const ns = getNsMock(["--target", "n00dles", "--weakenLimit", -1]);

        let hackMock: jest.SpiedFunction<
            (
                host: string,
                opts?: BasicHGWOptions | undefined
            ) => Promise<number>
        >;

        beforeEach(() => {
            hackMock = jest.spyOn(ns, "weaken");
            mockSecurity(ns, 2, 1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should stop calling weaken once the security level reaches the minimum", async () => {
            await weaken(ns);

            expect(hackMock.mock.calls.length).toBe(1);
        });
    });
});
