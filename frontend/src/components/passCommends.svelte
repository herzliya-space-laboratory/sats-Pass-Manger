<script>
    export let form;
    export let errors;
    export let handleChange;


    const add = () => {
      $form.Plan = $form.Plan.concat({
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
      $errors.Plan = $errors.Plan.concat({
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
                name={`Plan[${j}].name`}
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.Plan[j].name}
            />
            {#if $errors.Plan[j].name}
                <small class="error">{$errors.Plan[j].name}</small>
            {/if}
        </div>

        {#if $form.Plan.length !== 1}
            <button type="button" on:click={remove(j)}>-</button>
        {/if}

        {#if j === $form.Plan.length - 1}
            <button type="button" on:click={add}>+</button>
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