<script>
    import { onMount, afterUpdate } from 'svelte';
    
    
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

    const toggleModal = (modalID) => () => {
        document.getElementById(modalID).classList.toggle("hidden");
        document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
        document.getElementById(modalID).classList.toggle("flex");
        document.getElementById(modalID + "-backdrop").classList.toggle("flex");
    }
</script>

<ul class="border border-gray-200 rounded-md divide-y divide-gray-400" style="background-color: #4a5568;">  
    {#each $form.Telemetry as commend, j}
        <li class="p-0 items-center text-sm">
            
                <div class="form-group w-full ">
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

                    <button class=" m-0 bg-gray-400 w-full" on:click={toggleModal(`modal-id-${j}`)}> parmeters </button>
                </div>
            {#if $form.Telemetry.length !== 1}
                <button 
                    type="button" 
                    on:click={remove(j)}
                    class="bg-blue-700 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 m"
                >-</button>
            {/if}

            {#if j === $form.Telemetry.length - 1}
                <button 
                type="button" 
                on:click={add}
                class="bg-blue-700 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 m"
                >+</button>
            {/if}

            <div class=" hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center" id={`modal-id-${j}`}>
                <div class="relative w-1/2 my-6 mx-auto">
                
                    <div class="border-0 rounded-lg shadow-white relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none" style='background-color: #4a5568;'>
                    <!--header-->
                    <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <h3 class="text-3xl font-semibold">
                            {$form.Telemetry[j].name}
                        </h3>

                        <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModal(`modal-id-${j}`)}>
                            <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative p-6 flex-auto">
                        {#each commend.parametrs as parametr, i}
                            <div class="form-group">
                                <div>
                                    <input
                                        class = "gray"
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
                                    <button 
                                        type="button" 
                                        on:click={removeParm(j, i)} 
                                        class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                                        >-</button>
                                {/if}
                                
                                {#if i === $form.Telemetry[j].parametrs.length - 1}
                                    <button 
                                        type="button" 
                                        on:click={addParmeterField(j)}
                                        class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                                    >+</button>
                                {/if}


                            </div>
                        {/each}

                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden opacity-25 fixed inset-0 z-40 bg-black" id="modal-id-backdrop"></div>


            
        </li>
    {/each}
</ul>  

    

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

    button ~ button {
      margin-left: 15px;
    }
</style>