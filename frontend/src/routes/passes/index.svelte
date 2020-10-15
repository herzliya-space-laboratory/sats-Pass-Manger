<script context="module">
	let id;
	export async function preload({ params, query }) {
		id = params.id;

		const res = await this.fetch(`passes.json`);
		const data = await res.json();

		if (res.status === 200) 
		{
			return { passes: data };
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
	export let passes;

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
						<PassListTitle />
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
</div>

