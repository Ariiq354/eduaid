<script lang="ts">
  import { Combobox as ComboboxPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';
  import { ArrowUpDown } from 'lucide-svelte';

  type $$Props = ComboboxPrimitive.InputProps;
  type $$Events = ComboboxPrimitive.InputEvents;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<ComboboxPrimitive.Input
  class={cn(
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    className
  )}
  {...$$restProps}
  let:builder
  on:click
  on:keydown
>
  <slot {builder} />
</ComboboxPrimitive.Input>
