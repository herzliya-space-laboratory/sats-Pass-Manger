
<script context="module">
    import axios from "axios";
    
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:4000/api/v1/getClosePass");
        const data = res.data.data;
        return { pass: data };
	}
</script>

<script>
    import PassTelemetry from "../components/passTelemetry.svelte"
    import { createForm } from "svelte-forms-lib";
    import { onMount } from 'svelte';

    export let pass;
    
    onMount(() => {
        let coll = document.getElementsByClassName("collapsible");
        let i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }
    });
    
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
        axios.put(`http://localhost:4000/api/v1/pass/updateWhatWasExequte/${pass._id}`, values);
      }
    });
    

</script>


<svelte:head>
	<title> next pass </title>
</svelte:head>

<div class="shadow-white overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-white">
            next pass
        </h3>

        <p class="mt-1 max-w-2xl text-sm leading-5 text-white">
            pass plan
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

        
            {#if pass.goal}
                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm leading-5 font-medium text-white">
                        goal
                    </dt>

                    <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                        {pass.goal}
                    </dd>
                </div>

                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm leading-5 font-medium text-white">
                        pass planner
                    </dt>

                    <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                        {pass.PassPlanner}
                    </dd>
                </div>
                
                <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm leading-5 font-medium text-white">
                        pass executer
                    </dt>

                    <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                        {pass.PassExecuter}
                    </dd>
                </div>
                
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm leading-5 font-medium text-white">
                        pass Plan
                    </dt>

                    <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                        <ul class="border border-gray-200 rounded-md divide-y divide-gray-400">  
                            {#each pass.Plan as commend, i}
                                
                                <li class="p-0 items-center text-sm">
                                <button class="collapsible m-0">{commend.name}({commend.st}, {commend.sst}): </button>
                                <div class = "content">
                                    {#each commend.parametrs as parameter}
                                        {`${parameter.name}: ${parameter.value}`} <br>
                                    {/each}
                                </div>
                                </li>
                            {/each}
                        </ul>  
                    </dd>
                </div>
            {/if}

            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    pass summary
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    <textarea 
                        class="w-3/4" 
                        placeholder="pass summary" 
                        name = "whatWasExecute" 
                        bind:value={$form.whatWasExecute} />
                </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                   errors summary if there where
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    <textarea 
                        class="w-3/4" 
                        placeholder="Errors summary" 
                        name = "Errors" 
                        bind:value={$form.Errors}/>
                </dd>
            </div>
            
            <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-white">
                    data recived
                </dt>

                <dd class="mt-1 text-sm leading-5 text-white sm:mt-0 sm:col-span-2">
                    <PassTelemetry form={form} errors={errors} handleChange={handleChange} />
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
    .content {
        padding: 0 18px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: #111;
    }

    .collapsible {
        background-color: #777;
        color: #111;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
    }

    :global(.active), .collapsible:hover {
        background-color: #555;
    }

    .collapsible:after {
        content: '\002B';
        color: #111;
        font-weight: bold;
        float: right;
        margin-left: 5px;
    }
    
    :global(.active:after) {
        content: "\2212";
    }

    button ~ button {
      margin-left: 15px;
    }

</style>