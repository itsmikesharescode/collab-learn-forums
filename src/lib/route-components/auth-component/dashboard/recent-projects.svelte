<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<div class="">
	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Recent Project(s)
	</h2>

	<div class="grid h-[450px] grid-cols-1 gap-[10px] overflow-auto py-[10px] lg:grid-cols-2">
		{#each Array(10) as sample}
			<Card.Root>
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
