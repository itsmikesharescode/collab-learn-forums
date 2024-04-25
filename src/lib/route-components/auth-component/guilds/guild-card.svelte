<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { CreatedGuildReference } from '$lib/types';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Users, FolderLock, FolderOpen } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getUserState } from '$lib';
	import { enhance } from '$app/forms';

	const userState = getUserState();

	export let guildObj: CreatedGuildReference;

	let notJoinedDialog = false;

	// a client checker if joined
	const checkIfJoined = () => {
		const { guild_privacy, guild_joined_tb_new } = guildObj;
		if (guild_privacy === 'private') {
			const isJoined = guild_joined_tb_new.map((joinedVec) => joinedVec.user_id);

			if (isJoined.includes($userState?.user_id ?? '')) return console.log('Is joined');

			return (notJoinedDialog = true);
		}

		return console.log('Its public');
	};
</script>

<!-- prompt for letting them join if have passcode -->

<AlertDialog.Root bind:open={notJoinedDialog}>
	<AlertDialog.Content>
		<form
			class="flex flex-col gap-[20px]"
			method="post"
			action="/APIS?/joinGuildAction"
			enctype="multipart/form-data"
			use:enhance
		>
			<AlertDialog.Header>
				<AlertDialog.Title>{guildObj.guild_name}</AlertDialog.Title>
				<AlertDialog.Description class="max-h-[350px] overflow-auto"
					>{guildObj.guild_description}</AlertDialog.Description
				>
			</AlertDialog.Header>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="email-2">Guild Passcode:</Label>
				<Input type="email" id="email-2" placeholder="Enter guild passcode." />
			</div>

			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Proceed</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

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
