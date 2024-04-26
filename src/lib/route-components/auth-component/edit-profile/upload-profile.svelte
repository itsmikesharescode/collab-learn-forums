<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getUserState } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Image } from 'lucide-svelte';
	import { ArrowUpFromLine } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	const userState = getUserState();

	//for uploading profile
	let uploadLoader = false;
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

	const uploadProfileActionNews: SubmitFunction = () => {
		uploadLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Upload Profile', { description: msg });
					uploadLoader = false;
					files = undefined;
					previewURL = undefined;
					break;

				case 401:
					toast.error('Upload Profile', { description: msg });
					uploadLoader = false;
					files = undefined;
					previewURL = undefined;
					break;
			}
			await update();
		};
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Upload Profile Picture</Card.Title>
		<Card.Description>You can upload your profile picture here.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			method="post"
			action="/APIS?/uploadProfileAction"
			enctype="multipart/form-data"
			use:enhance={uploadProfileActionNews}
		>
			<div class={previewURL ? 'max-w-fit' : 'hidden'}>
				<img src={previewURL} alt="poorConnection" class="h-[180px] w-[180px] rounded-[10px]" />

				<div class="mt-[10px] flex items-center gap-[10px]">
					<Button disabled={uploadLoader} class="w-full" on:click={() => (previewURL = '')}
						>Clear</Button
					>
					<Button disabled={uploadLoader} type="submit" class="w-full">Upload</Button>
				</div>
			</div>

			<label
				class="{previewURL ? 'hidden' : 'flex'}
			max-w-fit cursor-pointer flex-col rounded-[10px] border-[1px] border-black p-[20px] dark:border-white"
			>
				<input
					name="uploadProfile"
					type="file"
					class="hidden"
					bind:files
					on:change={handleFileChange}
				/>

				{#if $userState?.user_photo_link}
					<img
						src={$userState.user_photo_link}
						alt="poorConnection"
						class="h-[100px] w-[100px] rounded-[10px]"
					/>
				{:else}
					<Image class="h-[100px] w-[100px]" />
				{/if}

				<div class="flex gap-[10px]">
					<p class="leading-7">Upload Profile</p>
					<ArrowUpFromLine />
				</div>
			</label>
		</form>
	</Card.Content>
</Card.Root>
