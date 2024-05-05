<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import * as Popover from '$lib/components/ui/popover';
  import * as Command from '$lib/components/ui/command';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { toast } from 'svelte-sonner';
  import { formSchema } from './schema';
  import { goto } from '$app/navigation';
  import { ArrowLeft, Check, ChevronsUpDown, Loader2 } from 'lucide-svelte';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import { tick } from 'svelte';

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Submit berhasil');
        await goto('/dashboard/admin/class');
      }
    },
    onError(event) {
      toast.error(event.result.error.message);
    }
  });
  const { form: formData, enhance, submitting } = form;

  let open = false;

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  $: selectedBatch = $formData.batch.toString()
    ? {
        label: $formData.batch.toString(),
        value: $formData.batch.toString()
      }
    : undefined;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">Kelas</h1>
      {#if $formData.id}
        <p>Form Edit Kelas</p>
      {:else}
        <p>Form Buat Kelas</p>
      {/if}
    </div>
    <Button variant="outline" href="/dashboard/admin/class" class="p-2 shadow-lg">
      <ArrowLeft />
    </Button>
  </div>
  <hr />

  <form method="POST" use:enhance>
    <Form.Field {form} name="id">
      <Form.Control let:attrs>
        <input hidden name={attrs.name} bind:value={$formData.id} />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="classname">
      <Form.Control let:attrs>
        <Form.Label>Nama Kelas</Form.Label>
        <Input {...attrs} bind:value={$formData.classname} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="batch">
      <Form.Control let:attrs>
        <Form.Label>Tingkat Kelas</Form.Label>
        <Select.Root
          selected={selectedBatch}
          onSelectedChange={(v) => {
            v && ($formData.batch = parseInt(v.value));
          }}
        >
          <Select.Trigger {...attrs}>
            <Select.Value placeholder="Select batch" />
          </Select.Trigger>
          <Select.Content>
            {#each Array(6)
              .fill(undefined)
              .map((_, i) => i + 1) as num}
              <Select.Item value={num} label={num.toString()} />
            {/each}
          </Select.Content>
        </Select.Root>
        <input hidden bind:value={$formData.batch} name={attrs.name} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="userId" class="relative mt-4 flex flex-col gap-1">
      <Popover.Root bind:open let:ids>
        <Form.Control let:attrs>
          <Form.Label>Wali Kelas</Form.Label>
          <Popover.Trigger
            class={cn(
              buttonVariants({ variant: 'outline' }),
              'w-[200px] justify-between',
              !$formData.userId && 'text-muted-foreground'
            )}
            role="combobox"
            {...attrs}
          >
            {data.teacher.find((f) => f.id === $formData.userId)?.username ?? 'Pilih Wali Kelas...'}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Popover.Trigger>
          <input hidden bind:value={$formData.userId} name={attrs.name} />
        </Form.Control>
        <Popover.Content class="w-[200px] p-0">
          <Command.Root>
            <Command.Input autofocus placeholder="Cari guru..." class="h-9" />
            <Command.Empty>Guru belum ada</Command.Empty>
            <Command.Group>
              {#each data.teacher as teacher}
                <Command.Item
                  value={teacher.username}
                  onSelect={() => {
                    $formData.userId = teacher.id;
                    closeAndFocusTrigger(ids.trigger);
                  }}
                >
                  {teacher.username}
                  <Check
                    class={cn(
                      'ml-auto h-4 w-4',
                      teacher.id !== $formData.userId && 'text-transparent'
                    )}
                  />
                </Command.Item>
              {/each}
            </Command.Group>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Button disabled={$submitting} class="mt-4">
      {#if $submitting}
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
      {/if}
      Simpan
    </Form.Button>
  </form>
</div>
