
<script>
    export let sort;
</script>


<thead class="bg-black flex text-white w-full mb-4">
    <tr class="flex w-full">
        <th class="w-1/4 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-200 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "email" ? sort = "-email": sort = "email"}}>
                name
            </button>
        </th>

        <th class="w-1/4 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-200 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "email" ? sort = "-email": sort = "email"}}>
                email
            </button>
        </th>

        <th class="w-1/4 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-200 uppercase tracking-wider">
            <button on:click = {() => {sort = sort == "role" ? sort = "-role": sort = "role"}}>
                role
            </button>
        </th>
        <th class="w-1/4 px-6 pt-4 bg-gray-50 text-center text-xl leading-4 font-medium text-gray-200 uppercase tracking-wider">
        </th>
    </tr>
</thead>
