
<script>
    export let reloadPass;
    export let sort;
</script>


<thead class="bg-black flex text-white w-full">
    <tr class="flex w-full">
        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                status
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            
            <button on:click = {() => {sort = sort == "Satellite.name" ? sort = "-Satellite.name": sort = "Satellite.name"}}>
                Satellite name
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "goal" ? sort = "-goal": sort = "goal"}}>
                goal
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "startTime" ? sort = "-startTime": sort = "startTime"}}>
                start time[local]
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "endTime" ? sort = "-endTime": sort = "endTime"}}>
                end time[local]
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
           <button on:click = {() => {sort = sort == "maxElevation" ? sort = "-maxElevation": sort = "maxElevation"}}>
            max elevation
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "duration" ? sort = "-duration": sort = "duration"}}>
            duration [min]
            </button>
        </th>

        <th class="w-1/8 px-6 pt-4 bg-gray-50"> 
            <button on:click={reloadPass}
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                reload passes 
            </button>
        </th>
    </tr>
</thead>
