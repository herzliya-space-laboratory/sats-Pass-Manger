<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import { createEventDispatcher } from 'svelte';

    export let satellite;
    export let deleteSat;

    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<tr class="flex w-full mb-4">
    <th class="w-1/3 px-6 pt-3 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {satellite.name}
    </th>
    
    <th class="w-1/3 px-6 pt-3 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {satellite.satId}
    </th>
        
    <td class="w-1/3 px-6 pt-4 whitespace-no-wrap text-center text-sm leading-5 font-medium">
        <a href="satellitesList/{satellite._id}" type="button" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            
            passes
        </a>
        {#if $session.token}
            <button class = "DeleteBtn" on:click={deleteSat(satellite._id)}>X</button>
        {/if}
    </td>
    
</tr>


<style>
	.DeleteBtn{
		background-color: red;
		color: white; 
		border: 1px #000 solid;
		border-radius: 50%;
		padding: 3px 7px;
		cursor: pointer;
		float: right;
	}
</style>