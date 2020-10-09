<script>
    export let form;
    export let errors;
    export let handleChange;


    const add = () => {
      $form.Telemetry = $form.Telemetry.concat({
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
      $errors.Telemetry = $errors.Telemetry.concat({
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
    };

    const remove = i => () => {
        $form.Telemetry = $form.Telemetry.filter((u, j) => j !== i);
        $errors.Telemetry = $errors.Telemetry.filter((u, j) => j !== i);
    };

    const addParmeterField = (i) => () =>{
        $form.Telemetry[i].parametrs = $form.Telemetry[i].parametrs.concat({
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

        $errors.Telemetry[i].parametrs = $errors.Telemetry[i].parametrs.concat({
                name: "",
                value: ""
        });
    };

    const removeParm = (i, j) => () => {
        $form.Telemetry[i].parametrs = $form.Telemetry[i].parametrs.filter((u, k) => j !== k);
        $errors.Telemetry.parametrs = $errors.Telemetry[i].parametrs.filter((u, k) => j !== k);
    };
    
</script>


{#each $form.Telemetry as commend, j}
    <div class="form-group">
        <div>
            <input
                placeholder="commend type"
                name={`Telemetry[${j}].st`}
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.Telemetry[j].st}
            />
            {#if $errors.Telemetry[j].st}
                <small class="error">{$errors.Telemetry[j].st}</small>
            {/if}
        </div>

        <div>
            <input
                placeholder="commend subtype"
                name={`Telemetry[${j}].sst`}
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.Telemetry[j].sst}
            />
            {#if $errors.Telemetry[j].sst}
                <small class="error">{$errors.Telemetry[j].sst}</small>
            {/if}
        </div>

        <div>
            <input
                placeholder="commend name"
                name={`Telemetry[${j}].name`}
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.Telemetry[j].name}
            />
            {#if $errors.Telemetry[j].name}
                <small class="error">{$errors.Telemetry[j].name}</small>
            {/if}
        </div>

        {#if $form.Telemetry.length !== 1}
            <button type="button" on:click={remove(j)}>-</button>
        {/if}

        {#if j === $form.Telemetry.length - 1}
            <button type="button" on:click={add}>+</button>
        {/if}

    </div>

    {#each commend.parametrs as parametr, i}
        <div class="form-group">
            <div>
                <input
                    placeholder="parmeter name"
                    name={`Telemetry[${j}].parametrs[${i}].name`}
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={$form.Telemetry[j].parametrs[i].name}
                />
                
                {#if $errors.Telemetry[j].st}
                    <small class="error">{$errors.Telemetry[j].parametrs[i].name}</small>
                {/if}
            </div>

            <div>
                <input
                    placeholder="parmeter value"
                    name={`Telemetry[${j}].parametrs[${i}].value`}
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={$form.Telemetry[j].parametrs[i].value}
                />
                
                {#if $errors.Telemetry[j].parametrs[i].value}
                    <small class="error">{$errors.Telemetry[j].parametrs[i].value}</small>
                {/if}
            </div>

            {#if $form.Telemetry[j].parametrs.length !== 1}
                <button type="button" on:click={removeParm(j, i)} >-</button>
            {/if}
            
            {#if i === $form.Telemetry[j].parametrs.length - 1}
                <button type="button" on:click={addParmeterField(j)}>+</button>
            {/if}


        </div>
    {/each}
{/each}



<style>
	input{
		padding: 6px 10px;
		margin: 8px 0;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 4px;
	}

	input:focus{
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

    button ~ button {
      margin-left: 15px;
    }

</style>