<script>
    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<thead class="bg-black flex text-white w-full">
    <tr class="flex w-full mb-4">
        <th class="w-1/3 px-6 pt-3 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            satellite name
        </th>

        <th class="w-1/3 px-6 pt-3 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
            satellite norad id
        </th>
        
        <th class="w-1/3 px-6 pt-3 bg-gray-50"></th>
    </tr>
</thead>