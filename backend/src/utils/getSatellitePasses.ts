import axios from 'axios';

export default async function getSatellitePasses(satId, dayAmount)
{

    const URL = 
    `http://www.n2yo.com/rest/v1/satellite/visualpasses/${satId}/32.27/34.88/0/${dayAmount}/10&apiKey=${process.env.n2yo_API_KEY}`;
    const response = await axios.get(URL);

    let passes = response.data.passes;
    
    passes = passes.map(pass => {
        return {
            startTime: new Date(pass.startUTC*1000),
            endTime: new Date(pass.endUTC*1000),
            duration: (pass.endUTC - pass.startUTC)/60,
            maxElvation: pass.maxEl
            
        }
    })

    return passes;
}