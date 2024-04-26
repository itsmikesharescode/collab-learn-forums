<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAuthState } from '$lib';
	import { onMount } from 'svelte';

	const authState = getAuthState();

	authState.subscribe((changes) => console.log(changes.guilds.paginatedGuilds));

	let contentHidden = true;

	onMount(async () => {
		const tempStorage = $authState.guilds.paginatedGuilds?.map((guild) => guild.storage_id);

		if (tempStorage?.includes($page.url.search.slice(1))) return (contentHidden = false);

		return await goto('/guilds?invalid-action');
	});
</script>

{#if contentHidden}
	Checking
{:else}
	<p>Hello</p>
{/if}
