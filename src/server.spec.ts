import Server from "./server";

describe("Server", () => {
    describe("constructor", () => {
        it("should return an instance of Server", () => {
            const server = new Server();

            expect(server).toBeInstanceOf(Server);
        });
    });
});
