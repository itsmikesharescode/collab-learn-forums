<script lang="ts">
	import { enhance } from '$app/forms';
	import { getAuthState } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';

	const authState = getAuthState();

	export let count: number | null;

	const guildPaginateActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, paginatedGuilds }
			} = result as ResultModel<{
				msg: string;
				paginatedGuilds: CreatedGuildReference[];
			}>;

			switch (status) {
				case 200:
					$authState.guilds.paginatedGuilds = paginatedGuilds;
					break;

				case 401:
					console.log(msg);
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="/APIS?/guildPaginateAction"
	enctype="multipart/form-data"
	use:enhance={guildPaginateActionNews}
>
	<div class="mt-[50px] flex gap-[10px] overflow-auto">
		<input name="initial" type="hidden" value={$authState.guilds.currentPage * 5} />
		<input
			name="final"
			type="hidden"
			value={($authState.guilds.currentPage + 1 === 0 ? 1 : $authState.guilds.currentPage + 1) * 5}
		/>
		{#if count}
			{#each Array(Math.ceil(count / 6)) as guilds, index}
				<Button
					class={$authState.guilds.currentPage === index ? 'bg-green-500 ' : ''}
					type="submit"
					on:click={() => ($authState.guilds.currentPage = index)}
				>
					{index + 1}
				</Button>
			{/each}
		{/if}
	</div>
</form>
