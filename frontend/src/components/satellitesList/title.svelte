<script>
    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<thead class="flex text-white w-full">
    <tr class="flex w-full mb-4">
        <th class="w-1/3 px-6 pt-3 text-center text-xl leading-4 font-medium text-white uppercase tracking-wider">
            satellite name
        </th>

        <th class="w-1/3 px-6 pt-3 text-center text-xl leading-4 font-medium text-white uppercase tracking-wider">
            satellite norad id
        </th>
        
        <th class="w-1/3 px-6 pt-3 "></th>
    </tr>
</thead>