import axios from 'axios';

export default async function getSatelliteTle(SatelliteId)
{

    const URL = `http://celestrak.com/satcat/tle.php?CATNR=${SatelliteId}`;
    const response = await axios.get(URL);

    const data = response.data;

    return data;
}