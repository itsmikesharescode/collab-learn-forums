<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import { fade, fly } from 'svelte/transition';

	let updateInfo = false;
</script>

<Card.Root class="overflow-hidden">
	<Card.Header>
		<Card.Title>Personal Information</Card.Title>
		<Card.Description>You can upload your personal information here.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-[20px]">
		<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="firstName">First Name:</Label>
				<Input
					disabled={!updateInfo}
					type="text"
					id="firstName"
					placeholder="Enter your first name."
				/>
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="lastName">Last Name:</Label>
				<Input
					disabled={!updateInfo}
					type="text"
					id="lastName"
					placeholder="Enter your last name."
				/>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-[20px]">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="address">Address:</Label>
				<Input disabled={!updateInfo} type="text" id="address" placeholder="Enter your address." />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="barangay">Barangay:</Label>
				<Input
					disabled={!updateInfo}
					type="text"
					id="barangay"
					placeholder="Enter your barangay."
				/>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="city">City:</Label>
				<Input disabled={!updateInfo} type="text" id="city" placeholder="Enter your city." />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="religion">Religion:</Label>
				<Input
					disabled={!updateInfo}
					type="text"
					id="religion"
					placeholder="Enter your religion."
				/>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-[20px]">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="contactNumber">Contact Number:</Label>
				<Input
					disabled={!updateInfo}
					type="number"
					id="contactNumber"
					placeholder="Enter your contact number"
				/>
			</div>
		</div>

		<div class="flex justify-end gap-[10px]">
			{#if updateInfo}
				<div class="flex w-full items-center gap-[10px] sm:max-w-fit">
					<div class="w-full sm:max-w-fit" in:fly={{ x: 200, duration: 350 }}>
						<Button class="w-full sm:max-w-fit" on:click={() => (updateInfo = false)}>Cancel</Button
						>
					</div>

					<div class="w-full sm:max-w-fit" in:fly={{ x: -200, duration: 350 }}>
						<Button class="w-full sm:max-w-fit">Save Information</Button>
					</div>
				</div>
			{:else}
				<div class="w-full sm:max-w-fit" in:fade>
					<Button class="w-full " on:click={() => (updateInfo = true)}>Update Information</Button>
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
