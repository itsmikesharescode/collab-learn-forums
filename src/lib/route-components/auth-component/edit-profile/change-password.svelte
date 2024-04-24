<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change Password</Card.Title>
		<Card.Description>You can update your password here.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-[20px]">
		<div class="grid grid-cols-1 gap-[20px] md:grid-cols-2">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="address">New Password:</Label>
				<Input type="password" />
				<!-- {#each formErrors?.address ?? [] as errorMsg}
					<p class="text-sm text-red-500">{errorMsg}</p>
				{/each} -->
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="barangay">Confirm New Password:</Label>
				<Input type="password" />
				<!-- {#each formErrors?.barangay ?? [] as errorMsg}
					<p class="text-sm text-red-500">{errorMsg}</p>
				{/each} -->
			</div>
		</div>

		<div class="flex justify-end">
			<Button class="w-full sm:max-w-fit">Change Password</Button>
		</div>
	</Card.Content>
</Card.Root>
