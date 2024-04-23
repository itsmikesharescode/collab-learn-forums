<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import collab_icon from '$lib/assets/collab_icon.svg';
	import { getStaticState } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	const staticState = getStaticState();

	interface LoginVal {
		email: string[];
		password: string[];
	}

	let formErrors: LoginVal | null = null;
	let loginLoader = false;
	const loginActionNews: SubmitFunction = () => {
		loginLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: LoginVal }>;

			switch (status) {
				case 200:
					toast.success('Log in', { description: msg });
					loginLoader = false;
					goto('/dashboard');
					break;

				case 400:
					formErrors = errors;
					loginLoader = false;
					break;

				case 401:
					toast.error('Log in', { description: msg });
					loginLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<div class="flex w-full flex-col gap-[20px] sm:w-[350px]">
	<Avatar.Root class="mx-auto h-[100px] w-[100px] bg-black">
		<Avatar.Image src={collab_icon} alt="@poorConnection" class="h-[100px] w-[100px]" />
		<Avatar.Fallback>CI</Avatar.Fallback>
	</Avatar.Root>

	<form
		method="POST"
		action="?/loginAction"
		use:enhance={loginActionNews}
		class="flex flex-col gap-[20px]"
	>
		<div class="flex w-full flex-col gap-1.5">
			<Label for="email">Email Address</Label>
			<Input
				disabled={loginLoader}
				name="email"
				type="email"
				id="email"
				placeholder="Enter your email address"
			/>
			{#each formErrors?.email ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="password">Password</Label>
			<Input
				disabled={loginLoader}
				name="password"
				type="password"
				id="password"
				placeholder="Enter your password"
			/>

			{#each formErrors?.password ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<Button type="submit" disabled={loginLoader}>
			{#if loginLoader}
				Logging in...
			{:else}
				Log in
			{/if}
		</Button>
	</form>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button disabled={loginLoader} variant="link" on:click={() => ($staticState.forgotPass = true)}
			>Forgot Password?
		</Button>
		<Button disabled={loginLoader} variant="link" on:click={() => ($staticState.register = true)}
			>Create Account?</Button
		>
	</div>
</div>
