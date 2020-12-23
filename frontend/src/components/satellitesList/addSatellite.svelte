<script>
    export let name = '';
    export let satId = '';
    
    export let createSat;
</script>

<div class='box'>
    <form on:submit|preventDefault={createSat}>
        <input
            class="appearance-none ml-3 inline-block w-1/3 bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            bind:value={name} 
            placeholder="satlllite name" />
        <input 
            class="appearance-none inline-block w-1/3 bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
            id="grid-first-name" 
            bind:value={satId} 
            placeholder="norad id" />

        <input 
            type='submit' 
            value='create' 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
    </form>
</div>
