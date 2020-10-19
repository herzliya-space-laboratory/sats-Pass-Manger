
<script>
    export let pass;

    const didThePassHappen = new Date(pass.startTime) < new Date();
    const passPageUrl = `/${didThePassHappen ? 'whatWasInAPass' : 'planPass'}/${pass._id}`;

</script>


<tr class="flex w-full mb-4">
    <td class="w-1/7 px-6 py-4 whitespace-no-wrap">
        <div class="flex items-center">
            <div class="ml-4">
                <div class="text-xl text-center leading-5 text-white-900">
                    {pass.goal || "there is no goal"}
                </div>
                <div class="text-xl text-center leading-5 text-white-500">
                    {pass.PassPlanner || ""}
                </div>
                <div class="text-xl text-center leading-5 text-white-500">
                    {pass.PassExecuter || ""}
                </div>
            </div>
        </div>
    </td>

    <td class="w-1/7 text-xl px-6 py-4 text-center whitespace-no-wrap">
        {@html new Date(pass.startTime).toLocaleString().replace(',', '<br>')}        
    </td>

    <td class="w-1/7 text-xl px-6 text-center py-4 whitespace-no-wrap">
        {@html new Date(pass.endTime).toLocaleString().replace(',', '<br>')}
    </td>

    <td class="w-1/7 text-xl px-6 text-center py-4 whitespace-no-wrap leading-5 text-gray-500">
        {pass.maxElevation.toFixed(2)}
    </td>


    <td class="w-1/7 text-xl px-6 text-center py-4 whitespace-no-wrap leading-5 text-gray-500">
        {pass.duration} 
    </td>

    <td class="w-1/7 text-xl px-6 py-4 whitespace-no-wrap text-cente leading-5 font-medium">
        <a href={passPageUrl} type="button"
         class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
        </a>
    </td>
</tr>
