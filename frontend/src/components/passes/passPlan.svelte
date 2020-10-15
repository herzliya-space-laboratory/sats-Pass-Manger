<script>
    export let Plan
</script>

<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt class="text-sm leading-5 font-medium text-white">
        pass Plan
    </dt>

    <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
        <ul class="border border-gray-200 rounded-md divide-y divide-gray-400">  
            {#each Plan as commend, i}
                
                <li class="p-0 items-center text-sm">
                <button class="collapsible m-0">{commend.name}({commend.st}, {commend.sst}): </button>
                <div class = "content">
                    {#each commend.parametrs as parameter}
                        {`${parameter.name}: ${parameter.value}`} <br>
                    {/each}
                </div>
                </li>
            {/each}
        </ul>  
    </dd>
</div>