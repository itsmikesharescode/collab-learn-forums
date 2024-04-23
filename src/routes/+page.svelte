<script lang="ts">
	import { getStaticState, setStaticState } from '$lib';
	import ForgotPassword from '$lib/route-components/static-component/forgot-password.svelte';
	import Login from '$lib/route-components/static-component/login.svelte';
	import Register from '$lib/route-components/static-component/register.svelte';
	import CheckCode from '$lib/route-components/static-component/reset-password/check-code.svelte';
	import Verified from '$lib/route-components/static-component/reset-password/verified.svelte';

	import type { PageData, PageServerData } from './$types.js';
	export let data: PageServerData;

	setStaticState({
		register: false,
		forgotPass: false,
		checkCode: false,
		verified: false
	});

	const staticState = getStaticState();
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-[22px]">
	{#if $staticState.register}
		<Register />
	{:else if $staticState.forgotPass}
		{#if $staticState.verified}
			<Verified />
		{:else if $staticState.checkCode}
			<CheckCode />
		{:else}
			<ForgotPassword />
		{/if}
	{:else}
		<Login data={data.form} />
	{/if}
</div>
