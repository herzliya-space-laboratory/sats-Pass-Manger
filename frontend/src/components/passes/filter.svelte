<script>
    import SystemItRelateTo from "./systemItRelateTo";

    import { onMount, afterUpdate } from 'svelte';
    import { createForm } from "svelte-forms-lib";

    export let query = "";
    export let reloadPass;
    export let subTag = '';
    const titleWidthClass = ' w-1/6';


	const {
      form,
      errors,
      state,
      handleChange,
      handleSubmit,
      handleReset
    } = createForm({
      initialValues: {
        startTime: {lte: "", gte: ""},
        maxElevation: {lte: "", gte: ""},
        duration: {lte: "", gte: ""},
        stations: ['', '', '', ''],
        systemsItRelateTo: [],
        status: '',
        goal: '',
        whatWasExecute: ''
      },
      onSubmit: values => {
            query = Object.keys(values).reduce((qur, key, i) => {
                if(values[key].lte)
                {
                    qur += `&${key+subTag}[lte]=${values[key].lte}`
                }
                if(values[key].gte){
                    qur += `&${key+subTag}[gte]=${values[key].gte}`;
                }
                else if(values[key] && typeof values[key] != 'object' && !Array.isArray(values[key])){
                    qur += `&${key+subTag}=${values[key]}`;
                }
                else if(key == 'stations')
                {
                    qur += values[key].reduce((qur, value, i) => {
                        if(value != '')
                            return qur + `&${key+subTag}.${i}=${value}`;
                        return qur;
                    }, '');
                }
                else if(Array.isArray(values[key]))
                {
                    if(values[key].length == 1)
                        qur += `&${key+subTag}=${values[key]}`
                    else
                        qur += values[key].reduce((qur, value) => qur += `&${key+subTag}[all]=${value}`, '');

                }
                return qur;
                
            }, '');
            
            console.log( query);

            reloadPass();
        }
    });

</script>

<tfoot class="bg-black  text-white w-full flex flex-col justify-between">
    <tr class="flex w-full">
        
        <td class={"mr-10 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            Start time [local]
                    </div>
                    <div class="text-xl text-center leading-5 text-white-500 w-3/4 m-auto">
                        <input placeholder="from" bind:value={$form.startTime.gte} type = 'datetime-local'/>
                        <input placeholder="to" bind:value={$form.startTime.lte} type = 'datetime-local'/>
                    </div>
                </div>
            </div>
        </td>


        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            Duration [min]
                    </div>
                    <div class="text-xl text-center leading-5 text-white-500">
                        <input placeholder="from" bind:value={$form.duration.gte} type = 'number'/>
                        <input placeholder="to" bind:value={$form.duration.lte} type = 'number'/>
                    </div>
                </div>
            </div>
        </td>
        
        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            System it relate to
                    </div>

                    <div class="text-xl text-center leading-5 text-white-500">
                        <SystemItRelateTo class="m-6" inputMode = {true} bind:systemItRelateTo = {$form.systemsItRelateTo}/>
                    </div>
                </div>
            </div>
        </td>
        
        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            Status
                    </div>

                    <div class="text-xl text-center leading-5 text-white-500">
                        <input placeholder="from" bind:value={$form.status} type = 'text'/>
                    </div>
                </div>
            </div>
        </td>
        

        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between  m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            Max elevation
                    </div>
                    <div class="text-xl text-center leading-5 text-white-500">
                        <input placeholder="from" bind:value={$form.maxElevation.gte} type = 'number'/>
                        <input placeholder="to" bind:value={$form.maxElevation.lte} type = 'number'/>
                    </div>
                </div>
            </div>
        </td>
        
        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <button 
                class="bg-black inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                on:click={handleSubmit}
                >
                Filter 
            </button>
        </td>
    </tr>

    <tr class="flex w-full">

        <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            Goal
                    </div>

                    <div class="text-xl text-center leading-5 text-white-500">
                        <input placeholder="from" bind:value={$form.goal} type = 'text'/>
                    </div>
                </div>
            </div>
        </td>
        

        {#each ['HSL', 'TAU', 'SHAAR', 'yeruham'] as station, i}
            <td class={"px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
                <div class="flex items-center m-auto">
                    <div class="justify-between m-auto">
                        <div class="text-xl text-center leading-5 text-white-500">
                            {station}
                        </div>
                        <div class="text-xl text-center leading-5 text-white-500">
                            <select class="w-full text-black" name = "stations" bind:value={$form.stations[i]}>
                                <option selected={$form.stations[i] == ''} value=''> All </option>
                                <option selected={$form.stations[i] == 'RX only'} value='RX only'> RX only </option>
                                <option selected={$form.stations[i] == 'TX Only'} value='TX Only'> TX Only </option>
                                <option selected={$form.stations[i] == 'RX & TX'} value='RX & TX'> RX & TX </option>
                                <option selected={$form.stations[i] == 'Off line'} value='Off line'> Off line </option>
                            </select>
                        </div>
                    </div>
                </div>
            </td>
        {/each}

        <td class={"mr-10 px-6 pt-4  text-center text-xl leading-4 font-medium text-white  tracking-wider" + titleWidthClass}>
            <div class="flex items-center">
                <div class="justify-between m-auto">
                    <div class="text-xl text-center leading-5 text-white-500">
                            What was Execute
                    </div>

                    <div class="text-xl text-center leading-5 text-white-500">
                        <input placeholder="from" bind:value={$form.whatWasExecute} type = 'text'/>
                    </div>
                </div>
            </div>
        </td>

    </tr>
</tfoot>

<style>
	input {
        margin-top: 3px;
        width: 90%;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 4px;
        color: black;
	}

	input:focus {
		background-color: lightblue;
	}


</style>