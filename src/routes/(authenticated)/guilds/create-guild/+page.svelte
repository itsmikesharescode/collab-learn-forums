<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

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
</script>

<Card.Root class="mt-[20px] border-none">
	<Card.Header>
		<Card.Title class="scroll-m-20 text-2xl font-semibold tracking-tight">Create Guild</Card.Title>
		<Card.Description>Start collaborating to your co-peers through guild.</Card.Description>
	</Card.Header>
	<Card.Content class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
		<div class="flex w-full flex-col gap-[20px]">
			<Card.Description
				>We use advanced image compression techniques to reduce your image size to 300kb while
				maintaining decent quality. Uploading an image larger than 5MB may take some time.
			</Card.Description>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="email-2">Guild Photo:</Label>
				<input type="file" bind:files on:change={handleFileChange} />
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
				<Input type="text" id="guildName" placeholder="Enter guild name." />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="maxUsers">Max Users:</Label>
				<Input type="number" id="maxUsers" placeholder="Enter maximum users." />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="email-2">Guild Description:</Label>
				<Textarea placeholder="Enter guild description." />
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-end">
		<Button class="w-full sm:max-w-fit">Create Guild</Button>
	</Card.Footer>
</Card.Root>