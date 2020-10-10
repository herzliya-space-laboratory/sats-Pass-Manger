
<script context="module">
    import axios from "axios";
    
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:5000/api/v1/satellite/");
        const data = res.data.data;
        return { data };
	}
</script>

<script>
    import Satellite from '../../components/satellitesList/Satellite.svelte';
    import AddSatellite from '../../components/satellitesList/addSatellite.svelte';
    import Title from '../../components/satellitesList/title.svelte';
    
    export let data;
</script>


<svelte:head>
	<title> satellites list </title>
</svelte:head>

<div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 ">
                    <Title/>
                    <div class="h-3/4 overflow-y-auto">
                        <tbody class="bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
                            {#each data as satellite}
                                <Satellite {...satellite}/>
                            {/each}
                        </tbody>
                    </div>
                </table>
                <AddSatellite />
            </div>
        </div>
    </div>
</div>
