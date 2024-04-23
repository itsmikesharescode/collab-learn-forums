<script lang="ts">
	import { setAuthState } from '$lib';
	import NavRouter from '$lib/route-components/auth-component/navigation/nav-router.svelte';

	setAuthState({
		activeURL: '/dashboard'
	});
</script>

<NavRouter />
<slot />
