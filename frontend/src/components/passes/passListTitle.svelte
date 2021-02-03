
<script>
    export let reloadPass;
    export let sort;
    const titleWidthClass = ' w-1/12';
</script>


<thead class="bg-black flex text-white w-full rounded-md">
    <tr class="flex w-full">
        <th class={"px-6 pt-4 text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "Satellite.name" ? sort = "-Satellite.name": sort = "Satellite.name"}}>
                Satellite name
            </button>
        </th>

        <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "startTime" ? sort = "-startTime": sort = "startTime"}}>
                Start time [local]
            </button>
        </th>

        <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "endTime" ? sort = "-endTime": sort = "endTime"}}>
                End time [local]
            </button>
        </th>

        <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
           <button on:click = {() => {sort = sort == "maxElevation" ? sort = "-maxElevation": sort = "maxElevation"}}>
            Max elevation
            </button>
        </th>

        <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "duration" ? sort = "-duration": sort = "duration"}}>
            Duration [min]
            </button>
        </th>



        {#each ['HSL', 'TAU', 'SHAAR', 'yeruham'] as station}
            <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
                <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                    {station}
                </button>
            </th>
        {/each}

        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-betwee ml-4">
                    <div class="text-xl text-center leading-5 text-white-500">
                        <button on:click = {() => {sort = sort == "PassPlanner.name" ? sort = "-PassPlanner.name": sort = "PassPlanner.name"}}>
                            Planner/
                        </button>
                    </div>
                    <div class="text-xl text-center leading-5 text-white-500">
                        <button on:click = {() => {sort = sort == "PassOperator.name" ? sort = "-PassOperator.name": sort = "PassOperator.name"}}>
                            Operator
                        </button>
                    </div>
                </div>
            </div>
        </td>

        <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                Performance
            </button>
        </th>


        <th class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white uppercase tracking-wider" + titleWidthClass}>
            <button on:click = {() => {sort = sort == "status" ? sort = "-status": sort = "status"}}>
                State
            </button>
        </th>

        <th class="px-6 pt-4 "> 
            <button on:click={reloadPass}
                class="inline-flex items-center mb-2 mt-0 px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-black hover:text-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                Reload passes 
            </button>
        </th>
    </tr>
</thead>
