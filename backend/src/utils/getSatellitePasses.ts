import jspredict from 'jspredict'

export default function findSatellitePasses(tle, startTime, endTime, satDbID)
{
    const qth = [32.27, 34.88, 0];
    let passes;
    
    passes = jspredict.transits(tle, qth, startTime, endTime);
    console.log(tle, passes, endTime, startTime);
    
    passes = formatPasses(passes, satDbID);
    console.log(passes);
    
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

