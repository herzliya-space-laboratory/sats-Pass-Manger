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
	import Pass from '../../components/satellitesList/pass';
	import PassListTitle from '../../components/satellitesList/passListTitle';

	import axios from 'axios'
	export let satellite;
	function reloadPass() {
		const now = new Date();
		const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
		axios.get(`http://localhost:5000/api/v1/satellite/passes/${satellite._id}?endTime=${nextWeek}`)
	}
</script>


<svelte:head>
	<title> {satellite.name} </title>
</svelte:head>

<div class='content'>
	<h2>satellite name: {satellite.name}</h2>
	<h2>noard id: {satellite.satId}</h2>

	<button on:click = {reloadPass}> reload pass </button>

	<PassListTitle />
	<div class = 'box'>
		{#each satellite.pass as pass}
			<Pass pass={pass} />
		{/each}
	</div>

	
</div>


<style>
   	.box{
        padding: 0px;
        margin: 0;
        height: 600px;
        border: 1px solid #333;
        overflow: auto;
    }

	h2{
		font-size: 2em;
	}

	button {
		background-color: gray; /* Green */
		border: black 1px;
		color: black;
		padding: 15px 32px;
		margin: 10px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}

	button:hover {
		box-shadow: 0 12px 16px 0 rgba(255, 255, 255, 0.696), 0 17px 50px 0 rgba(255, 255, 255, 0.796);
	}

</style>