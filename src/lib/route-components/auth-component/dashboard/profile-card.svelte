<script lang="ts">
	import { getUserState } from '$lib';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';

	const userState = getUserState();
</script>

<Card.Root class="relative flex flex-wrap p-[20px]">
	<Avatar.Root class="h-[100px] w-[100px]">
		<Avatar.Image src={$userState?.user_photo_link} alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Card.Header>
		<Button class="absolute right-0 top-0 m-[20px]" href="/dashboard/edit-profile"
			>Edit Profile</Button
		>
		<Card.Title>{$userState?.user_fullname}</Card.Title>
		<Card.Description>{$userState?.user_bio}</Card.Description>
	</Card.Header>
</Card.Root>
