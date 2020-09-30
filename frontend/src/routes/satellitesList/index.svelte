
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
	import AddSatellite from '../../components/satellitesList/addSatllite.svelte';

    export let data;
</script>


<svelte:head>
	<title> satellites list </title>
</svelte:head>

<div class = 'box'>
    {#each data as satellite}
        <Satellite {...satellite}/>
    {/each}
</div>
<AddSatellite />



<style>
    .box{
        border: 2px solid #333;
        padding: 0px;
        margin: 0px;
        max-height: 620px;
        overflow: auto;
    }
</style>