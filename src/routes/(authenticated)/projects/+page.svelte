<script lang="ts">
	import ProjectCard from '$lib/route-components/auth-component/projects/project-card.svelte';
	import SearchProject from '$lib/route-components/auth-component/projects/search-project.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col gap-[20px] p-[22px]" in:fade>
	<SearchProject />

	<div class="grid grid-cols-1 gap-[10px] lg:grid-cols-2">
		{#each Array(20) as sample}
			<ProjectCard />
		{/each}
	</div>
</div>
