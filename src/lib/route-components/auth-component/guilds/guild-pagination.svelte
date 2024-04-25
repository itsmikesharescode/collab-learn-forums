<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';

	export let count: number | null;
</script>

<div class="mt-[20px] flex overflow-auto">
	<Pagination.Root count={count ?? 0} perPage={6} let:pages let:currentPage>
		{#if currentPage}
			{((currentPage <= 1 ? 0 : currentPage) * 6) / (currentPage <= 1 ? 1 : currentPage)}
		{/if}

		<Pagination.Content class="flex w-full justify-end">
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage == page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>
