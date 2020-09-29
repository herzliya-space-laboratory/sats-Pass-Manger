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
	let startTime = Date.now();
	let endTime = startTime + 604800;
	let idsatpass = axios.get(`http://localhost:5000/api/v1/satellite/passes/${id}?${startTime}&${endTime}`);
	export let satellite;
</script>

<style>
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title> {satellite.name} </title>
</svelte:head>

<div class='content'>
  


</div>
