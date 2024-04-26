<script lang="ts">
	import { getAuthState } from '$lib';
	import * as Card from '$lib/components/ui/card';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Users, FolderLock, FolderOpen } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import guildDefaultIcon from '$lib/assets/guild_detault_photo.jpg';
	import * as Tabs from '$lib/components/ui/tabs';
	import WallContent from './guild-content/wall-content.svelte';
	import { page } from '$app/stores';

	const authState = getAuthState();

	const { guildObj } = $authState.guilds;

	let selections = 'wall';
</script>

<Card.Root class="mt-[20px] border-none">
	<Breadcrumb.Root class="mx-[20px]">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href={`/guilds?${$page.url.search.split('?')[1]}`}>Guilds</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{guildObj?.guild_name}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<Card.Header class="flex flex-col gap-[20px]">
		<Avatar.Root class="h-[240px] w-full rounded-none">
			<Avatar.Image src={guildDefaultIcon} alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>

		<div class=" flex items-start">
			<div class="w-full">
				<Card.Title>{guildObj?.guild_name}</Card.Title>
				<Card.Description>{guildObj?.guild_description}</Card.Description>
			</div>

			<div class="flex w-full justify-end gap-[10px]">
				<p>{guildObj?.guild_joined_count} / {guildObj?.guild_max_users}</p>
				<Users />
			</div>
		</div>

		<Tabs.Root bind:value={selections} class="w-[400px]">
			<Tabs.List>
				<Tabs.Trigger value="wall">Wall</Tabs.Trigger>
				<Tabs.Trigger value="chatFeed">Chat Feed</Tabs.Trigger>
				<Tabs.Trigger value="members">Members</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</Card.Header>

	<Card.Content class="flex flex-col gap-[10px]">
		{#if selections === 'wall'}
			<WallContent />
		{/if}
	</Card.Content>
	<Card.Footer>
		<p>Card Footer</p>
	</Card.Footer>
</Card.Root>
