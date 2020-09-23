<script>
   export let i;
   export let time;
   export let date;
   export let elv;
</script>


<style>
     
	h3{
		text-align: center;
		margin: 0 auto;
        font-size: 2em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
        display: inline;
	}

	
	a {
		height: 100px;
		width: 100%;
		color: gba(0,0r,255,0.3);
		font-size: 1.25rem;
		background-position: 100%;
		background-size: 400%;
		transition: background 300ms ease-in-out;
	}

	a:hover {
		background-position: 0;
		color: blue;
	}

</style>

<!-- svelte-ignore a11y-missing-attribute -->
<a href="about">
	
	<h3>pass {i + 1}: </h3>
    <h3>time: {time}, date: {date}, elevathion: {elv} <br> </h3>
    <br>
	
</a>


