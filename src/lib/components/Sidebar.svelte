<script lang="ts">
  import { page } from '$app/stores';
  import { AdminItem, UserItem } from '$lib/components/SidebarItem';
  import { cn } from '$lib/utils';

  export let role: number;
  export let status: number;
</script>

<div
  class="sticky left-0 top-0 z-10 hidden h-screen w-72 flex-col border-r-2 bg-primary/15 shadow-xl md:flex"
>
  <!-- Logo -->
  <div class=" flex w-full items-center gap-2 border-b-2 px-4 py-6">
    <div class="flex items-center justify-center gap-2">
      <img src="/Logo.svg" class="h-6 w-auto" alt="logo svg" width="200" height="200" />
      <img src="/Text.svg" class="h-6 w-auto" alt="logo svg" width="719" height="134" />
    </div>
  </div>

  {#if status === 2}
    <div class="flex flex-col gap-8 p-4">
      <!-- Admin -->
      {#if role === 2}
        <div class="flex flex-col gap-2">
          <div class="text-xs font-medium uppercase tracking-wider text-gray-500">admin</div>
          <div class="flex flex-col gap-2">
            {#each AdminItem as item}
              <a
                href={item.href}
                class={cn(
                  $page.url.pathname == item.href
                    ? 'bg-primary/20 text-foreground'
                    : 'text-gray-500',
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 hover:text-foreground'
                )}
              >
                <svelte:component this={item.logo} size="20" />
                <div class="flex items-center">{item.label}</div>
              </a>
            {/each}
          </div>
        </div>
      {/if}

      <!-- User/Teacher -->
      <div class="flex flex-col gap-2">
        <div class="text-xs font-medium uppercase tracking-wider text-gray-500">user</div>
        <div class="flex flex-col gap-2">
          {#each UserItem as item}
            <a
              href={item.href}
              class={cn(
                $page.url.pathname == item.href ? 'bg-primary/20 text-foreground' : 'text-gray-500',
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 hover:text-foreground'
              )}
            >
              <svelte:component this={item.logo} size="20" />
              <div class="flex items-center">{item.label}</div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
