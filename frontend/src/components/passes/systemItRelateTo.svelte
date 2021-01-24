<script>
    export let inputMode = false;
    export let systemItRelateTo = [];

    let nextTag = '';

    function addTag(){
        systemItRelateTo = Array.from(new Set([...systemItRelateTo, nextTag.toUpperCase()]));
        nextTag = '';
    }

    const removeTag = (systemToRemove) => () => {
        systemItRelateTo = systemItRelateTo.filter(system => system != systemToRemove);
    }
</script>

{#if inputMode}
    <input class="text-black" type="text" bind:value={nextTag}>
    <button on:click = {addTag}>+</button>
{/if}

{#each systemItRelateTo as system}
<div
    class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-900 rounded-full"
  >
    <button class = "w-4 h-4 text-red-600" on:click = {removeTag(system)}>X</button>      
    {system}
  </div>
{/each}