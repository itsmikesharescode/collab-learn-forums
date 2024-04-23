<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
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

	export let data: SuperValidated<Infer<LoginSchema>>;

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData } = form;

	const staticState = getStaticState();

	let loginLoader = false;
	const loginActionNews: SubmitFunction = () => {
		loginLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Log in', { description: msg });
					loginLoader = false;
					break;

				case 400:
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
		class="flex flex-col gap-[10px]"
	>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input
					disabled={loginLoader}
					{...attrs}
					placeholder="Enter your email"
					type="email"
					bind:value={$formData.email}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input
					disabled={loginLoader}
					{...attrs}
					placeholder="Enter your password"
					type="password"
					bind:value={$formData.password}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Button disabled={loginLoader}>
			{#if loginLoader}
				Logging in...
			{:else}
				Log in
			{/if}
		</Form.Button>
	</form>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button variant="link" on:click={() => ($staticState.forgotPass = true)}
			>Forgot Password?
		</Button>
		<Button variant="link" on:click={() => ($staticState.register = true)}>Create Account?</Button>
	</div>
</div>
