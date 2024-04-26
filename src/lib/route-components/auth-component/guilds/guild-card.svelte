<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Users, FolderLock, FolderOpen } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getAuthState, getUserState } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	const authState = getAuthState();
	const userState = getUserState();

	export let guildObj: CreatedGuildReference;

	let notJoinedDialog = false;

	// a client checker if joined
	const checkIfJoined = async () => {
		const { guild_privacy, guild_joined_tb_new } = guildObj;
		if (guild_privacy === 'private') {
			const isJoined = guild_joined_tb_new.map((joinedVec) => joinedVec.user_id);

			if (isJoined.includes($userState?.user_id ?? '')) {
				$authState.guilds.guildObj = guildObj;
				$authState.guilds.viewingContent = true;
				return;
			}
			return (notJoinedDialog = true);
		}

		$authState.guilds.guildObj = guildObj;
		$authState.guilds.viewingContent = true;
		return;
	};

	let formErrors: { passcode: string[] } | null = null;
	let joinGuildLoader = false;
	const joinGuildActionNews: SubmitFunction = () => {
		joinGuildLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: { passcode: string[] } }>;

			switch (status) {
				case 200:
					invalidateAll();
					$authState.guilds.guildObj = guildObj;
					$authState.guilds.viewingContent = true;
					toast.success('Join Guild', { description: msg });
					joinGuildLoader = false;
					break;

				case 400:
					formErrors = errors;
					joinGuildLoader = false;
					break;

				case 401:
					toast.error('Join Guild', { description: msg });
					joinGuildLoader = false;
					break;
			}
			await update();
		};
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
			use:enhance={joinGuildActionNews}
		>
			<input name="userId" type="hidden" value={$userState?.user_id} />
			<input name="userPhotoLink" type="hidden" value={$userState?.user_photo_link} />
			<input name="userFullname" type="hidden" value={$userState?.user_fullname} />
			<input name="guildId" type="hidden" value={guildObj.id} />

			<AlertDialog.Header>
				<AlertDialog.Title>{guildObj.guild_name}</AlertDialog.Title>
				<AlertDialog.Description class="max-h-[350px] overflow-auto"
					>{guildObj.guild_description}</AlertDialog.Description
				>
			</AlertDialog.Header>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="passcode">Guild Passcode:</Label>
				<Input
					disabled={joinGuildLoader}
					name="passcode"
					type="password"
					id="passcode"
					placeholder="Enter guild passcode."
				/>
				{#each formErrors?.passcode ?? [] as errorMsg}
					<p class="text-sm text-red-500">{errorMsg}</p>
				{/each}
			</div>

			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={joinGuildLoader}>Cancel</AlertDialog.Cancel>
				<Button disabled={joinGuildLoader} type="submit">
					{#if joinGuildLoader}
						Checking Pass...
					{:else}
						Proceed
					{/if}
				</Button>
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
