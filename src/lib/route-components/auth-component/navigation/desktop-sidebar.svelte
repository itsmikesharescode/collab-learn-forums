<script lang="ts">
	import { getAuthState } from '$lib';

	const authState = getAuthState();

	const navigation = [
		{
			url: '/dashboard',
			title: 'DASHBOARD'
		},

		{
			url: '/guilds',
			title: 'GUILDS'
		},

		{
			url: '/projects',
			title: 'PROJECTS'
		},

		{
			url: '/learning-modules',
			title: 'LEARNING MODULES'
		}
	];
</script>

<div class=" flex flex-col gap-[20px]">
	{#each navigation as route}
		<a
			on:click={() => ($authState.activeURL = route.url)}
			href={route.url}
			class="{$authState.activeURL === route.url ? 'text-muted-foreground underline' : ''}
        scroll-m-20 text-xl font-semibold tracking-tight">{route.title}</a
		>
	{/each}
</div>
