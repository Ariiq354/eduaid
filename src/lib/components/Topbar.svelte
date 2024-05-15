<script lang="ts">
  import { enhance } from '$app/forms';
  import { LogOut, Menu, Moon, Sun } from 'lucide-svelte';
  import * as Tooltip from './ui/tooltip';
  import * as Sheet from '$lib/components/ui/sheet';
  import * as Accordion from '$lib/components/ui/accordion';
  import Button from './ui/button/button.svelte';
  import { toggleMode } from 'mode-watcher';
  import { AdminItem, UserItem } from './SidebarItem';
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';

  let isOpen = false;
  export let role: number;
  export let status: number;
</script>

<div class="sticky top-0 z-10 border-b-2 bg-background">
  <div class="z-20 flex h-full w-full flex-row-reverse justify-between bg-primary/15 p-4">
    <div class="flex gap-4">
      <Button on:click={toggleMode} variant="outline" size="icon" aria-label="toogle mode">
        <Sun class="scale-100 dark:scale-0" />
        <Moon class="absolute scale-0  dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <form method="post" action="/?/logout" use:enhance>
        <Button variant="outline" type="submit" size="icon" aria-label="logout">
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
    {#if status === 2}
      <!-- content here -->
      <Sheet.Root open={isOpen} onOpenChange={(open) => (isOpen = open)}>
        <Sheet.Trigger class="block md:hidden">
          <Button size="icon" variant="outline" aria-label="Toogle menu">
            <Menu />
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left">
          <Sheet.Header>
            <Sheet.Title class="text-start">EduAid | Menu</Sheet.Title>
            <hr />
          </Sheet.Header>
          <div class="py-4">
            <div class="flex flex-col">
              <Accordion.Root>
                <div class="flex flex-col">
                  {#if role === 2}
                    <Accordion.Item value="item-1">
                      <Accordion.Trigger class="py-2 text-gray-500 hover:text-foreground">
                        Admin
                      </Accordion.Trigger>
                      {#each AdminItem as item}
                        <div class="pl-4">
                          <Accordion.Content>
                            <a
                              href={item.href}
                              class={cn(
                                $page.url.pathname == item.href
                                  ? 'text-foregorund'
                                  : 'text-gray-500',
                                'font-medium hover:text-foreground'
                              )}
                              on:click={() => (isOpen = false)}
                            >
                              {item.label}
                            </a>
                          </Accordion.Content>
                        </div>
                      {/each}
                    </Accordion.Item>
                  {/if}
                  <Accordion.Item value="item-2">
                    <Accordion.Trigger class="py-2 text-gray-500 hover:text-foreground">
                      User
                    </Accordion.Trigger>
                    {#each UserItem as item}
                      <div class="pl-4">
                        <Accordion.Content>
                          <a
                            href={item.href}
                            class={cn(
                              $page.url.pathname == item.href ? 'text-foregorund' : 'text-gray-500',
                              'font-medium hover:text-foreground'
                            )}
                            on:click={() => (isOpen = false)}
                          >
                            {item.label}
                          </a>
                        </Accordion.Content>
                      </div>
                    {/each}
                  </Accordion.Item>
                </div>
              </Accordion.Root>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Root>
    {/if}
  </div>
</div>
