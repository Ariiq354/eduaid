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
  import { tick } from 'svelte';
  import { cn } from '$lib/utils';

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(formSchema),

    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Submit succesfull');
        await goto('/dashboard/admin/capaianPembelajaran');
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
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">Capaian Pembelajaran</h1>
      {#if $formData.id}
        <p>Form Edit Capaian Pembelajaran</p>
      {:else}
        <p>Form Buat Capaian Pembelajaran</p>
      {/if}
    </div>
    <Button variant="outline" href="/dashboard/admin/capaianPembelajaran" class="p-2 shadow-lg">
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
    <Form.Field {form} name="capaianPembelajaran">
      <Form.Control let:attrs>
        <Form.Label>Capaian Pembelajaran</Form.Label>
        <Input {...attrs} bind:value={$formData.capaianPembelajaran} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="subjectId" class="mt-4 flex flex-col gap-1">
      <Popover.Root bind:open let:ids>
        <Form.Control let:attrs>
          <Form.Label>Pelajaran</Form.Label>
          <Popover.Trigger
            class={cn(
              buttonVariants({ variant: 'outline' }),
              'w-[500px] justify-between',
              !$formData.subjectId && 'text-muted-foreground'
            )}
            role="combobox"
            {...attrs}
          >
            {data.subject.find((f) => f.id === $formData.subjectId)?.subjectName ??
              'Pilih Pelajaran...'}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Popover.Trigger>
          <input hidden bind:value={$formData.subjectId} name={attrs.name} />
        </Form.Control>
        <Popover.Content class="w-[500px] p-0">
          <Command.Root>
            <Command.Input autofocus placeholder="Cari pelajaran..." class="h-9" />
            <Command.Empty>Pelajaran belum ada</Command.Empty>
            <Command.Group>
              {#each data.subject as subject}
                <Command.Item
                  value={subject.subjectName}
                  onSelect={() => {
                    $formData.subjectId = subject.id;
                    closeAndFocusTrigger(ids.trigger);
                  }}
                >
                  {subject.subjectName + ' Fase ' + subject.phase}
                  <Check
                    class={cn(
                      'ml-auto h-4 w-4',
                      subject.id !== $formData.subjectId && 'text-transparent'
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
