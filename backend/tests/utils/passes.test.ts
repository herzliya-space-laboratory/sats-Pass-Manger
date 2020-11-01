import getSatelliteTle from "../../src/utils/getSatelliteTle";
import getSatellitePasses from "../../src/utils/getSatellitePasses";

test("get Satellite pass at a instance is emptay array", async () => {
    const tle = await getSatelliteTle(40060);
    
    const res = getSatellitePasses(tle, new Date(), new Date(), 40060);

    expect(res).toEqual([]);
}, 25000)