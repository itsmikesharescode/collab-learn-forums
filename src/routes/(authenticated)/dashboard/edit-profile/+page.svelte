<script lang="ts">
	import ChangePassword from '$lib/route-components/auth-component/edit-profile/change-password.svelte';
	import UpdateInformation from '$lib/route-components/auth-component/edit-profile/update-information.svelte';
	import UploadProfile from '$lib/route-components/auth-component/edit-profile/upload-profile.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
</script>

<div class="flex flex-col gap-[20px] p-[22px]">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/dashboard">Dashboard</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Edit Profile</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<UploadProfile />
	<UpdateInformation />
	<ChangePassword />
</div>
