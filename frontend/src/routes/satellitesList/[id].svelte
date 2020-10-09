<script context="module">
	let id;
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`satellitesList/${id}.json`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { satellite: data };
		}
		else
		{
			this.error(res.status, data.message);
		}
	}
</script> 

<script>
	import Pass from '../../components/satellitesList/pass';
	import PassListTitle from '../../components/satellitesList/passListTitle';

	import axios from 'axios'
	export let satellite;
	function reloadPass() {
		const now = new Date();
		const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
		axios.get(`http://localhost:5000/api/v1/satellite/passes/${satellite._id}?endTime=${nextWeek}`)
	}
</script>


<svelte:head>
	<title> {satellite.name} </title>
</svelte:head>

<div class='container content-start'>
	<h2 class="inline-block text-3xl mx-12 p-0 my-6"> satellite name: {satellite.name} </h2>
	<h2 class="inline-block text-3xl mx-12 p-0 my-6"> noard id: {satellite.satId} </h2>

	<button on:click = {reloadPass}
	 class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mx-12 my-12 rounded-full">
		reload pass 
	</button>


	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 ">
						<PassListTitle />
						<div class="h-3/4 overflow-y-auto">
							<tbody class="bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
								{#each satellite.pass as pass}
									<Pass pass={pass} />
								{/each}
							</tbody>
						</div>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
