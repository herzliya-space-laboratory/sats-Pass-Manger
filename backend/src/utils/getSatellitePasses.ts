import jspredict from 'jspredict'

export default async function findSatellitePasses(tle, startTime, endTime, satDbID)
{
    const qth = [32.27, 34.88, 0];
    let passes = jspredict.transits(tle, qth, startTime, endTime);

    passes = formatPasses(passes, satDbID);

    return passes;
}

function formatPasses(passes: any, satDbID) {
    passes = passes.map(pass => {
        return {
            startTime: new Date(pass.start),
            endTime: new Date(pass.end),
            duration: new Date(pass.end - pass.start).getMinutes(),
            maxElevation: pass.maxElevation,
            Satellite: satDbID
        };
    });
    return passes;
}

