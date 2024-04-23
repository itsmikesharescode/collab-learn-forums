<script lang="ts">
	import { getStaticState, setStaticState } from '$lib';
	import ForgotPassword from '$lib/route-components/static-component/forgot-password.svelte';
	import Login from '$lib/route-components/static-component/login.svelte';
	import Register from '$lib/route-components/static-component/register.svelte';

	setStaticState({
		register: false,
		forgotPass: false
	});

	const staticState = getStaticState();
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-[22px]">
	{#if $staticState.register}
		<Register />
	{:else if $staticState.forgotPass}
		<ForgotPassword />
	{:else}
		<Login />
	{/if}
</div>
