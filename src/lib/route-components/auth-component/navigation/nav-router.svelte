<script lang="ts">
	import { getAuthState } from '$lib';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { AlignJustify } from 'lucide-svelte';
	import collab_icon from '$lib/assets/collab_icon.svg';

	const authState = getAuthState();

	const navigation = [
		{
			url: '/dashboard',
			title: 'DASHBOARD'
		},

		{
			url: '/guilds',
			title: 'GUILDS'
		},

		{
			url: '/projects',
			title: 'PROJECTS'
		},

		{
			url: '/learning-modules',
			title: 'LEARNING MODULES'
		}
	];

	let showMobileSlider = false;

	let nativeWidth = 0;
</script>

<svelte:window bind:innerWidth={nativeWidth} />

<nav
	class="sticky top-0 flex items-center border-b-[1px] border-black bg-white p-[10px] dark:border-white dark:bg-black"
>
	{#if nativeWidth < 640}
		<button on:click={() => (showMobileSlider = true)}>
			<AlignJustify />
		</button>
	{/if}

	{#if nativeWidth >= 640}
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Collab Learn</h1>
	{/if}
</nav>

{#if nativeWidth < 640}
	<Sheet.Root bind:open={showMobileSlider}>
		<Sheet.Content side="left">
			<Sheet.Header class="mt-[30px] flex flex-col gap-[20px]">
				<div class="mx-auto flex flex-col items-center gap-[10px]">
					<Avatar.Root class="h-[100px] w-[100px]">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>

					<Button>Edit Profile</Button>
				</div>

				<div class="">
					<Sheet.Title class="text-left">Eviota, Mike John Baguinaon</Sheet.Title>
					<Sheet.Description class="max-h-[100px] overflow-auto text-left">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, totam. Ut,
						maxime aperiam magnam sapiente cum pariatur veritatis, dolorem culpa nemo eos et
						voluptas nesciunt, maiores fuga adipisci optio autem quis sed? Sit atque natus suscipit
						quod quaerat saepe iure voluptates commodi dicta sint dolorem sequi at consectetur
						maiores ea, officia incidunt delectus necessitatibus voluptate harum quae tempora
						consequatur quisquam? Sequi ipsa quae ipsum voluptatem ullam rem officia sunt qui, odio
						perspiciatis velit quo dolor amet natus, tenetur provident modi impedit laudantium
						veritatis. Blanditiis facilis in, sunt minima commodi quia tempora consectetur aliquam
						laudantium incidunt optio perferendis illo aperiam. Animi!
					</Sheet.Description>
				</div>

				<div class="mt-[20px] flex flex-col gap-[20px]">
					{#each navigation as route}
						<Sheet.Title class="text-left">
							<a
								on:click={() => ($authState.activeURL = route.url)}
								href={route.url}
								class={$authState.activeURL === route.url ? 'text-muted-foreground underline' : ''}
								>{route.title}</a
							>
						</Sheet.Title>
					{/each}
				</div>
			</Sheet.Header>
		</Sheet.Content>
	</Sheet.Root>
{/if}
