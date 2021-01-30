<script>
    export let page;
    export let changePage;
</script>

<div class="bg-black px-4 py-3 flex items-center  rounded-b-md justify-between border-t border-gray-200 sm:px-6">
  <div class="flex-1 flex justify-between sm:hidden">

    {#if page.previous}
        <button on:click={changePage(page.previous.page)} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-black hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
        Previous
        </button>
    {/if}

    {#if page.next}
        <button on:click={changePage(page.next.page)} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-black hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
        Next
        </button>
    {/if}

  </div>
  
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <nav class="relative inline-flex shadow-sm">
        {#if page.previous}
            <button on:click={changePage(page.previous.page)} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
            <!-- Heroicon name: chevron-left -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            </button>
        {/if}
        
        <div class = 'max-w-full block h-10 overflow-x-auto border border-gray-300'>
            {#each new Array(page.last.page ) as p, i}
                {#if i == page.page - 1 && i != 0}
                  <button class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                  ...
                  </button>
                {:else if i < 3}
                  <button on:click={changePage(i + 1)} class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    {i + 1}
                  </button>
                {:else if ( page.page - 5 < i  && i< page.page + 6)}
                  <button on:click={changePage(i + 1)} class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    {i + 1}
                  </button>
                {:else if  i > page.last.page - 5}
                  <button on:click={changePage(i + 1)} class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    {i + 1}
                  </button>
                {:else if  i == page.page - 5 || i == page.page + 5 || i == page.last.page - 5}
                  <button on:click={changePage(i + 1)} class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                  ...
                  </button>
                {/if}
            {/each}
        </div>

        {#if page.next  != undefined}
            <button on:click={changePage(page.next.page)} class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-black text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
            <!-- Heroicon name: chevron-right -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            </button>
        {/if}
      </nav>
    </div>
  </div>
</div>