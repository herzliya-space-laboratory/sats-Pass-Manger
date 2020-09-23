<script>
    import { createEventDispatcher } from 'svelte';

    export let _id;
    export let name;
    export let satId;

    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<!-- todo: orgnaze the line, use all the line space not just the start-->
<div class = "Satellite">        
        <a href= 'satellitesList/{_id}'>
            {satId}| {name}
        </a>
</div>


<style>
    .Satellite{
        display:  block;
        border-bottom: 2px dotted rgb(17, 16, 105);
        padding: 5px;
        margin: 0;
    }

    .Satellite a{
        display: inline-block;
        text-decoration: none;
    }

    a{   
		font-size: 2em;
        margin: 0;
	}

	a:hover 
	{
		color: blue;
	}
</style>