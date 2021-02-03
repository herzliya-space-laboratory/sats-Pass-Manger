
<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    export let user;
    export let deleteUser;
</script>


<tr class="flex w-full mb-4">
    <td class="w-1/4 px-6 pt-6 whitespace-no-wrap">
        <div class="text-xl text-center leading-5 text-white">{user.name} </div>
    </td>

    <td class="w-1/4 px-6 pt-6 whitespace-no-wrap">
        <div class="text-xl text-center leading-5 text-white">{user.email} </div>
    </td>

    <td class="w-1/4 px-6 text-center pt-6 text-xl whitespace-no-wrap leading-5 text-white">
        {user.role}
    </td>

    <td class="w-1/4 px-6 pt-6 whitespace-no-wrap text-xl text-center leading-5 font-medium">
        

        {#if $session.decodedToken.role == "admin"}
            <div class="flex items-center">
                <div class="justify-betwee ml-4">
                    <div class="text-l text-center leading-5 text-white">
                        <a href={`users/${user._id}`} type="button"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                            more
                        </a>
                            <a href={`users/planedPasses/${user._id}`} type="button"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                planedPasses
                        </a>
                            <a href={`users/operatedPasses/${user._id}`} type="button"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                
                                operatedPasses
                        </a>
                    </div>
                    <div class="text-l text-center leading-5 text-white">
                        <button class = "border-2 p-2 m-1 h-10 w-10 rounded-full bg-red-600 border-white" on:click={deleteUser(user._id)}>X</button>
                    </div>
                </div>
            </div>
        {:else}
            <a href={`users/${user._id}`} type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                more
            </a>
            <a href={`users/planedPasses/${user._id}`} type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                    planedPasses
            </a>
            <a href={`users/operatedPasses/${user._id}`} type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                    operatedPasses
            </a>
        {/if}
    </td>
</tr>