<script lang="ts">
	import GuildCard from '$lib/route-components/auth-component/guilds/guild-card.svelte';
	import SearchGuild from '$lib/route-components/auth-component/guilds/search-guild.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col gap-[20px] p-[22px]" in:fade>
	<SearchGuild />

	<div class="grid grid-cols-1 gap-[10px] lg:grid-cols-2">
		{#each Array(20) as sample}
			<GuildCard />
		{/each}
	</div>
</div>
