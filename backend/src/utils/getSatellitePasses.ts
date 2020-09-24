import axios from 'axios';
import jspredict from 'jspredict'

export default async function getSatellitePasses(tle, startTime, endTime)
{
    const qth = [32.27, 34.88, 0];
    let passes = jspredict.transits(tle, qth, startTime, endTime);

    passes = formatPasses(passes);

    return passes;
}

function formatPasses(passes: any) {
    passes = passes.map(pass => {
        return {
            startTime: new Date(pass.start),
            endTime: new Date(pass.end),
            duration: new Date(pass.end - pass.start).getMinutes(),
            maxElvation: pass.maxElevation
        };
    });
    return passes;
}

