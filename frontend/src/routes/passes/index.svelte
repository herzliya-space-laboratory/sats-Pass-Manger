

<script>
	let h = 
	[
		{"time": "12:50", "date": "12:50", "elv": "90"}, 
		{"time": "12:50", "date": "12:50", "elv": "90"}, 
		{"time": "12:50", "date": "12:50", "elv": "90"}
	];

	import Pass from "./pass.svelte";
</script>

<svelte:head>
	<title>sats pass manger</title>
</svelte:head>

<div>
	{#each h as {time, date, elv}, i}
		<Pass time = {time} date = {date} elv = {elv} i = {i}> </Pass>
		
	{/each}
</div>