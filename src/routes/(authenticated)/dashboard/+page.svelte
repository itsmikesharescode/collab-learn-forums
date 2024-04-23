<script lang="ts">
	import { chartRender } from '$lib/route-components/auth-component/dashboard/charts/chart-render';
	import ProfileCard from '$lib/route-components/auth-component/dashboard/profile-card.svelte';
	import RecentProjects from '$lib/route-components/auth-component/dashboard/recent-projects.svelte';
	import type { ChartConfiguration } from 'chart.js/auto';
	// Access the canvas element using a Svelte directive
	let canvasElement: string | HTMLCanvasElement;

	// After the canvas element is mounted, invoke chartRender with lineData
	import { onMount } from 'svelte';

	onMount(() => {
		const lineData: ChartConfiguration<'line', number[], unknown> = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May'],
				datasets: [
					{
						label: 'User Data',
						data: [
							30 * Math.random(),
							70 * Math.random(),
							90 * Math.random(),
							100 * Math.random(),
							35 * Math.random()
						],
						borderColor: 'rgba(54, 162, 235, 1)', // Line color
						borderWidth: 2, // Line width
						fill: false // Disable fill under the line
					},
					{
						label: 'User Data',
						data: [
							30 * Math.random(),
							70 * Math.random(),
							90 * Math.random(),
							100 * Math.random(),
							35 * Math.random()
						],
						borderColor: 'rgba(54, 162, 235, 1)', // Line color
						borderWidth: 2, // Line width
						fill: false // Disable fill under the line
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				scales: {
					x: {
						display: true,
						title: {
							display: true,
							text: 'Month'
						}
					},
					y: {
						display: true,
						title: {
							display: true,
							text: 'Number Of Users'
						}
					}
				},
				plugins: {
					tooltip: {
						intersect: false,
						mode: 'index'
					},
					legend: {
						display: true,
						position: 'top'
					}
				},
				interaction: {
					mode: 'index',
					intersect: false
				}
			}
		};

		if (canvasElement) {
			chartRender(canvasElement, lineData);
		}
	});
</script>

<div class="flex flex-col gap-[20px] p-[22px]">
	<div class="">
		<canvas bind:this={canvasElement} style="width: 100%; height: 200px;"></canvas>
	</div>

	<div class="">
		<ProfileCard />
	</div>

	<div class="">
		<RecentProjects />
	</div>
</div>
