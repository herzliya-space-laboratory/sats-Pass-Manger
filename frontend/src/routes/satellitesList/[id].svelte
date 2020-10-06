<script context="module">
	let id;
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`satellitesList/${id}.json`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { satellite: data };
		}
		else
		{
			this.error(res.status, data.message);
		}
	}
</script> 

<script>
	import axios from 'axios'
	export let satellite;
	function reloadPass() {
		const now = new Date();
		const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
		axios.get(`http://localhost:5000/api/v1/satellite/passes/${satellite._id}?endTime=${nextWeek}`)
	}
</script>

<style>
	h2{
		font-size: 2em;
	}
</style>

<svelte:head>
	<title> {satellite.name} </title>
</svelte:head>

<div class='content'>
	<h2>satellite name: {satellite.name}</h2>
	<h2>noard id: {satellite.satId}</h2>

	<button on:click = {reloadPass}> reload pass </button>
	{#each satellite.pass as pass}
		<h3>start time: {pass.startTime}</h3>
	{/each}
	
</div>
