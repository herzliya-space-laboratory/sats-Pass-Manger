require("../src/utils/dotenvInit");

describe("env vars test", () => {
   test("check the env vars defined", () => 
    {
        expect(process.env.NODE_ENV).toBeTruthy();
        expect(process.env.PORT).toBeTruthy();
        expect(process.env.MONGO_URI).toBeTruthy();

        expect(process.env.SERVER_MANGER_TYPE).toBeTruthy();
        expect(process.env.DB_MANGER_TYPE).toBeTruthy();
        

    }) 
})

