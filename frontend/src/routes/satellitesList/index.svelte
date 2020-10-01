
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
        border: 1px solid #333;
        padding: 0px;
        margin: 0;
        height: 600px;
        overflow: auto;
    }
</style>