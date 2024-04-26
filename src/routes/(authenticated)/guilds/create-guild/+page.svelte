<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group/index';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import * as Card from '$lib/components/ui/card';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { getUserState } from '$lib';
	import { toast } from 'svelte-sonner';
	import { goto, invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';

	const userState = getUserState();

	let previewURL: string | undefined;
	let files: FileList | undefined;

	const handleFileChange = (event: Event) => {
		const fileInput = event.currentTarget as HTMLInputElement;
		const file = fileInput.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = () => {
				previewURL = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	interface CreateGuildVal {
		guildPhoto: string[];
		guildName: string[];
		maxUsers: string[];
		guildDescription: string[];
		passcode: string[];
	}

	let formErrors: CreateGuildVal | null = null;
	let createGloader = false;
	const createGuildActionNews: SubmitFunction = () => {
		createGloader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CreateGuildVal }>;

			switch (status) {
				case 200:
					await goto('/guilds');
					toast.success('Create Guild', { description: msg });
					createGloader = false;
					break;

				case 400:
					formErrors = errors;
					createGloader = false;

					break;

				case 401:
					formErrors = null;
					previewURL = undefined;
					toast.error('Create Guild', { description: msg });
					createGloader = false;
					break;
			}
			await update();
		};
	};

	let privacy = 'public';
	let passcode = '';
	$: privacy === 'public' ? (passcode = '') : '';
</script>

<Card.Root class="mt-[20px] border-none">
	<Breadcrumb.Root class="mx-[22px]">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/guilds">Guilds</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Create Guild</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<form
		method="post"
		action="/APIS?/createGuildAction"
		enctype="multipart/form-data"
		use:enhance={createGuildActionNews}
	>
		<Card.Header>
			<Card.Title class="scroll-m-20 text-2xl font-semibold tracking-tight">Create Guild</Card.Title
			>
			<Card.Description>Start collaborating to your co-peers through guild.</Card.Description>
		</Card.Header>
		<Card.Content class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
			<input
				disabled={createGloader}
				name="hostName"
				type="hidden"
				value={$userState?.user_fullname}
			/>
			<input
				disabled={createGloader}
				name="hostPhoto"
				type="hidden"
				value={$userState?.user_photo_link}
			/>

			<div class="flex w-full flex-col gap-[20px]">
				<Card.Description
					>We use advanced image compression techniques to reduce your image size to 300kb while
					maintaining decent quality. Uploading an image larger than 5MB may take some time.
				</Card.Description>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="email-2">Guild Photo:</Label>
					<input
						disabled={createGloader}
						name="guildPhoto"
						type="file"
						bind:files
						on:change={handleFileChange}
					/>
					{#each formErrors?.guildPhoto ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				{#if previewURL}
					<Avatar.Root class="h-[100px] w-[100px] rounded-[20px]">
						<Avatar.Image src={previewURL} alt="@shadcn" class="h-[100px] w-[100px]" />
						<Avatar.Fallback>GP</Avatar.Fallback>
					</Avatar.Root>
				{/if}
			</div>

			<div class="flex flex-col gap-[20px]">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="guildName">Guild Name:</Label>
					<Input
						disabled={createGloader}
						name="guildName"
						type="text"
						id="guildName"
						placeholder="Enter guild name."
					/>
					{#each formErrors?.guildName ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="maxUsers">Max Users:</Label>
					<Input
						disabled={createGloader}
						name="maxUsers"
						type="number"
						id="maxUsers"
						placeholder="Enter maximum users."
					/>
					{#each formErrors?.maxUsers ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="email-2">Guild Description:</Label>
					<Textarea
						disabled={createGloader}
						name="guildDescription"
						placeholder="Enter guild description."
					/>
					{#each formErrors?.guildDescription ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<RadioGroup.Root disabled={createGloader} bind:value={privacy} class="flex  items-center">
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="public" id="r2" />
						<Label for="r2">Public</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="private" id="r3" />
						<Label for="r3">Private</Label>
					</div>
					<RadioGroup.Input name="privacy" />
				</RadioGroup.Root>

				<div class={privacy === 'public' ? 'hidden' : 'flex w-full flex-col gap-1.5 '}>
					<Label for="passcode-2">Passcode:</Label>
					<Input
						name="passcode"
						type="password"
						id="passcode"
						placeholder="Enter passcode."
						bind:value={passcode}
					/>
					{#each formErrors?.passcode ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button disabled={createGloader} type="submit" class="w-full sm:max-w-fit">
				{#if createGloader}
					Creating...
				{:else}
					Create Guild
				{/if}
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
