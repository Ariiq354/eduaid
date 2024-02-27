<script lang="ts">
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';
</script>

<div class="flex w-full justify-end bg-white p-4 shadow-lg">
	<form method="post" action="/register?/logout" use:enhance>
		<Button variant="ghost" type="submit">Sign out</Button>
	</form>
</div>
