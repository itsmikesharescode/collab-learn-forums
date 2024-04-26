<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { GuildWallReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let wallPostObj: GuildWallReference;
	export let getWallPost: Function;

	let deleteDialog = false;
	let deleteWallPostLoader = false;
	const deleteWallPostActionNews: SubmitFunction = () => {
		deleteWallPostLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					getWallPost();
					toast.success('Wall Post', { description: msg });
					deleteWallPostLoader = false;
					deleteDialog = false;
					break;

				case 401:
					toast.error('Wall Post', { description: msg });
					deleteWallPostLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button variant="destructive" on:click={() => (deleteDialog = true)}>Delete Post</Button>

<AlertDialog.Root bind:open={deleteDialog}>
	<AlertDialog.Content>
		<form
			method="post"
			action="/APIS?/deleteWallPostAction"
			use:enhance={deleteWallPostActionNews}
			class="flex flex-col gap-[20px]"
		>
			<input
				disabled={deleteWallPostLoader}
				name="wallPostId"
				type="hidden"
				value={wallPostObj.id}
			/>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete the wall post.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={deleteWallPostLoader}>Cancel</AlertDialog.Cancel>
				<Button disabled={deleteWallPostLoader} type="submit">
					{#if deleteWallPostLoader}
						Deleting...
					{:else}
						Delete
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
