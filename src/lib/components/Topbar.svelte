<script lang="ts">
  import Button from './ui/button/button.svelte';
  import { enhance } from '$app/forms';
  import { LogOut } from 'lucide-svelte';
</script>

<div class="flex w-full justify-end bg-white p-4 shadow-lg">
  <form method="post" action="/?/logout" use:enhance>
    <Button class="flex items-center gap-2" variant="ghost" type="submit">
      <LogOut size="18" />
      Logout
    </Button>
  </form>
</div>
