<script lang="ts">
	import GuildCard from '$lib/route-components/auth-component/guilds/guild-card.svelte';
	import SearchGuild from '$lib/route-components/auth-component/guilds/search-guild.svelte';
	import { fade } from 'svelte/transition';
	import type { LayoutServerData } from '../$types';
	import GuildPagination from '$lib/route-components/auth-component/guilds/guild-pagination.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { FilePlus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { getAuthState } from '$lib';
	import GuildContent from '$lib/route-components/auth-component/guilds/guild-content.svelte';

	export let data: LayoutServerData;

	const authState = getAuthState();
</script>

{#if $authState.guilds.viewingContent}
	<GuildContent />
{:else}
	<div class="flex flex-col gap-[20px] p-[22px]" in:fade>
		<SearchGuild />

		<GuildPagination count={data.guildCount.count} />

		<div class="grid grid-cols-1 gap-[10px] lg:grid-cols-2">
			{#each data.createdGuilds.data ?? [] as guildObj, index (guildObj.id)}
				<div class="" animate:flip={{ duration: 350 }}>
					<GuildCard {guildObj} />
				</div>
			{/each}
		</div>

		<div class="fixed bottom-0 right-0 m-[20px]">
			<Button variant="link" class="flex items-center gap-[10px]" href="/guilds/create-guild">
				Create Guild
				<FilePlus />
			</Button>
		</div>
	</div>
{/if}
