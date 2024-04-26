<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';

	export let count: number | null;

	let currentPage = 0;

	//i hate svelte now
	$: detectColor = (index: number) => {
		if ($page.url.search) {
			return Number($page.url.search.slice(2).split('-')[2]) === index ? 'bg-green-500' : '';
		} else return currentPage === index ? 'bg-green-500' : '';
	};
</script>

<div class="mt-[50px] flex gap-[10px] overflow-auto">
	{#if count}
		{#each Array(Math.ceil(count / 6)) as guilds, index}
			<Button
				class={detectColor(index)}
				type="submit"
				on:click={() => {
					currentPage = index;

					goto(
						`/guilds?=${currentPage * 5}-${(currentPage + 1 === 0 ? 1 : currentPage + 1) * 5}-${currentPage}`
					);
				}}
			>
				{index + 1}
			</Button>
		{/each}
	{/if}
</div>
