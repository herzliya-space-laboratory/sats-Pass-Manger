<script context="module">

    let id;
    export async function preload({ params, query }, session) {
        id = params.id;

		const res = await this.fetch(`passes/${id}.json`);
		const pass = await res.json();

         if(res.status != 200)
            this.error(res.status, pass.message);


        let config = {
                headers: {
                    authorization: "Bearer " +  session.token,
                }
            }

        let users;
        if(session.token){
            try {
                const res =  await this.fetch('/users/users')
                users = await res.json();
                if(res.status != 200)
                    this.error(res.status, data.message);

            } catch (error) {
                this.error(JSON.stringify(error));
            }
        }

		if (res.status === 200) 
		{
			return { pass, users };
		}
		else
		{
			this.error(res.status, pass.message);
		}
	}
</script>

<script>
    import ErrorList from "../../components/passes/ErrorList";
    import { setAlert } from '../../alert'

    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import { createForm } from "svelte-forms-lib";
    import { onMount } from 'svelte';
    import SystemItRelateTo from "../../components/passes/systemItRelateTo";

    const stationsNames = ['HSL', 'TAU', 'SHAAR', 'yeruham'];

    export let pass;
    export let users;

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
        manualErrors: pass.manualErrors|| "none",
        systemErrors: pass.systemErrors|| "none",
        status: pass.status || ''
      },
      onSubmit: values => {
        values = {...values};
        setAlert(`pass data:\n${JSON.stringify(values, null, 2)}`);

        values.manualErrors = values.manualErrors.map(({_id}) => _id || '');
        values.systemErrors = values.systemErrors.map(({_id}) => _id || '');

        fetch(`passes/${pass._id}.json?before=false`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(res => {
            if(res.status != 200)
                res.json().then(data => 
                    setAlert(data.message, true));
        })
        .catch(e => setAlert(`faild to save pass:\n${e}`));
      }
    });

</script>


<svelte:head>
	<title> {pass.Satellite.name} </title>
</svelte:head>

<div class="shadow-white overflow-hidden sm:rounded-lg w-3/4 m-auto">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-white">
            post pass
        </h3>

        <p class="mt-1 max-w-2xl text-xl leading-5 text-white">
            pass details and plan.
        </p>
    </div>

    <div class = "h-3/4 overflow-y-auto">
        <dl>
            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    duration[min]
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.duration}
                </dd>
            </div>

        
            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    goal
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.goal || "no goal"}
                </dd>
            </div>

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    pass planner
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {(pass.PassPlanner || {}).name || "wasn't planed"}
                </dd>
            </div>
            
            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    pass Operator
                </dt>

                <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                    {(pass.PassOperator || {}).name || "no oprator"}
                </dd>
            </div>
            
            
            {#each pass.stations as stationState, i}
                <div class={"px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 " + (i % 2 == 1 ? "bg-black": "bg-gray-900")}>
                    <dt class="text-xl leading-5 font-medium text-white">
                        state of {stationsNames[i]} station
                    </dt>

                    <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                        {stationState}
                    </dd>
                </div>
            {/each}

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    playlist
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    {pass.commend || "no playlist"}
                </dd>
            </div>


            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                    notes
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    {pass.description || "no description"}
                </dd>
            </div>




            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-white">
                <dt class="text-xl leading-5 font-medium">
                    system it relate to
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    <SystemItRelateTo class="w-3/4" bind:systemItRelateTo = {$form.systemsItRelateTo}/>
                </dd>
            </div>               

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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

            <div class="bg-black  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                   manual errors
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    <ErrorList submitError={handleSubmit} {users} bind:formErrors={$form.manualErrors} componentId='manual'/>
                </dd>
            </div>
            

            <div class="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-xl leading-5 font-medium text-white">
                   system errors
                </dt>

                <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                    <ErrorList submitError={handleSubmit} {users} bind:formErrors={$form.systemErrors} componentId='system'/>

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