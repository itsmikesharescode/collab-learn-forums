<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutServerData } from '../../$types';
	import { getAuthState, supabase } from '$lib';
	import { goto } from '$app/navigation';
	import GuildContent from '$lib/route-components/auth-component/guilds/guild-content.svelte';

	const authState = getAuthState();

	export let data: LayoutServerData;

	let hiddenContent = true;

	const { guildObj } = $authState.guilds;
	const tempStore = data.createdGuilds.data?.map((guild) => guild.storage_id);

	const getWallPost = async () => {
		if ($supabase) {
			const { data, error } = await $supabase
				?.from('guild_wall_tb_post_new')
				.select('*')
				.order('created_at', { ascending: true })
				.eq('guild_id', guildObj?.id);
		}
	};

	onMount(async () => {
		if (tempStore) {
			const includes = tempStore.includes($authState.guilds.guildObj?.storage_id ?? '');

			if (includes) return (hiddenContent = false);
			return await goto('/dashboard?=that-route-is-secure');
		}
	});
</script>

{#if hiddenContent}
	<p>Checking Key</p>
{:else}
	<GuildContent />
{/if}
