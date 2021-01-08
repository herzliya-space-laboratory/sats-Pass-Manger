<script>
	import Nav from '../components/Nav.svelte';
	import { stores } from '@sapper/app';
	import { derived } from 'svelte/store';

	export let segment;

	const { preloading } = stores();
	const delayedPreloading = derived(preloading, (currentPreloading, set) => {
	setTimeout(() => set(currentPreloading), 250);
	});
</script>

<style>
	main {
		position: relative;
		max-width: 100%;
		padding: 10px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1s linear infinite;
	animation: spinner 1s linear infinite;
	}

	@-webkit-keyframes spinner {
	0% { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
	}

	@keyframes spinner {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
	}
</style>

{#if $preloading && $delayedPreloading}
	Loading
	<div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-6 w-6"></div>
{/if}

<Nav {segment}/>

<main>
	<slot></slot>
</main>