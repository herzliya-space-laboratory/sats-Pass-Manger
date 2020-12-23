<script context="module">
	let id;
	let limit = 50;
	let page = 1;
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`passes.json?limit=${limit}&page=${page}`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { passes: data.passes, pageData: data.page };
		}
		else
		{
			this.error(res.status, data.message);
		}
	}
</script> 

<script>
	import axios from 'axios';
	
	import Pass from '../../components/passes/pass';
	import PassListTitle from '../../components/passes/passListTitle';
	import PageSelect from '../../components/passes/pageSelect';
	import Filter from '../../components/passes/filter';
	export let passes;
	export let pageData;
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
			axios.get(`http://localhost:4000/api/v1/satellites/passes?endTime=${nextWeek}`);
			let res = await axios.get(`http://localhost:4000/api/v1/pass?sort=${sort}&limit=${limit}&page=${page}${query}`);
			const data = res.data.data;
			passes = data;
			pageData = res.data.pagination;
		}
		catch(e)
		{
			console.log(e);
			alert(e);
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


<div class='container m-auto'>
	<Filter bind:query = {query} {reloadPass}/>
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
				<div class="shadow-white border-b border-gray-800 sm:rounded-lg">
					<table class="overflow-x-auto divide-y divide-gray-200">
						<PassListTitle {reloadPass} bind:sort = {sort}/>
						<div class="h-3/4 overflow-auto">
							<tbody class="w-full bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
								{#each passes as pass}
									<Pass pass={pass} />
								{/each}
							</tbody>
						</div>
					</table>
					<PageSelect bind:page = {pageData} {changePage}/>
				</div>
			</div>
		</div>
	</div>
</div>

