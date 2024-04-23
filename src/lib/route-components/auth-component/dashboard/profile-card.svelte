<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="relative flex flex-wrap p-[20px]">
	<Avatar.Root class="h-[100px] w-[100px]">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Card.Header>
		<Button class="absolute right-0 top-0 m-[20px]">Edit Profile</Button>
		<Card.Title>Eviota, Mike John Baguinaon</Card.Title>
		<Card.Description
			>The king, seeing how much happier his subjects were, realized the error of his ways and
			repealed the joke tax.</Card.Description
		>
	</Card.Header>
</Card.Root>
