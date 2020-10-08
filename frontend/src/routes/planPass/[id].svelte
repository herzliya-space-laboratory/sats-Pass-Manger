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

    const add = () => {
      $form.Plan = $form.Plan.concat({
            id: "",
			name: "",
			parametrs: [
				{
					name: "",
					value: ""
				}
			]
          });
      $errors.Plan = $errors.Plan.concat({
            id: "",
			name: "",
			parametrs: [
				{
					name: "",
					value: ""
				}
			]
          });
    };

    const remove = i => () => {
      $form.Plan = $form.Plan.filter((u, j) => j !== i);
      $errors.Plan = $errors.Plan.filter((u, j) => j !== i);
	};
	
	const addParmeterField = (i) => () =>{
        $form.Plan[i].parametrs = $form.Plan[i].parametrs.concat({
                st: "",
                sst: "",
                name: "",
                parametrs: [
                    {
                        name: "",
                        value: ""
                    }
                ]
        });

        $errors.Plan[i].parametrs = $errors.Plan[i].parametrs.concat({
                name: "",
                value: ""
        });
    };

    const removeParm = (i, j) => () => {
        $form.Plan[i].parametrs = $form.Plan[i].parametrs.filter((u, k) => j !== k);
        $errors.Plan.parametrs = $errors.Plan[i].parametrs.filter((u, k) => j !== k);
    };
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
		{#each $form.Plan as commend, j}
			<div class="form-group">
				<div>
					<input
						placeholder="commend type"
						name={`Plan[${j}].st`}
						on:change={handleChange}
						on:blur={handleChange}
						bind:value={$form.Plan[j].st}
					/>
					{#if $errors.Plan[j].st}
						<small class="error">{$errors.Plan[j].st}</small>
					{/if}
				</div>

				<div>
					<input
						placeholder="commend subtype"
						name={`Plan[${j}].sst`}
						on:change={handleChange}
						on:blur={handleChange}
						bind:value={$form.Plan[j].sst}
					/>
					{#if $errors.Plan[j].sst}
						<small class="error">{$errors.Plan[j].sst}</small>
					{/if}
				</div>

				<div>
					<input
						placeholder="commend name"
						name={`commends[${j}].name`}
						on:change={handleChange}
						on:blur={handleChange}
						bind:value={$form.Plan[j].name}
					/>
					{#if $errors.Plan[j].name}
						<small class="error">{$errors.Plan[j].name}</small>
					{/if}
				</div>

				{#if j === $form.Plan.length - 1}
					<button type="button" on:click={add}>+</button>
				{/if}

				{#if $form.Plan.length !== 1}
					<button type="button" on:click={remove(j)}>-</button>
				{/if}

			</div>

			{#each commend.parametrs as parametr, i}
                <div class="form-group">
                    <div>
                        <input
                            placeholder="parmeter name"
                            name={`Plan[${j}].parametrs[${i}].name`}
                            on:change={handleChange}
                            on:blur={handleChange}
                            bind:value={$form.Plan[j].parametrs[i].name}
                        />
                        
                        {#if $errors.Plan[j].st}
                            <small class="error">{$errors.Plan[j].parametrs[i].name}</small>
                        {/if}
                    </div>

                    <div>
                        <input
                            placeholder="parmeter value"
                            name={`Plan[${j}].parametrs[${i}].value`}
                            on:change={handleChange}
                            on:blur={handleChange}
                            bind:value={$form.Plan[j].parametrs[i].value}
                        />
                        
                        {#if $errors.Plan[j].parametrs[i].value}
                            <small class="error">{$errors.Plan[j].parametrs[i].value}</small>
                        {/if}
                    </div>

                    {#if $form.Plan[j].parametrs.length !== 1}
                        <button type="button" on:click={removeParm(j, i)} >-</button>
                    {/if}
                    
                    {#if i === $form.Plan[j].parametrs.length - 1}
					    <button type="button" on:click={addParmeterField(j)}>+</button>
                    {/if}


                </div>
            {/each}
		{/each}
	
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

	.error {
      display: block;
      color: red;
    }
	
    .form-group {
      display: flex;
      align-items: baseline;
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