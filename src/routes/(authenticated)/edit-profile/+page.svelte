<script lang="ts">
	import ChangePassword from '$lib/route-components/auth-component/edit-profile/change-password.svelte';
	import UpdateInformation from '$lib/route-components/auth-component/edit-profile/update-information.svelte';
	import UploadProfile from '$lib/route-components/auth-component/edit-profile/upload-profile.svelte';
</script>

<div class="flex flex-col gap-[20px] p-[22px]">
	<UploadProfile />
	<UpdateInformation />
	<ChangePassword />
</div>
