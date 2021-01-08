
<script>

    import axios from 'axios';

    export let reloadPass;
    export let sort;


    const titleWidthClass = ' w-1/12';


	const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    


    
    const reloadPassEvery = 90*60*1000;
    setInterval(reloadPass, reloadPassEvery);
</script>

<thead class="flex text-white w-full">
    <tr class="flex w-full mb-4">

        
        <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "startTime" ? sort = "-startTime": sort = "startTime"}}>
                start time[local]
            </button>
        </th>

        <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "endTime" ? sort = "-endTime": sort = "endTime"}}>
                end time[local]
            </button>
        </th>

        <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
           <button on:click = {() => {sort = sort == "maxElevation" ? sort = "-maxElevation": sort = "maxElevation"}}>
            max elevation
            </button>
        </th>

        <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "duration" ? sort = "-duration": sort = "duration"}}>
            duration [min]
            </button>
        </th>



        {#each ['herzlia', 'tau', 'shaar', 'Yee'] as station}
            <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
                <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                    {station}
                </button>
            </th>
        {/each}

        <td class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-betwee ml-4">
                    <div class="text-xl text-center leading-5 text-white-500">
                        <button on:click = {() => {sort = sort == "PassPlanner.name" ? sort = "-PassPlanner.name": sort = "PassPlanner.name"}}>
                            planner
                        </button>
                    </div>
                    <div class="text-xl text-center leading-5 text-white-500">
                        <button on:click = {() => {sort = sort == "PassOperator.name" ? sort = "-PassOperator.name": sort = "PassOperator.name"}}>
                            operator
                        </button>
                    </div>
                </div>
            </div>
        </td>

        <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                performance
            </button>
        </th>


        <th class={"px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                state
            </button>
        </th>

        <th class="px-6 pt-4 bg-gray-50"> 
            <button on:click={reloadPass}
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                reload passes 
            </button>
        </th>
    </tr>
</thead>
