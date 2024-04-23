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
		<Label for="email">Email:</Label>
		<Input type="email" id="email" placeholder="Enter your email address" />
	</div>

	<div class="flex w-full flex-col gap-1.5">
		<Label for="password">Password:</Label>
		<Input type="password" id="password" placeholder="Enter your password" />
	</div>

	<Button>Log in</Button>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button variant="link" on:click={() => ($staticState.forgotPass = true)}
			>Forgot Password?
		</Button>
		<Button variant="link" on:click={() => ($staticState.register = true)}>Create Account?</Button>
	</div>
</div>
