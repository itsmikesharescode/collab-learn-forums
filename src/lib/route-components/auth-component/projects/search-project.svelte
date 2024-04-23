<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import { Search } from 'lucide-svelte';
</script>

<div class="relative flex items-center">
	<Search class="absolute ml-[5px]" />
	<Input type="search" placeholder="Search Guild" class="w-full pl-[30px]" />
</div>
