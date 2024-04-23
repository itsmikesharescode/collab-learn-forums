<script lang="ts">
	import ModuleCard from '$lib/route-components/auth-component/learning-module/module-card.svelte';
	import SearchModule from '$lib/route-components/auth-component/learning-module/search-module.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col gap-[20px] p-[22px]" in:fade>
	<SearchModule />

	<div class="grid grid-cols-1 gap-[10px] lg:grid-cols-2">
		{#each Array(20) as sample}
			<ModuleCard />
		{/each}
	</div>
</div>
