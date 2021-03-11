
<script>
    export let pass;

    const didThePassHappen = new Date(pass.startTime) < new Date();
    const passPageUrl = `/${didThePassHappen ? 'whatWasInAPass' : 'planPass'}/${pass._id}`;
    const fieldWidthClass = ' w-1/12';
</script>


<tr class="flex w-full mb-4">
    <td class={"px-6 pt-4 whitespace-no-wrap" + fieldWidthClass}>
        {pass.PassPlanner? pass.Satellite.name: "pass wasnt plan yet"}
    </td>
    
   <td class={"px-6 pt-4 text-center text-xl whitespace-no-wrap" + fieldWidthClass}>
        {@html new Date(pass.startTime).toLocaleString('he-IL').replace(',', '<br>')}
    </td>

    <td class={"px-6 text-center pt-4 text-xl whitespace-no-wrap" + fieldWidthClass}>
        {@html new Date(pass.endTime).toLocaleString('he-IL').replace(',', '<br>')}
    </td>

    <td class={"px-6 text-center pt-6 text-xl whitespace-no-wrap leading-5 text-white" + fieldWidthClass}>
        {pass.maxElevation.toFixed(2)}
    </td>

    <td class={"px-6 text-center pt-6 text-xl whitespace-no-wrap leading-5 text-white" + fieldWidthClass}>
        {pass.duration} 
    </td>

    {#each pass.stations as station}
        <td class={"px-6 pt-6 whitespace-no-wrap" + fieldWidthClass}>
            <div class="text-xl text-center leading-5 text-white">{station} </div>
        </td>
    {/each}


    <td class={"px-6 pt-6 whitespace-no-wrap" + fieldWidthClass}>
        <div class="text-xl text-center leading-5 text-white">{pass.performance} </div>
    </td>

    <td class={"px-6 pt-6 whitespace-no-wrap" + fieldWidthClass}>
        <div class="text-xl text-center leading-5 text-white">{pass.status} </div>
    </td>

    <td class={"px-6 pt-6 whitespace-no-wrap text-xl text-center leading-5 font-medium" + fieldWidthClass}>

        <a href={passPageUrl} type="button"
         class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            more
        </a>
    </td>    
</tr>
