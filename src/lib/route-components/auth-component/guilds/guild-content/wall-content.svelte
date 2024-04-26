<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { getAuthState, getUserState, supabase } from '$lib';
	import type { GuildWallReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	const authState = getAuthState();

	const { guildObj } = $authState.guilds;
	const userState = getUserState();

	let newPostDialog = false;

	let wallPosts: GuildWallReference[] | null = [];

	//get wall post
	const getWallPost = async () => {
		if ($supabase) {
			const { data, error } = await $supabase
				?.from('guild_wall_tb_post_new')
				.select('*')
				.order('created_at', { ascending: true })
				.eq('guild_id', guildObj?.id);

			if (error) console.log(error.message);

			wallPosts = data;
		}
	};

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
					wallPostLoader = false;
					toast.success('Wall Post', { description: msg });
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

{#if wallPosts?.length}
	{#each wallPosts ?? [] as wallPostObj}
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
			<Card.Content>
				<p>
					{wallPostObj.wall_post}
				</p>
			</Card.Content>

			<Card.Footer class="flex items-center justify-end gap-[10px]">
				<Button variant="secondary">Edit Post</Button>
				<Button variant="destructive">Delete Post</Button>
			</Card.Footer>
		</Card.Root>
	{/each}
{:else}
	<p class="text-[14px]">There is no wall post.</p>
{/if}
