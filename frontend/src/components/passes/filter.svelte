<script>
    import { onMount, afterUpdate } from 'svelte';

    export let query = "";
    export let reloadPass;
    let form = {
        startTime: {lte: "", gte: ""},
        endTime: {lte: "", gte: ""},
        maxElevation: {lte: "", gte: ""},
        duration: {lte: "", gte: ""},
        Satellitename: '',
        status: '',
        goal: '',
        PassPlanner: '',
        PassOperator: '',
        whatWasExecute: '',
        manualErrors: '',
        systemErrors: '',
    }

    $:{
        query = Object.keys(form).reduce((qur, key, i) => {
            if(key == 'startTime')
            {
                qur = '';
                if(form['startTime'].lte)
                    qur += `&startTime[lte]=${form['startTime'].lte}`
                if(form['startTime'].gte)
                    qur += `&startTime[gte]=${form['startTime'].gte}`;
            }
            if(form[key].lte != undefined)
            {
                if(form[key].lte)
                    qur += `&${key}[lte]=${form[key].lte}`
                if(form[key].gte)
                    qur += `&${key}[gte]=${form[key].gte}`;
                return qur;
            }
            else if(form[key]){
                return `${qur} &${key}=${form[key]}`;
            }
            return qur;
            
        })
    }

    const toggleModal = (modalID) => () => {
        document.getElementById(modalID).classList.toggle("hidden");
        document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
        document.getElementById(modalID).classList.toggle("flex");
        document.getElementById(modalID + "-backdrop").classList.toggle("flex");
    }

    function onSubmit(e) {
        e.preventDefault();
        toggleModal(`modal-id`);
        reloadPass();
    }
</script>

<button 
    class="bg-black inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
    on:click={toggleModal(`modal-id`)}>
     filter 
</button>

<div class=" hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center" id={`modal-id`}>
    <div class="bg-black relative w-1/2 my-6 mx-auto">
    
        <div class="border-0 rounded-lg shadow-white relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
        <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 class="text-3xl font-semibold">
                    filter
                </h3>

                <button class="p-1 ml-auto border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModal(`modal-id`)}>
                    <span class="opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                    </span>
                </button>
            </div>

        <!--body-->
            <div class="relative p-6 flex-auto h-1/2 overflow-y-auto">
                <div class="form-group">
                    <form on:submit={onSubmit}>
                        startTime <input placeholder="from" bind:value={form.startTime.gte} type = 'datetime-local'/>
                        <input placeholder="to" bind:value={form.startTime.lte} type = 'datetime-local'/> <br> 
                        endTime <input type="datetime-local" placeholder="from" bind:value={form.endTime.gte}/>
                        <input type="datetime-local" placeholder="to" bind:value={form.endTime.lte}/>  <br>
                        maxElevation <input placeholder="from" bind:value={form.maxElevation.gte}/>  
                        <input placeholder="to" bind:value={form.maxElevation.lte}/>  <br>
                        duration <input placeholder="from" bind:value={form.duration.gte}/> 
                        <input placeholder="to" bind:value={form.duration.lte}/>  <br>
                        <input placeholder="Satellitename" bind:value={form.Satellitename}/> <br>
                        <input placeholder="status" bind:value={form.status}/> <br>
                        <input placeholder="goal" bind:value={form.goal}/> <br>
                        <input placeholder="PassPlanner" bind:value={form.PassPlanner}/> <br>
                        <input placeholder="PassOperator" bind:value={form.PassOperator}/> <br>
                        <input placeholder="whatWasExecute" bind:value={form.whatWasExecute}/> <br>
                        <input placeholder="manualErrors" bind:value={form.manualErrors}/> <br>
                        <input placeholder="systemErrors" bind:value={form.systemErrors}/> <br>                   
                        <input class = "text-black" type = "submit" value="filter"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="hidden opacity-25 fixed inset-0 z-40 bg-black" id="modal-id-backdrop"></div>


<style>
	input {
		padding: 6px 10px;
		margin: 8px 0;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 4px;
        color: black;
	}

	input:focus {
		background-color: lightblue;
	}


</style>