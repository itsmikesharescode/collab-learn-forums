<script lang="ts">
	import DarkMode from '$lib/route-components/static-component/dark-mode.svelte';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';

	import { supabase } from '$lib';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	supabase.set(data.supabase);
</script>

<Toaster />
<ModeWatcher />
<div class="fixed bottom-0 z-10 m-[10px]">
	<DarkMode />
</div>
<slot />
