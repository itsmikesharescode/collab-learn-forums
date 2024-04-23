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
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Verify Your Account</h3>
	<p class="text-sm text-muted-foreground">
		Please enter the code we have sent to your email account.
	</p>

	<div class="mt-[10px] flex w-full flex-col gap-1.5">
		<Label for="code">Code:</Label>
		<Input type="text" id="code" placeholder="Enter code" />
	</div>

	<Button>Check Code</Button>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button variant="link" on:click={() => ($staticState.forgotPass = false)}>Log in here</Button>
	</div>
</div>
