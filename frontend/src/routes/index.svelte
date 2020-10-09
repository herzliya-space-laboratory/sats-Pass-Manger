
<script context="module">
    import axios from "axios";
    
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:5000/api/v1/getClosePass");
        const data = res.data.data;
        return { pass: data };
	}
</script>

<script>
    import PassTelemetry from "../components/passTelemetry.svelte"
    import { createForm } from "svelte-forms-lib";
    
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
        Errors: pass.Errors || "none",
        Telemetry: pass.Telemetry || [
            {
                st: '',
                sst: '',
                name: '',
                parametrs: [
                    {
                        name: "",
                        recivedValue: ""
                    }
                ]
            }
        ]
      },
      onSubmit: values => {
        alert(JSON.stringify(values));
        axios.put(`http://localhost:5000/api/v1/pass/updateWhatWasExequte/${pass._id}`, values);
      }
    });
    
</script>


<svelte:head>
	<title> next pass </title>
</svelte:head>

<div class='content'>
	<h2> start time: {new Date(pass.startTime).toLocaleString().replace(',', ' ')} </h2>
	<h2> end time: {new Date(pass.endTime).toLocaleString().replace(',', ' ')} </h2>
	<h2> max elevation: {pass.maxElevation.toFixed(2)} </h2>
	<h2> duration: {pass.duration} </h2>

    {#if pass.goal}
        <h2> goal: {pass.goal} </h2>
        <h2> pass planner: {pass.PassPlanner} </h2>
        <h2> pass executer: {pass.PassExecuter} </h2>
        <h2> pass Plan:</h2>
        {#each pass.Plan as commend}
            <h2> {commend.name}({commend.st}, {commend.sst}): {commend.value}</h2>
                {#each commend.parametrs as parameter}
                    <h3> {parameter.name}: {parameter.value}</h3>
                {/each}
        {/each}
    {/if}

	<form>
		pass summary <br>
		<textarea class="textarea" placeholder="pass summary" name = "whatWasExecute" bind:value={$form.whatWasExecute}/> <br>
		errors summary if there where <br>
		<textarea class="textarea" placeholder="Errors summary" name = "Errors" bind:value={$form.Errors}/> <br>
		
		pass plan <br>
        <PassTelemetry form={form} errors={errors} handleChange={handleChange} />
		
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

	textarea{
		padding: 6px 10px;
		margin: 8px 0;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 4px;
	}

	textarea:focus {
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