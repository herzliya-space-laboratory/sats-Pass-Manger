<script context="module">
	let id;
	let limit = 50;
	let page = 1;
	import axios from "axios";
	export async function preload({ params, query }) {
		id = params.id;

		try {
			const res = await this.fetch(`users/${id}.json?limit.operatedPasses=${limit}&page.operatedPasses=${page}&sort.operatedPasses=startTime`);
			const data = await res.json();
			
			if (res.status === 200) 
			{
				console.log(data);
				return { user: data.user,  pageData: data.page.operatedPasses };
			}
			else
			{
				this.error(res.status, data.message);
			}
			
		} catch (error) {
			this.error(error);
		}
	}


</script> 

<script>
	import Pass from '../../../components/satellitesList/pass';
	import PageSelect from '../../../components/passes/pageSelect';
	import Filter from '../../../components/passes/filter';
	import PassListTitle from '../../../components/satellitesList/passListTitle';
	import { setAlert } from '../../../alert';

	export let pageData;
	export let user;
	let query = "";
	let sort;
	console.log(user, pageData);
	let changePage = (p) => async () => {
		page = p;
		await reloadPass();
	}

	async function reloadPass() {
		if (process.browser) 
			fetch(`users/${user._id}.json?limit.operatedPasses=${limit}&page.operatedPasses=${page}&sort.operatedPasses=${sort}${query}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				}
			})
			.then(res => {
				res.json().then(data => {
					// user = data.user;	
					pageData = data.page.operatedPasses
				})
			}).catch(e => setAlert(e));
	}
	

    
    const reloadPassEvery = 86400;
    setInterval(reloadPass, reloadPassEvery);

	$:{
		sort = sort;
		reloadPass();
	}
</script>


<svelte:head>
	<title> {user.name} </title>
</svelte:head>

<div class='m-auto'>
	<h2 class="inline-block text-3xl mx-12 p-0 mt-6"> satellite name: {user.name} </h2>
	<h2 class="inline-block text-3xl mx-12 p-0 mt-6"> noard id: {user.role} </h2>


	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 ">
						<PassListTitle {reloadPass} bind:sort={sort}/>
						<div class="h-3/4 overflow-y-auto">
							<tbody class="bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
                            	{#each user.operatedPasses as pass, i}
									<div class =  { "w-full " + (i % 2 == 0 ? 'bg-gray-800': 'bg-black')}>
										<Pass pass={pass} />
									</div>
								{/each}
							</tbody>
						</div>
						<Filter bind:query = {query} {reloadPass} subTag='/operatedPasses'/>
					</table>
					<PageSelect bind:page = {pageData} {changePage}/>
				</div>
			</div>
		</div>
	</div>
</div>
