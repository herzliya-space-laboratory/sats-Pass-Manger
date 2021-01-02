<script>
    export let name = '';
    export let email = '';
    export let password = '';
    export let role = '';
    
    export let createUser;
</script>

<div class='box'>
    <form on:submit|preventDefault={createUser({name, email, password, role})}>
        <input
            class="appearance-none ml-3 inline-block w-1/5 bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            bind:value={name} 
            placeholder="user name" />
         <input
            class="appearance-none ml-3 inline-block w-1/5 bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            bind:value={email} 
            placeholder="email" />
         <input
            class="appearance-none ml-3 inline-block w-1/5 bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            bind:value={password} 
            type='password'
            placeholder="password" />

         <select
            class="appearance-none ml-3 inline-block w-1/5 bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            bind:value={role} 
            placeholder="role">
            <option value=''>  </option>
            <option value='student'> student </option>
            <option value='instructions'> instructions </option>
            <option value='admin'> admin </option>

        </select>
        
        <input 
            type='submit' 
            value='create' 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
    </form>
</div>
