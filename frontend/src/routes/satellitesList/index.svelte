
<script context="module">
	import axios from "axios";
	
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:5000/api/v1/satellite/");
        const data = res.data.data;
        return { data };
	}
</script>

<script>
<<<<<<< Updated upstream
	import Satellite from '../../components/satellitesList/Satellite.svelte';
	import AddSatellite from '../../components/satellitesList/addSatllite.svelte';

    export let data;
=======
    var name = '';
    var satId = '';
    export let data;
    function onSubmit(){
        axios.post(`http://localhost:5000/api/v1/satellite`, {satId, name});
    }
>>>>>>> Stashed changes
</script>


<svelte:head>
	<title> satellites list </title>
</svelte:head>

<<<<<<< Updated upstream
=======

<form on:click= {onSubmit}>
    <input type="text" bind:value={name} placeholder="sat name">
    <input type="text" bind:value={satId} placeholder="sat id">
    <input type= "submit" value="create">
</form>

>>>>>>> Stashed changes
<div class = 'box'>
    {#each data as satellite}
        <Satellite {...satellite}/>
    {/each}
</div>
<AddSatellite />

<<<<<<< Updated upstream
=======
<style>
    input[type="submit"]{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  width: 16%;
}

input[type="submit"]:hover {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}
>>>>>>> Stashed changes


<style>
    .box{
        border: 2px solid #333;
        padding: 0px;
        margin: 0px;
        max-height: 620px;
        overflow: auto;
    }
</style>