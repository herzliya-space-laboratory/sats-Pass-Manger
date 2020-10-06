
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

<div class = "titel">
    <a href="javascript:void(0);">       
        <p class = 'left'> satellite name </p>
        <p class = 'right'> satellite norad id </p>
    </a>
</div>

<div class = 'box'>
	{#each data as satellite}
		<Satellite {...satellite}/>
	{/each}
</div>

<AddSatellite />

<style>
   	.box{
        padding: 0px;
        margin: 0;
        height: 600px;
        overflow: auto;
    }

     .titel{
        display:  block;
        border: 1px solid #333;
        border-bottom: 2px dotted rgb(17, 16, 105);
        padding: 5px;
        display: inline-block;
        text-decoration: none;
		font-size: 2em;
        margin: 10px 0;
        width: 100%;
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