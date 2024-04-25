<script lang="ts">
	import { getAuthState, getUserState, setAuthState, setUserState } from '$lib';
	import DesktopSidebar from '$lib/route-components/auth-component/navigation/desktop-sidebar.svelte';
	import NavRouter from '$lib/route-components/auth-component/navigation/nav-router.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: setAuthState({
		activeURL: '/dashboard',
		guilds: {
			paginatedGuilds: data.createdGuilds.data,
			currentPage: 0
		}
	});

	setUserState(data.userData.data);
	const userState = getUserState();

	$: if (data.userData.data) {
		$userState = data.userData.data;
	}

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

	<div class="max-h-[90dvh] overflow-auto">
		<slot />
	</div>
</div>
