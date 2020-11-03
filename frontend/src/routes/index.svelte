
<script context="module">
    import axios from "axios";
    
    export async function preload(page, session) {
		const now = new Date();
		const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
		await axios.get(`http://localhost:4000/api/v1/satellites/passes/?endTime=${nextWeek}`);
        let res = await axios.get(`http://localhost:4000/api/v1/pass/?sort=startTime&limit=10&startTime[gte]=${new Date()}&page=${1}`);
        const data = res.data.data;
        return { passes: data };
	}
</script>

<script>
	import Pass from '../components/passes/pass';
	import PassListTitle from '../components/passes/passListTitle';
	export let passes;


	let limit = 10;

	const now = new Date();
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
	let endTime = nextWeek;

	async function limitChange() {
		let res = await axios.get(`http://localhost:4000/api/v1/pass/?sort=startTime&limit=${limit}&startTime[gte]=${new Date()}&page=${1}`);
        const data = res.data.data;
        passes = data
	}

	async function endTimeChange() {
		await axios.get(`http://localhost:4000/api/v1/satellites/passes/?endTime=${endTime}`);
		let res = await axios.get(`http://localhost:4000/api/v1/pass?sort=startTime&startTime[lte]=${endTime}&startTime[gte]=${new Date()}&page=${1}`);
        const data = res.data.data;
        passes = data
	}


</script>


<svelte:head>
	<title> passes list </title>
</svelte:head>


<div class='container'>
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 ">
						<PassListTitle bind:passes={passes} bind:endTime={endTime} bind:limit={limit}/>
						<div class="h-3/4 overflow-y-auto">
							<tbody class="w-full bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
								{#each passes as pass}
									<Pass pass={pass} />
								{/each}
							</tbody>
						</div>
					</table>
				</div>
			</div>
		</div>
	</div>

	<div class="m-6">
		how many pass to display:
		<input class="text-black" placeholder="how many pass" bind:value={limit} on:change={limitChange}/>

		or pass up to when
		<input 
			class="text-black"
			type = 'datetime-local' 
			bind:value={endTime} 
			on:change={endTimeChange}/>

	</div>
	
</div>

