
<script>

    import axios from 'axios';

    export let passes;
	async function reloadPass() {
        try{
		await axios.get(`http://localhost:4000/api/v1/satellites/passes?endTime=${endTime}`);
		let res = await axios.get(`http://localhost:4000/api/v1/pass?sort=startTime`);
        const data = res.data.data;
        passes = data
        }
        catch(e)
        {
            alert(e);
        }
	}


    
    const reloadPassEvery = 86400;
    setInterval(reloadPass, reloadPassEvery);
</script>

<thead class="bg-black flex text-white w-full">
    <tr class="flex w-full mb-4">

        <th class="w-1/7 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            status
        </th>

        <th class="w-1/7 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            goal
        </th>

        <th class="w-1/7 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            start time
        </th>

        <th class="w-1/7 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            end time
        </th>

        <th class="w-1/7 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            max elevation
        </th>

        <th class="w-1/7 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            duration
        </th>

        <th class="w-1/7 px-6 pt-4 bg-gray-50">  </th>
    </tr>
</thead>
