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

	<div class="flex w-full flex-col gap-1.5">
		<Label for="firstName">Firt Name:</Label>
		<Input type="text" id="firstName" placeholder="Enter your first name" />
	</div>

	<div class="flex w-full flex-col gap-1.5">
		<Label for="lastName">Last Name:</Label>
		<Input type="text" id="lastName" placeholder="Enter your last name" />
	</div>

	<div class="flex w-full flex-col gap-1.5">
		<Label for="email">Email Address:</Label>
		<Input type="email" id="email" placeholder="Enter your email address" />
	</div>

	<div class="flex w-full flex-col gap-1.5">
		<Label for="password">Password:</Label>
		<Input type="password" id="password" placeholder="Enter your password" />
	</div>

	<div class="flex w-full flex-col gap-1.5">
		<Label for="confirmPassword">Confirm Password:</Label>
		<Input type="password" id="confirmPassword" placeholder="Confirm your password" />
	</div>

	<Button>Register</Button>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button variant="link" on:click={() => ($staticState.register = false)}>Log in here?</Button>
	</div>
</div>
