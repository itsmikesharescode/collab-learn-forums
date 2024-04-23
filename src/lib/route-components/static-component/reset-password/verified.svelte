<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import collab_icon from '$lib/assets/collab_icon.svg';
	import { getStaticState } from '$lib';

	const staticState = getStaticState();
</script>

<div class="flex w-full flex-col gap-[20px] sm:w-[350px]">
	<Avatar.Root class="mx-auto h-[100px] w-[100px] bg-black">
		<Avatar.Image src={collab_icon} alt="@poorConnection" class="h-[100px] w-[100px]" />
		<Avatar.Fallback>CI</Avatar.Fallback>
	</Avatar.Root>
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Update Password</h3>
	<p class="text-sm text-muted-foreground">
		You might receive email notifications from us for security and login purposes.
	</p>

	<div class="mt-[10px] flex w-full flex-col gap-1.5">
		<Label for="password">New Password:</Label>
		<Input type="password" id="password" placeholder="Enter new password" />
	</div>

	<div class="mt-[10px] flex w-full flex-col gap-1.5">
		<Label for="password">Confirm New Password:</Label>
		<Input type="password" id="password" placeholder="Confirm new password" />
	</div>

	<Button>Update Password</Button>
</div>
