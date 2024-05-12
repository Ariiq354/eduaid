<script lang="ts">
  import { enhance } from '$app/forms';
  import { LogOut, Moon, Sun } from 'lucide-svelte';
  import * as Tooltip from './ui/tooltip';
  import Button from './ui/button/button.svelte';
  import { toggleMode } from 'mode-watcher';
</script>

<div class="sticky top-0 z-10 border-b-2 bg-background">
  <div class="z-20 flex h-full w-full justify-end gap-4 bg-primary/15 p-4">
    <Button on:click={toggleMode} variant="outline" size="icon" aria-label="toogle mode">
      <Sun class="scale-100 dark:scale-0" />
      <Moon class="absolute scale-0  dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <form method="post" action="/?/logout" use:enhance>
      <Button
        class="group flex h-10 items-center rounded-md border bg-background p-2 text-foreground hover:text-background"
        type="submit"
        size="icon"
        aria-label="logout"
      >
        <Tooltip.Root>
          <Tooltip.Trigger>
            <LogOut />
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>Log Out</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </Button>
    </form>
  </div>
</div>
