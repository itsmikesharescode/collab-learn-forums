<script lang="ts">
	import { getAuthState } from '$lib';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { CreatedProjectReference } from '$lib/types';

	export let recentProjects: CreatedProjectReference[] | null;
</script>

<div class="">
	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Recent Project(s)
	</h2>

	<div
		class="grid h-[450px] grid-cols-1 grid-rows-3 gap-[10px] overflow-auto py-[10px] lg:grid-cols-2"
	>
		{#each recentProjects ?? [] as recentProject}
			<Card.Root class=" flex flex-col justify-center gap-[20px] p-[10px]">
				<div class="flex">
					<Avatar.Root class="h-[100px] w-[100px]">
						<Avatar.Image src={recentProject.image_url} alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<Card.Header>
						<div class="flex flex-wrap items-center gap-[10px]">
							<Card.Title>Project Name:</Card.Title>
							<Card.Description>{recentProject.project_name}</Card.Description>
						</div>

						<div class="flex flex-wrap items-center gap-[10px]">
							<Card.Title>Host:</Card.Title>
							<Card.Description>{recentProject.host_name}</Card.Description>
						</div>
					</Card.Header>
				</div>
			</Card.Root>
		{/each}
	</div>
</div>
