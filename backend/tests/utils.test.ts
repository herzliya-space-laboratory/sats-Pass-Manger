require("../src/utils/dotenvInit");

import getSatelliteTle from "../src/utils/getSatelliteTle";
import getSatellitePasses from "../src/utils/getSatellitePasses";
import {createAPIManger, createDBManger} from "../src/utils/MangersInit";
import queryFormater from "../src/utils/queryFormater";

import axios from 'axios';
import expressApi from "IO_Mangers/ApiManger/expressApi";
import mangoDBManger from "IO_Mangers/DBManger/mangoDBManger";


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
    }, 15000)


    test("get other Satellite Tle test", async () => {
        const res = await getSatelliteTle(1);
        

        const URL = 'http://celestrak.com/satcat/tle.php?CATNR=1';
        const output =  (await axios.get(URL)).data;
        
        expect(res).toBe(output);
    }, 25000)
})


describe("get Satellite passes", () => {
    test("get Satellite pass at a instance is emptay array", async () => {
        const tle = await getSatelliteTle(40060);
        
        const res = getSatellitePasses(tle, new Date(), new Date(), 40060);

        expect(res).toEqual([]);
    }, 25000)
})

describe('test the query Formater', () => {
    test('test empty empty input return defualt object', () => {
        const input = {};
        const output = queryFormater(input);

        expect(output).toEqual({
            pagination: undefined,
             params: {
                limit: undefined,
                page: "",
                select: "",
                sort: "-createdAt"
            },
            formatQuery: {}
        });
    })

    test('test query input with qury parmetrs return defualt params + formt query', () => {
        const input = {query1: 5, query2: -10, query3: "abhd", query4: true};
        const output = queryFormater(input);

        expect(output).toEqual({
            pagination: undefined,
             params: {
                limit: undefined,
                page: "",
                select: "",
                sort: "-createdAt"
            },
            formatQuery: {query1: 5, query2: -10, query3: "abhd", query4: true}
        });
    })

    test('test query input with query format', () => {
        const input = {limit: "5", select: "query1,query2,query3", page: "9", sort:"-query1"};
        const output = queryFormater(input);

        expect(output).toEqual({
            pagination: undefined,
             params: {
                limit: 5,
                page: "9",
                select: "query1,query2,query3",
                sort: "-query1"
            },
            formatQuery: {}
        });
    })

    test('test query input with pages format', () => {
        const input_query = {limit: "5", page: "9"};
        const input_Amount = 100;
        const output = queryFormater(input_query, input_Amount);

        expect(output).toEqual({
            pagination: {next: {page: 9 + 1, limit: 5 * (9 + 1)}, last: {page: 9 - 1, limit: 5 * (9 - 1)}},
             params: {
                limit: 5,
                page: "9",
                select: "",
                sort: "-createdAt"
            },
            formatQuery: {}
        });
    })

    test('test query input with lte and gt format', () => {
        const input_query = {query1: {lte: 8}, query2: {gt: 1}};
        const output = queryFormater(input_query);

        expect(output).toEqual({
            pagination: undefined,
             params: {
                limit: undefined,
                page: "",
                select: "",
                sort: "-createdAt"
            },
            formatQuery: {query1: {$lte: 8}, query2: {$gt: 1}}
        });
    })
})

describe('test init functions', () => {
    test("api init", () => {
        const output = createAPIManger();

        expect(output instanceof  expressApi).toBe(true);
    })


    test("db init", () => {
        const output = createDBManger();

        expect(output instanceof mangoDBManger).toBe(true);
    })
})
