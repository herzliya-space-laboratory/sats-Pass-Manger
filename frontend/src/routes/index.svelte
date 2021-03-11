<script context="module">
    import { setAlert } from '../alert'

	export async function preload(page, session) {
		const now = new Date();
		const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
		const res = await this.fetch(`passes.json?sort=startTime&limit=10&startTime[gte]=${new Date()}`);
		const {passes, message} = await res.json();

		if(res.status != 200)
			setAlert(message, true);
		return { passes };
	}
</script>

<script>
	import Pass from '../components/passes/pass';
	import PassListTitle from '../components/passes/passListTitle';
	export let passes;

	let message;
	let limit = 10;

	const now = new Date();
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
	let endTime = nextWeek;

	async function limitChange() {
		const res = await fetch(`passes.json?sort=startTime&limit=${limit}&startTime[gte]=${new Date()}`);
		({passes, message} = await res.json());
		if(res.status != 200)
			setAlert(message, true);
	}

	async function endTimeChange() {
		const res = await fetch(`passes.json?sort=startTime&startTime[lte]=${endTime}&startTime[gte]=${new Date()}`);
		({passes, message} = await res.json());
		if(res.status != 200)
			setAlert(message, true);
	}


	async function reloadPass() {
		const res = await fetch(`passes.json?sort=startTime&limit=${limit}&startTime[gte]=${new Date()}`);
		({passes, message} = await res.json());
		if(res.status != 200)
			setAlert(message, true);
	}

	const reloadPassEvery = 90*60*1000;
	setInterval(reloadPass, reloadPassEvery);
</script>


<svelte:head>
	<title> passes list </title>
</svelte:head>


<div class='container m-auto w-full max-w-full'>
	<div class="flex flex-col mx-auto">
		<div class="-my-2 overflow-x-auto w-full">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 ">
						<PassListTitle {reloadPass}/>
						<div class="h-3/4 overflow-y-auto">
							<tbody class="w-full bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
								{#each passes as pass, i}
									<div class =  { "w-full " + (i % 2 == 0 ? 'bg-gray-800': 'bg-black')}>
										<Pass pass={pass} />
									</div>
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

