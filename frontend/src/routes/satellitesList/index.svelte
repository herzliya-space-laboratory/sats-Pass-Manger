
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
    let satname = '';
    let satid = '';
    let f = '';
    export let data;
    function onPress(satid, satname){
        if(satid == f || satname == f){
            alert(`u need to put something in there`);
        }
        

    }
</script>


<svelte:head>
	<title> satellites list </title>
</svelte:head>


<input bind:value={satname} placeholder="sat name">
<input bind:value={satid} placeholder="sat id">
<button on:click= {onPress}>add sat </button>

<div class = 'box'>
	{#each data as satellite}
		<Satellite {...satellite}/>
		
	{/each}
</div>

<style>
    button{
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

button:hover {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}



    
    input{
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid red;
        border-radius: 4px;
        width: 40%;
    }
	

	.box{
        border: 2px solid #333;
        padding: 0px;
        margin: 10px 5px 5px 0px;
        height: 800px;
        overflow: auto;
    }
</style>