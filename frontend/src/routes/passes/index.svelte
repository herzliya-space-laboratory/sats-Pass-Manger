<script context="module">
	let id;
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`passes.json?limit=${50}&page=${1}`);
		const data = await res.json();


		if (res.status === 200) 
		{
			const { passes, pageData } = data;
			return { passes, pageData };
		}
		else
		{
			this.error(res.status, data.message);
		}
	}
</script> 

<script>
	import Pass from '../../components/passes/pass';
	import PassListTitle from '../../components/passes/passListTitle';
	import PageSelect from '../../components/passes/pageSelect';
	import Filter from '../../components/passes/filter';
	import { setAlert } from '../../alert';
	
	export let passes;
	export let pageData;


	let limit = 50;
	let page = 1;

	let query = "";
	let sort = "startTime";
	let changePage = (p) => async () => {
		page = p;
		await reloadPass();
	}

	const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

	async function reloadPass() {
		try{
			const res = await fetch(`passes.json?sort=${sort}&limit=${limit}&page=${page}${query}`);
			let message;
			({passes, pageData, message} = await res.json());
			
			if(res.status != 200)
				setAlert(message);
		}
		catch(e)
		{
			setAlert(e);
		}
	}

    
    const reloadPassEvery = 90*60*1000;
	setInterval(reloadPass, reloadPassEvery);
	
	$:{
		sort = sort;
		reloadPass();
	}
</script>


<svelte:head>
	<title> passes list </title>
</svelte:head>


<div class='container m-auto w-full max-w-full'>
	<div class="flex flex-col mx-auto">
		<div class="my-2 overflow-x-auto">
			<div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
				<div class="shadow-white border-b border-gray-800 sm:rounded-lg">
					<table class="overflow-x-auto divide-y divide-gray-200">
						<PassListTitle {reloadPass} bind:sort = {sort}/>
						<div class="h-3/4 overflow-auto">
							<tbody class="w-full bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
								{#each passes as pass, i}
									<div class =  { "w-full " + (i % 2 == 0 ? 'bg-gray-800': 'bg-black')}>
										<Pass pass={pass} />
									</div>
								{/each}
							</tbody>
						</div>
						<Filter bind:query = {query} {reloadPass}/>
					</table>
					<PageSelect bind:page = {pageData} {changePage}/>
				</div>
			</div>
		</div>
	</div>
</div>

