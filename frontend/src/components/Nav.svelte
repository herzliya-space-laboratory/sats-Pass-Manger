<script>
    import { goto, stores } from "@sapper/app";
	const { session } = stores();
	
	export let segment;

	let pages = [
		{
			title: "next passes",
			path: ".",
			seg: undefined
		},
		{
			title: "about",
			path: "about",
			seg: "about"
		},
		{
			title: "satellites list",
			path: "satellitesList",
			seg: "satellitesList"
		},
		{
			title: "passes list",
			path: 'passes',
			seg: 'passes'
		}
		
		
	];

</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: blue;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		{#each pages as page}
			<li>
				<a aria-current = "{segment === page.seg ? 'page' : undefined}" href={page.path}>
					{page.title}
				</a>
			</li>
		{/each}

		{#if !$session.token}
			<li class='float-right mr-8'>
				<a aria-current = "{segment === 'login' ? 'page' : undefined}" href='/login'>
					login
				</a>
			</li>
		{:else}
			<li class='mr-8'>
				<a aria-current = "{segment === 'users' ? 'page' : undefined}" href='/users'>
					users
				</a>
			</li>
			<li class='float-right mr-8'>
				<a aria-current = "{segment === 'logout' ? 'page' : undefined}" href='/logout'>
					logout
				</a>
			</li>
		{/if}

	</ul>
</nav> 
