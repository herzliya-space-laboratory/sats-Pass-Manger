<script context="module">
	let id;
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`passes/${id}.json`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { passes: data };
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
	export let passes;
</script>


<svelte:head>
	<title> passes list </title>
</svelte:head>

<div class='content'>
	
	<PassListTitle />
	<div class = 'box'>
		{#each passes as pass}
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

	

</style>