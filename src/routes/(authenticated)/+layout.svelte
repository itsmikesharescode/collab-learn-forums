<script lang="ts">
	import { getAuthState, getUserState, setAuthState, setUserState } from '$lib';
	import DesktopSidebar from '$lib/route-components/auth-component/navigation/desktop-sidebar.svelte';
	import NavRouter from '$lib/route-components/auth-component/navigation/nav-router.svelte';
	import { onMount } from 'svelte';
	import type { LayoutServerData } from './$types';
	import { navigating } from '$app/stores';
	import { SyncLoader } from 'svelte-loading-spinners';

	export let data: LayoutServerData;

	setAuthState({
		activeURL: '/dashboard',
		guilds: {
			viewingContent: false,
			guildObj: null
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

{#if $navigating}
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-[#00000050]"
	>
		<div class="flex flex-col items-center justify-center rounded-[20px] bg-white p-[20px]">
			<SyncLoader color="#000" />
			<p class="font-bold text-black">Please wait ...</p>
		</div>
	</div>
{/if}

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
