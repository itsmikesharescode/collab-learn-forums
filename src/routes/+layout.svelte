<script lang="ts">
	import DarkMode from '$lib/route-components/static-component/dark-mode.svelte';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<div class="fixed bottom-0 m-[10px]">
	<DarkMode />
</div>
<slot />
