<script context="module">
    let id;

	export async function preload(page, session) {
		id = page.params.id;
        
		const res = await this.fetch(`users/${id}.json`);
		const data = await res.json();

		if (res.status == 200) 
		{
			return { user: data,};
		}
		else
		{
			this.error(res.status, data.message);
		}
	}
</script> 

<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import { createForm } from "svelte-forms-lib";
	import { setAlert } from '../../alert';

    export let user;


	const {
      form,
      errors,
      state,
      handleChange,
      handleSubmit,
      handleReset
    } = createForm({
      initialValues: {
		name: user.name || "",
		email: user.email,
		role: user.role
		},
      onSubmit: values => {
        setAlert(JSON.stringify(values));
        
        let config = {
            headers: {
                authorization: "Bearer " +  $session.token,
            }
        }
        
        fetch(`user/${pass._id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            if(res.status != 200)
                res.json().then( e => setAlert(`faild to save user:\n${e.message}`))
        })
        .catch(e => setAlert(`faild to save user:\n${e}`));

      }
    });

</script>


<svelte:head>
	<title> {user.name} </title>
</svelte:head>


<div class="shadow-white overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-white">
            {user.name}
        </h3>

        <p class="mt-1 max-w-2xl text-xl leading-5 text-white">
            user details and status.
        </p>
    </div>

    <div>
        <dl>
            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    user name
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {#if $session.token}
                        <input class="w-3/4 text-black" placeholder="user name" name = "name" bind:value={$form.name}/>
					{:else}
						{$form.name}
					{/if}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    email
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {#if $session.token}
                        <input class="w-3/4 text-black" placeholder="email" name = "email" bind:value={$form.email}/>
					{:else}
						{$form.email}
					{/if}
                </dd>
            </div>

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
					role
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {#if $session.token}
						<select
							class="w-3/4 text-black"
							id="grid-first-name"
							bind:value={$form.role} 
							placeholder="role"
							name = "role">
							<option value=''>  </option>
							<option value='student'> student </option>
							<option value='instructions'> instructions </option>
							<option value='admin'> admin </option>
						</select>
					{:else}
						{$form.role}
					{/if}
                </dd>
            </div>
        </dl>
    </div>
		
    {#if $session.token}
        <div class="flex">
            <button 
                type="button" 
                on:click={handleSubmit}
                class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                >
                    submit
                </button>

            <button 
                type="button"
                on:click={handleReset}
                class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                >
                    reset
                </button>
        </div>
    {/if}

</div>


<style>
	input {
		padding: 6px 10px;
		margin: 8px 0;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 4px;
	}

	input:focus {
		background-color: lightblue;
	}


	button {
		background-color:  rgb(142, 142, 142);
		border: black 1px;
		border-radius: 25px;
		color: black;
		padding: 5px 10px;
		margin: 10px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}

    button ~ button {
      margin-left: 15px;
    }

</style>