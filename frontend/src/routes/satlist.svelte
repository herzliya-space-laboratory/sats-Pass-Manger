
<script context="module">
    import axios from "axios"
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:5001/api/v1/satellite/");
        const data = res.data;
        return { data };
    }
</script>

<script>
export let data;
</script>

{#each data.data as {id, name, satId}, i}
 <a href="about"><h1>{i+1}: {name}</h1></a>
 {/each}
<style>
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
		color: lime;
        }
</style>