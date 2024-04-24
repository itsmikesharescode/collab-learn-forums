<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { CreatedGuildReference } from '$lib/types';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Users, FolderLock, FolderOpen } from 'lucide-svelte';

	export let guildObj: CreatedGuildReference;
</script>

<Card.Root class="cursor-pointer">
	<Card.Header>
		<Card.Title>{guildObj.guild_name}</Card.Title>
	</Card.Header>
	<Card.Content class="flex items-center gap-[20px]">
		<Avatar.Root class="h-[100px] w-[100px]">
			<Avatar.Image src={guildObj.image_url} alt="@shadcn" />
			<Avatar.Fallback>{guildObj.guild_name[0]}</Avatar.Fallback>
		</Avatar.Root>

		<div class="flex flex-col gap-[10px]">
			<div class="">
				<p class="font-semibold leading-7">Host:</p>
				<p class="leading-7">{guildObj.host_name}</p>
			</div>
			<Card.Description class="h-[100px] overflow-auto">{guildObj.description}</Card.Description>
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		{#if guildObj.is_private}
			<div class="flex gap-[10px]">
				<p>Encrypted</p>
				<FolderLock />
			</div>
		{:else}
			<div class="flex gap-[10px]">
				<p>Public</p>
				<FolderOpen />
			</div>
		{/if}

		<div class="flex gap-[10px]">
			<p>{guildObj.joined_count} / {guildObj.max_users}</p>
			<Users />
		</div>
	</Card.Footer>
</Card.Root>
