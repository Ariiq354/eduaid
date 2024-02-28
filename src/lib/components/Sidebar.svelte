<script lang="ts">
	import { GraduationCap, LayoutDashboard, NotebookTabs, ScanEye, Users } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let role: number;
</script>

<div class="z-10 hidden min-h-screen w-72 flex-col bg-white p-4 shadow-xl md:flex">
	<div class="flex items-center gap-2">
		<div class="text-xl font-bold">EduAid</div>
	</div>
	<div class="flex flex-col gap-8 pt-6">
		{#if role === 2}
			<div class="flex flex-col gap-2">
				<div class="font-mono text-sm font-semibold tracking-widest opacity-50">ADMIN</div>
				<div class="flex flex-col gap-2">
					<a
						href="/dashboard/admin/class"
						class:active={$page.url.pathname === '/dashboard/admin/class'}
						class="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-blue-800 hover:text-white"
					>
						<LayoutDashboard size="20" />
						<div class="flex items-center">Class Dashboard</div>
					</a>
					<a
						href="/dashboard/admin/teacher"
						class:active={$page.url.pathname === '/dashboard/admin/teacher'}
						class="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-blue-800 hover:text-white"
					>
						<Users size="20" />
						<div class="flex items-center">Teachers</div>
					</a>
					<a
						href="/dashboard/admin/student"
						class:active={$page.url.pathname === '/dashboard/admin/student'}
						class="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-blue-800 hover:text-white"
					>
						<GraduationCap size="20" />
						<div class="flex items-center">Students</div>
					</a>
				</div>
			</div>
		{/if}
		<div class="flex flex-col gap-2">
			<div class="font-mono text-sm font-semibold tracking-widest opacity-50">User</div>
			<div class="flex flex-col gap-2">
				<a
					href="/dashboard"
					class:active={$page.url.pathname === '/dashboard'}
					class="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-blue-800 hover:text-white"
				>
					<LayoutDashboard size="20" />
					<div class="flex items-center">Score Dashboard</div>
				</a>
				<a
					href="/dashboard/scan"
					class:active={$page.url.pathname === '/dashboard/scan'}
					class="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-blue-800 hover:text-white"
				>
					<ScanEye size="20" />
					<div class="flex items-center">Scan</div>
				</a>
				<a
					href="/dashboard/curriculum"
					class:active={$page.url.pathname === '/dashboard/curriculum'}
					class="flex items-center gap-2 rounded-md p-2 transition-colors duration-300 hover:bg-blue-800 hover:text-white"
				>
					<NotebookTabs size="20" />
					<div class="flex items-center">Curriculum</div>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.active {
		background-color: rgb(30 64 175);
		color: rgb(255 255 255);
	}
</style>
