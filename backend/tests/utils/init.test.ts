require("../../src/utils/dotenvInit");

import {createAPIManger, createDBManger} from "../../src/utils/MangersInit";

import expressApi from "../../src/IO_Mangers/ApiManger/expressApi";
import mangoDBManger from "../../src/IO_Mangers/DBManger/mangoDBManger";


test("api init", () => {
    const output = createAPIManger(6000);

    expect(output instanceof  expressApi).toBe(true);
    output.close();
})


test("db init", () => {
    const output = createDBManger();

    expect(output instanceof mangoDBManger).toBe(true);
})
