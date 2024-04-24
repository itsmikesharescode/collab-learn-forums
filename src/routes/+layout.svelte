<script lang="ts">
	import DarkMode from '$lib/route-components/static-component/dark-mode.svelte';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />
<ModeWatcher />
<div class="fixed bottom-0 z-10 m-[10px]">
	<DarkMode />
</div>
<slot />
