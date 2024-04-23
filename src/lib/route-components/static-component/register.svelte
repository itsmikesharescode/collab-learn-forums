<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import collab_icon from '$lib/assets/collab_icon.svg';
	import * as Form from '$lib/components/ui/form';
	import { registerSchema, type RegisterSchema } from '$lib/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { getStaticState } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	export let registerForm: SuperValidated<Infer<RegisterSchema>>;

	const form = superForm(registerForm, {
		validators: zodClient(registerSchema)
	});

	const { form: formData } = form;

	const staticState = getStaticState();

	let registerLoader = false;
	const registerActionNews: SubmitFunction = () => {
		registerLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Log in', { description: msg });
					registerLoader = false;
					break;

				case 400:
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
		action="?/regiterAction"
		use:enhance={registerActionNews}
		class="flex flex-col gap-[10px]"
	>
		<Form.Field {form} name="firstName">
			<Form.Control let:attrs>
				<Form.Label>First Name</Form.Label>
				<Input
					disabled={registerLoader}
					{...attrs}
					placeholder="Enter your first name"
					type="text"
					bind:value={$formData.firstName}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="lastName">
			<Form.Control let:attrs>
				<Form.Label>Last Name</Form.Label>
				<Input
					disabled={registerLoader}
					{...attrs}
					placeholder="Enter your last name"
					type="text"
					bind:value={$formData.lastName}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Button disabled={registerLoader}>
			{#if registerLoader}
				Creating...
			{:else}
				Create Account
			{/if}
		</Form.Button>
	</form>

	<div class="mt-[20px] flex flex-col gap-[10px]">
		<Button
			disabled={registerLoader}
			variant="link"
			on:click={() => ($staticState.register = false)}>Log in here?</Button
		>
	</div>
</div>
