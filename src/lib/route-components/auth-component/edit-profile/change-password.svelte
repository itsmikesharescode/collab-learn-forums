<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index';
	import CheckPassword from '$lib/route-components/static-component/check-password.svelte';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { passwordStrength } from 'check-password-strength';
	import { toast } from 'svelte-sonner';

	let password = '';
	let showPasswordGuide = false;
	$: passwordCheck = passwordStrength(password).value;
	const checkPasswordEngine = () =>
		passwordCheck === 'Strong' ? (showPasswordGuide = false) : (showPasswordGuide = true);

	interface ChangePasswordVal {
		password: string[];
		confirmPassword: string[];
	}

	let formErrors: ChangePasswordVal | null = null;
	let changePassLoader = false;

	const changePasswordActionNews: SubmitFunction = () => {
		changePassLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: ChangePasswordVal }>;

			switch (status) {
				case 200:
					formErrors = null;
					toast.success('Change Password', { description: msg });
					changePassLoader = false;
					break;

				case 400:
					formErrors = errors;
					changePassLoader = false;
					break;

				case 401:
					formErrors = null;
					toast.error('Change Password', { description: msg });
					changePassLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change Password</Card.Title>
		<Card.Description>You can update your password here.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			method="post"
			action="/APIS?/changePasswordAction"
			enctype="multipart/form-data"
			use:enhance={changePasswordActionNews}
			class="flex flex-col gap-[20px]"
		>
			<CheckPassword bind:showPasswordGuide />
			<input name="passwordStrength" type="hidden" value={passwordCheck} />
			<div class="grid grid-cols-1 gap-[20px] md:grid-cols-2">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="password">New Password:</Label>
					<Input
						disabled={changePassLoader}
						name="password"
						id="password"
						type="password"
						placeholder="Enter your new password"
						bind:value={password}
						on:keyup={checkPasswordEngine}
					/>
					{#each formErrors?.password ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="confirmPassword">Confirm New Password:</Label>
					<Input
						disabled={changePassLoader}
						name="confirmPassword"
						id="password"
						type="password"
						placeholder="Confirm your new password"
					/>
					{#each formErrors?.confirmPassword ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="flex justify-end">
				<Button disabled={changePassLoader} type="submit" class="w-full sm:max-w-fit">
					{#if changePassLoader}
						Updating...
					{:else}
						Change Password
					{/if}
				</Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>
