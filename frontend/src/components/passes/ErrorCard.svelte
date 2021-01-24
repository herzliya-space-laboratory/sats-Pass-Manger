
<script>
    import { beforeUpdate } from 'svelte';

    export let ErrorId;
    export let modalIDToUse;
    export let users;
    export let reloadList;
    export let error = {};
    export let removeFromList;
    

    import SystemItRelateTo from './systemItRelateTo'
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import { createForm } from "svelte-forms-lib";

    export let toggleModal;


   const {
      form,
      errors,
      state,
      handleChange,
      handleSubmit,
      handleReset
    } = createForm({
      initialValues: {
		    whenTheErrorSpoted: error.whenTheErrorSpoted,
        whatTheSimptoms: error.whatTheSimptoms,
        isTheSimptomRepeat: error.isTheSimptomRepeat,
        whoSpotedTheSymptom: error.whoSpotedTheSymptom,
        hypothesis: error.hypothesis,
        howLongWillItTakeToSolve: error.howLongWillItTakeToSolve,
        WasSolved: error.WasSolved,
        howWasItSolved: error.howWasItSolved,
        systemsItRelateTo: error.systemsItRelateTo
      },
      onSubmit: async values => {
        toggleModal();

        const response = await fetch(`errors${(ErrorId? `/${ErrorId}` : "")}.json`, {
            method: (ErrorId? "PUT" : "POST"),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if(!ErrorId){
            reloadList({ ...data, ...values }, true);
            handleReset();
        }
        else{
            error = { ...data, ...error, ...values };
            reloadList(error, false);
        }
      }
    });

    async function deleteError(){
        if(!ErrorId) return;

        toggleModal();

        const response = await fetch(`errors/${ErrorId}.json`, {
            method: ('DELETE'),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        removeFromList(ErrorId);
    }
</script>


<div class=" hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center" id={modalIDToUse}>
  <div class="bg-black relative w-1/2 my-6 mx-auto">
    <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
      <h3 class="text-3xl font-semibold">
          add error
      </h3>

      <button class="p-1 ml-auto border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModal(`modal-id`)}>
          <span class="opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
          </span>
      </button>
  </div>
  
    <div class="container m-auto shadow-white overflow-hidden sm:rounded-lg">
        <div>
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        when was The Error first Spoted
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                        {#if $session.token}
                            <input 
                              class="text-black"
                              type = 'datetime-local' 
                              name = "whenTheErrorSpoted"
                              bind:value={$form.whenTheErrorSpoted}/>
                        {:else}
                            {$form.whenTheErrorSpoted }
                        {/if}
                        
                    </dd>
                </div>

                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        what The found Simptom
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                       {#if $session.token}
                            <input class="w-3/4 text-black" placeholder="error simptom" name = "whatTheSimptoms" bind:value={$form.whatTheSimptoms}/>
                        {:else}
                            {error.whatTheSimptoms}
                        {/if}
                    </dd>
                </div>

                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        dose This error Repeat
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                        {#if $session.token}
                            <input type="checkbox" class="text-black" name = "isTheSimptomRepeat" bind:value={$form.isTheSimptomRepeat}/>
                        {:else}
                            {error.isTheSimptomRepeat? "yes": "no"}
                        {/if}
                    </dd>
                </div>

                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        hypothesis to what the error is
                    </dt>

                    <dd class="mt-1 text-xl leading-5 text-white sm:mt-0 sm:col-span-2">
                        {#if $session.token}
                            <input class="w-3/4 text-black" name = "hypothesis" bind:value={$form.hypothesis}/>
                        {:else}
                            {error.hypothesis}
                        {/if}
                    </dd>
                </div>

                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        How many days will it take to solve the error
                    </dt>

                    <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                        {#if $session.token}
                            <input class="w-3/4 text-black" type="number" name = "howLongWillItTakeToSolve" bind:value={$form.howLongWillItTakeToSolve}/>
                        {:else}
                            {error.howLongWillItTakeToSolve + " days"}
                        {/if}
                    </dd>
                </div>


                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-xl leading-5 font-medium text-white">
                        who Spoted The Symptom
                    </dt>

                    <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                        {#if $session.token}
                            <select class="w-3/4 text-black" name = "PassOperator" placeholder="pass executer" bind:value={$form.PassOperator}>
                                {#if $form.whoSpotedTheSymptom != undefined}
                                    <option value={$form.whoSpotedTheSymptom}> {$form.whoSpotedTheSymptom.name} </option>
                                {:else}
                                    <option>chose who spooted the error</option>
                                {/if}

                                {#each users as user}
                                    <option value={user}>
                                        {user.name}
                                    </option>
                                {/each}
                            </select>
                        {:else if error.whoSpotedTheSymptom != undefined}
                            {error.whoSpotedTheSymptom.name}
                        {/if}
                    </dd>
                </div>


        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-white">
            <dt class="text-xl leading-5 font-medium">
                system it relate to
            </dt>

            <dd class="mt-1 text-xl leading-5 sm:mt-0 sm:col-span-2">
                <SystemItRelateTo class="w-3/4" inputMode = {$session.token} bind:systemItRelateTo = {$form.systemsItRelateTo}/>
            </dd>
        </div>





    <!----------------------------------------------submit------------------------------------------------------------------------------------>
        <div>
            {#if $session.token}
                <div class="flex">
                    <button 
                        type="button" 
                        on:click={handleSubmit}
                        class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                            submit
                    </button>

                    <button 
                        type="button"
                        on:click={deleteError}
                        class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out" >
                            delete
                    </button>

                    <button 
                        type="button"
                        on:click={handleReset}
                        class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out" >
                            reset
                    </button>
                </div>
            {/if}
        
        </div>
      </div>
    </div>
  </div>
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