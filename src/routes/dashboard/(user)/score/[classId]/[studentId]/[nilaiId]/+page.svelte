<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
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
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(formSchema),

    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Submit berhasil');
        await goto(`/dashboard/score/${data.classId}/${data.studentId}`);
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

{#if data.student}
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold">Nilai</h1>
        {#if $formData.id}
          <p>Form Edit Nilai</p>
        {:else}
          <p>Form Buat Nilai</p>
        {/if}
      </div>
      <Button
        variant="outline"
        href={`/dashboard/score/${data.classId}/${data.studentId}`}
        class="p-2 shadow-lg"
      >
        <ArrowLeft />
      </Button>
    </div>
    <hr />

    <div class="text-muted-primary rounded-md border bg-primary/20 px-4 py-2 shadow-md">
      Nama Siswa: {data.student.studentName}
    </div>

    <form method="POST" use:enhance>
      <Form.Field {form} name="id">
        <Form.Control let:attrs>
          <input hidden name={attrs.name} bind:value={$formData.id} />
        </Form.Control>
      </Form.Field>
      <Form.Field {form} name="nilai">
        <Form.Control let:attrs>
          <Form.Label>Nilai (1 - 100)</Form.Label>
          <Input {...attrs} bind:value={$formData.nilai} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="tpId" class="mt-4 flex flex-col gap-1">
        <Popover.Root bind:open let:ids>
          <Form.Control let:attrs>
            <Form.Label>Tujuan Pembelajaran</Form.Label>
            <Popover.Trigger
              class={cn(
                buttonVariants({ variant: 'outline' }),
                'w-[500px] justify-between',
                !$formData.tpId && 'text-muted-foreground'
              )}
              role="combobox"
              {...attrs}
            >
              {data.tpData.find((f) => f.tpId === $formData.tpId)?.tpName ??
                'Pilih Tujuan Pembelajaran...'}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Popover.Trigger>
            <input hidden bind:value={$formData.tpId} name={attrs.name} />
          </Form.Control>
          <Popover.Content class="w-[500px] p-0">
            <Command.Root>
              <Command.Input autofocus placeholder="Cari tujuan pembelajaran..." class="h-9" />
              <Command.Empty>Tujuan pembelajaran belum ada</Command.Empty>
              <Command.Group>
                <ScrollArea class="h-[200px]">
                  {#each data.tpData as tp}
                    <Command.Item
                      value={tp.tpName}
                      onSelect={() => {
                        $formData.tpId = tp.tpId;
                        closeAndFocusTrigger(ids.trigger);
                      }}
                    >
                      {tp.tpName}
                      <Check
                        class={cn(
                          'ml-auto h-4 w-4',
                          tp.tpId !== $formData.tpId && 'text-transparent'
                        )}
                      />
                    </Command.Item>
                  {/each}
                </ScrollArea>
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
{/if}
