require("../../src/utils/dotenvInit");

import {createAPIManger, createDBManger} from "../../src/utils/MangersInit";

import expressApi from "../../src/IO_Mangers/ApiManger/expressApi";
import SatellitesDBManger from "../../src/IO_Mangers/DBManger/mongoDB/SatellitesDBManger";
import PassesDBManger from "../../src/IO_Mangers/DBManger/mongoDB/PassesDBManger";
import AuthDBManger from "../../src/IO_Mangers/DBManger/mongoDB/AuthDBManger";
import TestsDBManger from "../../src/IO_Mangers/DBManger/mongoDB/TestsDBManger";


test("api init", () => {
    const output = createAPIManger(6000);

    expect(output instanceof  expressApi).toBe(true);
    output.close();
})


test("db init", () => {
    const {satDBManger, passDBManger, usersDBManger, testDBManger} = createDBManger();

    expect(satDBManger instanceof SatellitesDBManger).toBe(true);
    expect(passDBManger instanceof PassesDBManger).toBe(true);
    expect(usersDBManger instanceof AuthDBManger).toBe(true);
    expect(testDBManger instanceof TestsDBManger).toBe(true);

})
