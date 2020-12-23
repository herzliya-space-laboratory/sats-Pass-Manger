
<script context="module">
    import axios from "axios";
    let id;
    export async function preload({ params, query }) {
        id = params.id
        let res = await axios.get(`http://localhost:4000/api/v1/pass/${id}`);
        const data = res.data.data;
        return { pass: data };
	}
</script>

<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import { createForm } from "svelte-forms-lib";
    import { onMount } from 'svelte';

    export let pass;
    
	const {
      form,
      errors,
      state,
      handleChange,
      handleSubmit,
      handleReset
    } = createForm({
      initialValues: {
		whatWasExecute: pass.whatWasExecute || "",
        manualErrors: pass.manualErrors || "none",
        systemErrors: pass.systemErrors || "none",
        status: pass.status || ''
      },
      onSubmit: values => {
          
        let config = {
            headers: {
                authorization: "Bearer " +  $session.token,
            }
        }
        
        axios.put(`http://localhost:4000/api/v1/pass/updateWhatWasExequte/${pass._id}`, values, config)
            .catch(e => alert(e.response.data.error));
      }
    });
</script>


<svelte:head>
	<title> {pass.Satellite.name} </title>
</svelte:head>

<div class="shadow-white overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-white">
            post pass
        </h3>

        <p class="mt-1 max-w-2xl text-xl leading-5 text-white">
            pass details and plan.
        </p>
    </div>

    <div>
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    satellite name
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.Satellite.name}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    start time[local]
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {new Date(pass.startTime).toLocaleString('he-IL').replace(',', ' ')}
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    end time[local]
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {new Date(pass.endTime).toLocaleString('he-IL').replace(',', ' ')}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    max elevation
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.maxElevation.toFixed(2)}
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    duration[min]
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.duration}
                </dd>
            </div>

        
            {#if pass.goal}
                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        goal
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                        {pass.goal}
                    </dd>
                </div>

                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        pass planner
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                        {pass.PassPlanner}
                    </dd>
                </div>
                
                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        pass executer
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                        {pass.PassExecuter}
                    </dd>
                </div>
                
                
            {/if}

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    pass status
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    {#if $session.token}
                        <input class="w-3/4 text-black" placeholder="pass status" name = "status" bind:value={$form.status}/>
                    {:else}
                        {pass.status}
                    {/if}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    pass summary
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    {#if $session.token}
                        <textarea 
                            class="w-3/4 text-black" 
                            placeholder="pass summary" 
                            name = "whatWasExecute" 
                            bind:value={$form.whatWasExecute} />
                    {:else}
                        {pass.whatWasExecute}
                    {/if}
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                   manual errors
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    {#if $session.token}
                        <textarea 
                            class="w-3/4 text-black" 
                            placeholder="Errors summary" 
                            name = "Errors" 
                            bind:value={$form.manualErrors}/>
                    {:else}
                        {pass.manualErrors}
                    {/if}
                </dd>
            </div>
            

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                   system errors
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    {#if $session.token}
                        <textarea 
                            class="w-3/4 text-black" 
                            placeholder="Errors summary" 
                            name = "Errors" 
                            bind:value={$form.systemErrors}/>
                    {:else}
                        {pass.systemErrors}
                    {/if}
                </dd>
            </div>
            
             
        </dl>
    </div>
		
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

</div>




<style>	
    button ~ button {
      margin-left: 15px;
    }

</style>