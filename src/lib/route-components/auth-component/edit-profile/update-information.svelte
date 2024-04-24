<script lang="ts">
	import { getUserState } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import { fade, fly } from 'svelte/transition';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	let updateInfo = false;

	const userState = getUserState();

	const resetValues = () => {
		bio = $userState?.user_bio;
		firstName = $userState?.user_fullname.split(', ')[1];
		lastName = $userState?.user_fullname.split(', ')[0];
		address = $userState?.user_address;
		barangay = $userState?.user_barangay;
		city = $userState?.user_city;
		religion = $userState?.user_religion;
		contactNumber = $userState?.user_contact;
	};

	let bio = $userState?.user_bio;
	let firstName = $userState?.user_fullname.split(', ')[1];
	let lastName = $userState?.user_fullname.split(', ')[0];
	let address = $userState?.user_address;
	let barangay = $userState?.user_barangay;
	let city = $userState?.user_city;
	let religion = $userState?.user_religion;
	let contactNumber = $userState?.user_contact;

	interface UpdateInformationVal {
		bio: string[];
		firstName: string[];
		lastName: string[];
		address: string[];
		barangay: string[];
		city: string[];
		religion: string[];
		contactNumber: string[];
		profilePicture: string[];
	}

	let updateInfoLoader = false;
	let formErrors: UpdateInformationVal | null = null;
	const updatePersonalInformationActionNews: SubmitFunction = () => {
		updateInfoLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdateInformationVal }>;

			switch (status) {
				case 200:
					invalidateAll();
					formErrors = null;
					toast.success('Personal Information', { description: msg });
					updateInfoLoader = false;
					updateInfo = false;
					break;

				case 400:
					formErrors = errors;
					updateInfoLoader = false;
					break;

				case 401:
					formErrors = null;
					toast.error('Personal Information', { description: msg });
					updateInfoLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<Card.Root class="overflow-hidden">
	<Card.Header>
		<Card.Title>Personal Information</Card.Title>
		<Card.Description>You can upload your personal information here.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			method="post"
			action="/APIS?/updatePersonalInformationAction"
			enctype="multipart/form-data"
			use:enhance={updatePersonalInformationActionNews}
			class="flex flex-col gap-[20px]"
		>
			<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="firstName">First Name:</Label>
					<Input
						name="firstName"
						disabled={!updateInfo || updateInfoLoader}
						type="text"
						id="firstName"
						placeholder="Enter your first name."
						bind:value={firstName}
					/>
					{#each formErrors?.firstName ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="lastName">Last Name:</Label>
					<Input
						name="lastName"
						disabled={!updateInfo || updateInfoLoader}
						type="text"
						id="lastName"
						placeholder="Enter your last name."
						bind:value={lastName}
					/>
					{#each formErrors?.lastName ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-1 gap-[20px]">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="address">Address:</Label>
					<Input
						name="address"
						disabled={!updateInfo || updateInfoLoader}
						type="text"
						id="address"
						placeholder="Enter your address."
						bind:value={address}
					/>
					{#each formErrors?.address ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="barangay">Barangay:</Label>
					<Input
						name="barangay"
						disabled={!updateInfo || updateInfoLoader}
						type="text"
						id="barangay"
						placeholder="Enter your barangay."
						bind:value={barangay}
					/>
					{#each formErrors?.barangay ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="city">City:</Label>
					<Input
						name="city"
						disabled={!updateInfo || updateInfoLoader}
						type="text"
						id="city"
						placeholder="Enter your city."
						bind:value={city}
					/>
					{#each formErrors?.city ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="religion">Religion:</Label>
					<Input
						name="religion"
						disabled={!updateInfo || updateInfoLoader}
						type="text"
						id="religion"
						placeholder="Enter your religion."
						bind:value={religion}
					/>
					{#each formErrors?.religion ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-1 gap-[20px]">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="contactNumber">Contact Number:</Label>
					<Input
						name="contactNumber"
						disabled={!updateInfo || updateInfoLoader}
						type="number"
						id="contactNumber"
						placeholder="Enter your contact number"
						bind:value={contactNumber}
					/>
					{#each formErrors?.contactNumber ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-1 gap-[20px]">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="bio">Bio:</Label>
					<Textarea
						name="bio"
						disabled={!updateInfo || updateInfoLoader}
						id="bio"
						placeholder="Enter your bio"
						bind:value={bio}
					/>
					{#each formErrors?.bio ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="flex justify-end gap-[10px]">
				{#if updateInfo}
					<div class="flex w-full items-center gap-[10px] sm:max-w-fit">
						<div class="w-full sm:max-w-fit" in:fly={{ x: 200, duration: 350 }}>
							<Button
								disabled={updateInfoLoader}
								class="w-full sm:max-w-fit"
								on:click={() => {
									updateInfo = false;
									resetValues();
								}}>Cancel</Button
							>
						</div>

						<div class="w-full sm:max-w-fit" in:fly={{ x: -200, duration: 350 }}>
							<Button type="submit" disabled={updateInfoLoader} class="w-full sm:max-w-fit">
								{#if updateInfoLoader}
									Saving...
								{:else}
									Save Information
								{/if}
							</Button>
						</div>
					</div>
				{:else}
					<div class="w-full sm:max-w-fit" in:fade>
						<Button disabled={updateInfoLoader} class="w-full " on:click={() => (updateInfo = true)}
							>Update Information</Button
						>
					</div>
				{/if}
			</div>
		</form>
	</Card.Content>
</Card.Root>
