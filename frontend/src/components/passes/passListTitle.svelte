
<script>
	async function reloadPass() {
		await axios.get(`http://localhost:4000/api/v1/satellites/passes?endTime=${endTime}`);
		let res = await axios.get(`http://localhost:4000/api/v1/pass?sort=startTime`);
        const data = res.data.data;
        passes = data
	}


    
    const reloadPassEvery = 86400;
    setInterval(reloadPass, reloadPassEvery);
</script>


<thead class="bg-black flex text-white w-full">
    <tr class="flex w-full mb-4">
        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            status
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Satellite name
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            goal
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            start time[local]
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            end time[local]
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            max elevation
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            duration[min]
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50"> 
                 <button on:click={reloadPass}
                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                    reload pass 
                </button>
        </th>
    </tr>
</thead>
