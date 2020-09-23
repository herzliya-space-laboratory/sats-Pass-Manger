
<script context="module">
	import Satellite from './Satellite.svelte'

	import axios from "axios";
	
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:5000/api/v1/satellite/");
        const data = res.data.data;
        return { data };
	}
	
</script>

<script>
	export let data;
</script>


<svelte:head>
	<title> satellites list </title>
</svelte:head>


<div class = 'box'>
	{#each data as satellite}
		<Satellite {...satellite}/>
		<!-- 
			<a href=".">
				<h1> {satId}: {name} </h1>
			</a> 
		-->
	{/each}
</div>

<style>
	

	.box{
        border: 2px solid #333;
        padding: 0px;
        margin: 10px 5px 5px 0px;
        height: 800px;
        overflow: auto;
    }
</style>