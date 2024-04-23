<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import collab_icon from '$lib/assets/collab_icon.svg';
	import * as Form from '$lib/components/ui/form';
	import { loginSchema, type LoginSchema } from '$lib/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { getStaticState } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	const staticState = getStaticState();

	interface RegisterVal {
		firstName: string[];
		lastName: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	}

	let formErrors: RegisterVal | null = null;
	let registerLoader = false;
	const registerActionNews: SubmitFunction = () => {
		registerLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: RegisterVal }>;

			switch (status) {
				case 200:
					toast.success('Log in', { description: msg });
					registerLoader = false;
					goto('/dashboard');
					break;

				case 400:
					formErrors = errors;
					registerLoader = false;
					break;

				case 401:
					toast.error('Log in', { description: msg });
					registerLoader = false;
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
		action="?/registerAction"
		use:enhance={registerActionNews}
		class="flex flex-col gap-[20px]"
	>
		<div class="flex w-full flex-col gap-1.5">
			<Label for="firstName">First Name</Label>
			<Input
				disabled={registerLoader}
				name="firstName"
				type="text"
				id="firstName"
				placeholder="Enter your first name"
			/>
			{#each formErrors?.firstName ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="lastName">Last Name</Label>
			<Input
				disabled={registerLoader}
				name="lastName"
				type="text"
				id="lastName"
				placeholder="Enter your last name"
			/>
			{#each formErrors?.lastName ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="email">Email Address</Label>
			<Input
				disabled={registerLoader}
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
				disabled={registerLoader}
				name="password"
				type="password"
				id="password"
				placeholder="Enter your password"
			/>

			{#each formErrors?.password ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="confirmPassword">Confirm Password</Label>
			<Input
				disabled={registerLoader}
				name="confirmPassword"
				type="password"
				id="confirmPassword"
				placeholder="Enter your password"
			/>

			{#each formErrors?.confirmPassword ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<Button type="submit" disabled={registerLoader}>
			{#if registerLoader}
				Creating...
			{:else}
				Sign Up Free
			{/if}
		</Button>
	</form>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button
			disabled={registerLoader}
			variant="link"
			on:click={() => ($staticState.register = false)}>Log in here?</Button
		>
	</div>
</div>
