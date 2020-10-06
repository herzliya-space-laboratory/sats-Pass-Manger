<script>
    import { createEventDispatcher } from 'svelte';

    export let _id;
    export let name;
    export let satId;

    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<div class = "Satellite">        
        <a href= 'satellitesList/{_id}'>
            <p class = 'left'>{name}</p>
            <p class = 'right'>{satId}</p>
        </a>
</div>


<style>
    .Satellite{
        display:  block;
        border-bottom: 2px dotted rgb(17, 16, 105);
        padding: 5px;
        margin: 0;
    }

    a{   
        display: inline-block;
        text-decoration: none;
		font-size: 2em;
        margin: 10px 0;
        width: 100%;
	}

	a:hover 
	{
		color: blue;
	}

    p{
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    .right {
        padding-right: 15%;
        float: right; 
    }

    .left {
        padding-left: 15%;
        float: left; 
    }

</style>