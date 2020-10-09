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

<div class='content'>
	<h2> start time: {new Date(pass.startTime).toLocaleString().replace(',', ' ')} </h2>
	<h2> end time: {new Date(pass.endTime).toLocaleString().replace(',', ' ')} </h2>
	<h2> max elevation: {pass.maxElevation.toFixed(2)} </h2>
	<h2> duration: {pass.duration} </h2>

	<form onsubmit="">
		pass goal <br>
		<input placeholder="pass goal" name = "goal" bind:value={$form.goal}/> <br>
		pass planner <br>
		<input placeholder="pass planner" name = "PassPlanner" bind:value={$form.PassPlanner}/> <br>
		pass executer <br>
		<input placeholder="pass executer" name = "PassExecuter" bind:value={$form.PassExecuter}/> <br>
		
		pass plan <br>
		<PassCommends form={form} errors={errors} handleChange={handleChange} />
		
	
		<div class="button-group">
			<button type="button" on:click={handleSubmit}>submit</button>
			<button type="button" on:click={handleReset}>reset</button>
		</div>
	</form>
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