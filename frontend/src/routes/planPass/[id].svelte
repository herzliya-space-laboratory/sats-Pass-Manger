<script context="module">
    let id;
    
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`passes/${id}.json`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { pass: data };
		}
		else
		{
			this.error(res.status, data.message);
		}
	}
</script> 

<script>
    import PassCommends from "../../components/passCommends.svelte"
    import { createForm } from "svelte-forms-lib";
	import axios from 'axios'
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
		goal: pass.goal || "",
		PassPlanner: pass.PassPlanner || "",
		PassExecuter: pass.PassExecuter || "",
        Plan: pass.Plan || [
          {
			st: "",
			sst: "",
			name: "",
			parametrs: [
				{
					name: "",
					value: ""
				}
			]
          }
        ]
      },
      onSubmit: values => {
        alert(JSON.stringify(values));
        axios.put(`http://localhost:5000/api/v1/pass/updatePlan/${pass._id}`, values);
      }
    });

   
</script>


<svelte:head>
	<title> {pass.Satellite.name} </title>
</svelte:head>


<div class="shadow-white overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-white">
            what was in a pass
        </h3>

        <p class="mt-1 max-w-2xl text-sm leading-5 text-white">
            pass details and plan.
        </p>
    </div>

    <div>
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    satellite name
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.Satellite.name}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    start time
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    {new Date(pass.startTime).toLocaleString().replace(',', ' ')}
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    end time
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    {new Date(pass.endTime).toLocaleString().replace(',', ' ')}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    max elevation
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.maxElevation.toFixed(2)}
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    duration
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    {pass.duration}
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    pass goal
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
					<input class="w-3/4" placeholder="pass goal" name = "goal" bind:value={$form.goal}/>
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                   pass planner
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
					<input class="w-3/4" placeholder="pass planner" name = "PassPlanner" bind:value={$form.PassPlanner}/> 
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    pass executer
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
					<input class="w-3/4" placeholder="pass executer" name = "PassExecuter" bind:value={$form.PassExecuter}/>
                </dd>
            </div>

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    pass plan
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    <PassCommends form={form} errors={errors} handleChange={handleChange} />
                </dd>
            </div>
        </dl>
    </div>
		
    <div class="flex">
        <button 
            type="button" 
            on:click={handleSubmit}
            class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
            >
                submit
            </button>

        <button 
            type="button"
            on:click={handleReset}
            class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
            >
                reset
            </button>
    </div>

</div>


<style>
	h2{
		font-size: 2em;
	}

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

    .button-group {
      display: flex;
    }

    button ~ button {
      margin-left: 15px;
    }

</style>