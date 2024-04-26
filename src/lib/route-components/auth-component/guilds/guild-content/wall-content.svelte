<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { getAuthState, supabase } from '$lib';

	const authState = getAuthState();

	const { guildObj } = $authState.guilds;

	let newPostDialog = false;

	const getWallPost = async () => {
		if ($supabase) {
			const { data, error } = await $supabase
				.from('guild_wall_tb_post_new')
				.select('*')
				.eq('guild_id', guildObj?.id);
		}
	};
</script>

<div class="flex justify-end">
	<Button on:click={() => (newPostDialog = true)}>New Post</Button>
</div>

<AlertDialog.Root bind:open={newPostDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>New Post</AlertDialog.Title>
			<AlertDialog.Description>
				This will create a new post in wall tab, that other members can see.
			</AlertDialog.Description>

			<Textarea placeholder="Type your message here." />
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

{#each Array(10) as sample}
	<Card.Root>
		<Card.Header>
			<div class="flex items-center gap-[10px]">
				<Avatar.Root>
					<Avatar.Image src="" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="">
					<Card.Title>Eviota, Mike John Baguinaon</Card.Title>
					<Card.Description>Nov 6 1996</Card.Description>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt animi cupiditate ullam
				deserunt? Odit provident praesentium voluptas vel libero voluptate nobis eligendi qui,
				officia ratione sapiente et illo at fugit nulla possimus. Molestiae eaque nam amet officiis
				labore fugiat laboriosam deserunt, tempora delectus nemo aut aliquam neque ipsum iure, eos
				blanditiis a. Doloribus rerum pariatur quidem eveniet quibusdam modi, nemo quos ad quas odit
				tempore provident soluta nisi aliquam, iste, sequi laudantium? Ut, mollitia. Ab minus
				aliquam assumenda! Consequuntur nemo id aspernatur aliquid ex quibusdam reprehenderit
				facilis laudantium aut ducimus quas optio debitis provident temporibus, corrupti, commodi,
				veritatis sint iure.
			</p>
		</Card.Content>

		<Card.Footer class="flex items-center justify-end gap-[10px]">
			<Button variant="secondary">Edit Post</Button>
			<Button variant="destructive">Delete Post</Button>
		</Card.Footer>
	</Card.Root>
{/each}
