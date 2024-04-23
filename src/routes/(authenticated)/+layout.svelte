<script lang="ts">
	import { setAuthState } from '$lib';
	import DesktopSidebar from '$lib/route-components/auth-component/navigation/desktop-sidebar.svelte';
	import NavRouter from '$lib/route-components/auth-component/navigation/nav-router.svelte';

	setAuthState({
		activeURL: '/dashboard'
	});

	let nativeWidth = 0;
</script>

<svelte:window bind:innerWidth={nativeWidth} />

<NavRouter />
<div class="grid grid-cols-1 sm:grid-cols-[250px,1fr] lg:grid-cols-[350px,1fr]">
	{#if nativeWidth >= 640}
		<div class="relative mt-[100px] flex justify-center">
			<DesktopSidebar />
		</div>
	{/if}

	{#if nativeWidth >= 640}
		<div class="max-h-[90dvh] overflow-auto">
			<slot />
		</div>
	{:else}
		<div class="">
			<slot />
		</div>
	{/if}
</div>
