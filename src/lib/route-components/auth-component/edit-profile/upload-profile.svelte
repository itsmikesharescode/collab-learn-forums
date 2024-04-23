<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Image } from 'lucide-svelte';
	import { ArrowUpFromLine } from 'lucide-svelte';

	//for uploading profile
	let uploadLoader = false;
	let previewURL: string | undefined;

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
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Upload Profile Picture</Card.Title>
		<Card.Description>You can upload your profile picture here.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if previewURL}
			<img src={previewURL} alt="poorConnection" class="h-[180px] w-[180px] rounded-[10px]" />

			<div class="mt-[10px] flex w-[180px] gap-[10px]">
				<Button class="w-full" on:click={() => (previewURL = '')}>Clear</Button>
				<Button class="w-full">Upload</Button>
			</div>
		{:else}
			<label
				class="flex max-w-fit cursor-pointer flex-col rounded-[10px] border-[1px] border-black p-[20px] dark:border-white"
			>
				<input type="file" class="hidden" on:change={handleFileChange} />

				<Image class="h-[100px] w-[100px]" />

				<div class="flex gap-[10px]">
					<p class="leading-7">Upload Profile</p>
					<ArrowUpFromLine />
				</div>
			</label>
		{/if}
	</Card.Content>
</Card.Root>
