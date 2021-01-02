
<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    export let user;
    export let deleteUser;
</script>


<tr class="flex w-full mb-4">
    <td class="w-1/4 px-6 pt-6 whitespace-no-wrap">
        <div class="text-xl text-center leading-5 text-white-900">{user.name} </div>
    </td>

    <td class="w-1/4 px-6 pt-6 whitespace-no-wrap">
        <div class="text-xl text-center leading-5 text-white-900">{user.email} </div>
    </td>

    <td class="w-1/4 px-6 text-center pt-6 text-xl whitespace-no-wrap leading-5 text-gray-500">
        {user.role}
    </td>

    <td class="w-1/4 px-6 pt-6 whitespace-no-wrap text-xl text-center leading-5 font-medium">

        <a href={`users/${user._id}`} type="button"
         class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            more
        </a>
        {#if $session.token}
            <button class = "border-2 p-2 m-1 rounded-full border-white" on:click={deleteUser(user._id)}>X</button>
        {/if}
    </td>
</tr>