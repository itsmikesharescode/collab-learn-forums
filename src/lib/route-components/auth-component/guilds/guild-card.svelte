<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { CreatedGuildReference } from '$lib/types';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Users, FolderLock, FolderOpen } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getUserState } from '$lib';

	const userState = getUserState();

	export let guildObj: CreatedGuildReference;

	const checkIfJoined = () => {
		const { guild_privacy, guild_joined_tb_new } = guildObj;
		if (guild_privacy === 'private') {
			const isJoined = guild_joined_tb_new.map((joinedVec) => joinedVec.user_id);

			if (isJoined.includes($userState?.user_id ?? '')) return console.log('Is joined');

			return console.log('Not joined');
		}

		return console.log('Its public');
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{guildObj.guild_name}</Card.Title>
	</Card.Header>
	<Card.Content class="flex items-center gap-[20px]">
		<Avatar.Root class="h-[100px] w-[100px]">
			<Avatar.Image src={guildObj.guild_photo_link} alt="@shadcn" />
			<Avatar.Fallback>{guildObj.guild_name[0]}</Avatar.Fallback>
		</Avatar.Root>

		<div class="flex flex-col gap-[10px]">
			<div class="">
				<p class="font-semibold leading-7">Host:</p>
				<p class="leading-7">{guildObj.guild_host_name}</p>
			</div>
			<Card.Description class="h-[100px] overflow-auto"
				>{guildObj.guild_description}</Card.Description
			>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-wrap justify-between gap-[20px]">
		<Button class="flex items-center gap-[10px]" on:click={checkIfJoined}>
			{#if guildObj.guild_privacy === 'private'}
				<p>Join -> Encrypted</p>
				<FolderLock />
			{:else}
				<p>Join -> Public</p>
				<FolderOpen />
			{/if}
		</Button>

		<div class="flex gap-[10px]">
			<p>{guildObj.guild_joined_count} / {guildObj.guild_max_users}</p>
			<Users />
		</div>
	</Card.Footer>
</Card.Root>
