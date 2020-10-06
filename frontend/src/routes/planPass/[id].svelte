<script context="module">
    let id;
    
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`passes/${id}.json`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { pass: data };
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
    export let pass;
    console.log(pass)
</script>


<svelte:head>
	<title> {pass.Satellite.name} </title>
</svelte:head>

<div class='content'>
	<h2>pass goal: {pass.goal}</h2>

	<PassListTitle />
	<div class = 'box'>
		{#each pass as Plan}
            {Plan}
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

</style>