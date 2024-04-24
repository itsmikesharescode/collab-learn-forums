<script lang="ts">
	import { getAuthState, getUserState } from '$lib';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { AlignJustify } from 'lucide-svelte';

	const authState = getAuthState();
	const userState = getUserState();

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
	class="sticky top-0 z-10 flex items-center justify-between border-b-[1px] border-black bg-white p-[10px] dark:border-white dark:bg-black sm:px-[30px]"
>
	{#if nativeWidth < 640}
		<button on:click={() => (showMobileSlider = true)}>
			<AlignJustify />
		</button>
	{/if}

	{#if nativeWidth >= 640}
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Collab Learn</h1>
	{/if}

	<div class="">
		<Button>Log out</Button>
	</div>
</nav>

{#if nativeWidth < 640}
	<Sheet.Root bind:open={showMobileSlider}>
		<Sheet.Content side="left">
			<Sheet.Header class="mt-[30px] flex flex-col gap-[20px]">
				<div class="mx-auto flex flex-col items-center gap-[10px]">
					<Avatar.Root class="h-[100px] w-[100px]">
						<Avatar.Image src={$userState?.user_photo_link} alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>

					<Button href="/edit-profile" on:click={() => (showMobileSlider = false)}
						>Edit Profile</Button
					>
				</div>

				<div class="">
					<Sheet.Title class="text-left">{$userState?.user_fullname}</Sheet.Title>
					<Sheet.Description class="max-h-[100px] overflow-auto text-left">
						{$userState?.user_bio}
					</Sheet.Description>
				</div>

				<div class="mt-[20px] flex flex-col gap-[20px]">
					{#each navigation as route}
						<Sheet.Title class="text-left">
							<a
								on:click={() => {
									$authState.activeURL = route.url;
									showMobileSlider = false;
								}}
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
