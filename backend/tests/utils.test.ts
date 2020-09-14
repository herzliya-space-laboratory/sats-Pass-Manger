require("../src/utils/dotenvInit");

import { getSatelliteTle } from "utils/getSatelliteTle";

import axios from 'axios';


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

describe("Satellite utils tests", () => {
    test("get Satellite Tle test", async () => {
        const res = await getSatelliteTle(40060);
        

    const URL = 'http://celestrak.com/satcat/tle.php?CATNR=40060';
        const output =  (await axios.get(URL)).data;
        
        expect(res).toBe(output);
    })
})

