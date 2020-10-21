
<script>
    import axios from 'axios';

    export let passes;
	const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    export let endTime = nextWeek;
    export let limit = 0;


	async function reloadPass() {
        try{
            await axios.get(`http://localhost:4000/api/v1/satellites/passes?endTime=${endTime || nextWeek}&limit=${limit}`);
            let res = await axios.get(`http://localhost:4000/api/v1/pass?sort=startTime`);
            const data = res.data.data;
            passes = data
        }
        catch(e)
        {
            console.log(e);
            alert(e);
        }
	}


    
    const reloadPassEvery = 90*60*1000;
    setInterval(reloadPass, reloadPassEvery);
</script>


<thead class="bg-black flex text-white w-full">
    <tr class="flex w-full">
        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            status
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Satellite name
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            goal
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            start time[local]
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            end time[local]
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            max elevation
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            duration [min]
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50"> 
                 <button on:click={reloadPass}
                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                    reload passes 
                </button>
        </th>
    </tr>
</thead>
