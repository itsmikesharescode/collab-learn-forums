<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { getAuthState, getUserState, supabase } from '$lib';
	import type { GuildWallReference } from '$lib/types';

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
</script>

<div class="flex justify-end">
	<Button on:click={() => (newPostDialog = true)}>New Post</Button>
</div>

<AlertDialog.Root bind:open={newPostDialog}>
	<AlertDialog.Content>
		<form class="flex flex-col gap-[20px]">
			<input name="guildObj" type="hidden" value={JSON.stringify(guildObj)} />
			<input name="userObj" type="hidden" value={JSON.stringify($userState)} />
			<AlertDialog.Header>
				<AlertDialog.Title>New Post</AlertDialog.Title>
				<AlertDialog.Description>
					This will create a new post in wall tab, that other members can see.
				</AlertDialog.Description>

				<Textarea name="wallPost" placeholder="Type your message here." />
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Create Post</Button>
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
