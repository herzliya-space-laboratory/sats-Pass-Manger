
import axios from 'axios';
import getSatelliteTle from "../../src/utils/getSatelliteTle";

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