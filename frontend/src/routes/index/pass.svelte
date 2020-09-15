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
		background-color: #aaa;
		border-color: #f1c40f;
		color: #f1c40f;
		font-size: 1.25rem;
		background-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
		background-position: 100%;
		background-size: 400%;
		transition: background 300ms ease-in-out;
	}
	a:hover {
		background-position: 0;
		color: #aaa;
	}

	table {
 	text-align: left;
 	width: 100%;
 	border: 20px;
 	padding: 0;
 	margin: 0;
 	border-spacing: 0;
 	font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
 }
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<a href="about">
	
	<h3>pass {i + 1}: </h3>
    <h3>{time}, {date}, {elv} </h3>
    <br>
	
</a>


