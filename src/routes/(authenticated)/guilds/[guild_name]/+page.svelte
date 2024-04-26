<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAuthState } from '$lib';
	import { onMount } from 'svelte';

	const authState = getAuthState();

	onMount(async () => {
		const tempStore = $authState.guilds.paginatedGuilds?.map((guild) => guild.storage_id);

		if (!tempStore?.includes($page.url.search.slice(1))) return await goto('/guilds?not-valid');
	});
</script>

<div class=""></div>
