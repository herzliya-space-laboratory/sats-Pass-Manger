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

	export let satellite;
	let sort;
	
	async function reloadPass() {
		fetch(`satellitesList/${satellite._id}.json?sort=${sort}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
		})
		.then(res => {
			res.json().then(data => {
				satellite = data;	
			})
		}).catch(e => {
			alert(e)
		});
	}
	

    
    const reloadPassEvery = 86400;
    setInterval(reloadPass, reloadPassEvery);

	$:{
		sort = sort;
		reloadPass();
	}
</script>


<svelte:head>
	<title> {satellite.name} </title>
</svelte:head>

<div class='m-auto'>
	<h2 class="inline-block text-3xl mx-12 p-0 mt-6"> satellite name: {satellite.name} </h2>
	<h2 class="inline-block text-3xl mx-12 p-0 mt-6"> noard id: {satellite.satId} </h2>


	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 ">
						<PassListTitle {reloadPass} bind:sort={sort}/>
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
