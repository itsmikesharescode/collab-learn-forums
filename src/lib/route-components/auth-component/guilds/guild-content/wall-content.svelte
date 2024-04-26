<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { getAuthState, getGuildContentStore, getUserState, supabase } from '$lib';
	import type { ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import DeletePost from './wall-content-operation/deletePost.svelte';

	const authState = getAuthState();

	const { guildObj } = $authState.guilds;
	const userState = getUserState();

	const guildContentStore = getGuildContentStore();

	let newPostDialog = false;

	//get wall post
	const getWallPost = async () => {
		if ($supabase) {
			const { data, error } = await $supabase
				?.from('guild_wall_tb_post_new')
				.select('*')
				.order('created_at', { ascending: false })
				.eq('guild_id', guildObj?.id);

			if (error) console.log(error.message);

			$guildContentStore.wallPost = data;
		}
	};

	onMount(async () => await getWallPost());

	let wallPostLoader = false;
	let formErrors: { wallPost: string[] } | null = null;
	const wallPostActionNews: SubmitFunction = () => {
		wallPostLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: { wallPost: string[] } }>;

			switch (status) {
				case 200:
					getWallPost();
					toast.success('Wall Post', { description: msg });
					wallPostLoader = false;
					newPostDialog = false;
					break;

				case 400:
					formErrors = errors;
					wallPostLoader = false;
					break;

				case 401:
					toast.error('Wall Post', { description: msg });
					wallPostLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<div class="flex justify-end">
	<Button on:click={() => (newPostDialog = true)}>New Post</Button>
</div>

<AlertDialog.Root bind:open={newPostDialog}>
	<AlertDialog.Content>
		<form
			method="post"
			action="/APIS?/wallPostAction"
			use:enhance={wallPostActionNews}
			class="flex flex-col gap-[20px]"
		>
			<input
				disabled={wallPostLoader}
				name="guildObj"
				type="hidden"
				value={JSON.stringify(guildObj)}
			/>
			<input
				disabled={wallPostLoader}
				name="userObj"
				type="hidden"
				value={JSON.stringify($userState)}
			/>
			<AlertDialog.Header>
				<AlertDialog.Title>New Post</AlertDialog.Title>
				<AlertDialog.Description>
					This will create a new post in wall tab, that other members can see.
				</AlertDialog.Description>

				<Textarea disabled={wallPostLoader} name="wallPost" placeholder="Type your message here." />
				{#each formErrors?.wallPost ?? [] as errorMsg}
					<p class="text-sm text-red-500">{errorMsg}</p>
				{/each}
			</AlertDialog.Header>

			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={wallPostLoader}>Cancel</AlertDialog.Cancel>
				<Button disabled={wallPostLoader} type="submit">
					{#if wallPostLoader}
						Posting...
					{:else}
						Create Post
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

<div class="mt-[20px] grid grid-cols-1 gap-[10px]">
	{#if $guildContentStore.wallPost?.length}
		{#each $guildContentStore.wallPost ?? [] as wallPostObj, index (wallPostObj.id)}
			<div class="" animate:flip={{ duration: 350 }} transition:fly={{ x: 200, duration: 600 }}>
				<Card.Root>
					<Card.Header>
						<div class="flex items-center gap-[10px]">
							<Avatar.Root>
								<Avatar.Image src={wallPostObj.user_photo_link} alt="@shadcn" />
								<Avatar.Fallback>{wallPostObj.user_fullname[0]}</Avatar.Fallback>
							</Avatar.Root>
							<div class="">
								<Card.Title>{wallPostObj.user_fullname}</Card.Title>
								<Card.Description>{wallPostObj.created_at}</Card.Description>
							</div>
						</div>
					</Card.Header>
					<Card.Content class="break-words">
						<p>
							{wallPostObj.wall_post}
						</p>
					</Card.Content>

					<Card.Footer class="flex items-center justify-end gap-[10px]">
						<Button variant="secondary">Edit Post</Button>
						<DeletePost {getWallPost} {wallPostObj} />
					</Card.Footer>
				</Card.Root>
			</div>
		{/each}
	{:else}
		<p class="text-[14px]">There is no wall post.</p>
	{/if}
</div>
