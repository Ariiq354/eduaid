<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Popover from '$lib/components/ui/popover';
  import * as Command from '$lib/components/ui/command';
  import * as Combobox from '$lib/components/ui/combobox';
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

  let inputValue = '';
  let touchedInput = false;

  $: filteredItems =
    inputValue && touchedInput
      ? data.tpData.filter((i) => i.tpName.toLowerCase().includes(inputValue.toLowerCase()))
      : data.tpData;
  $: selectedTp = $formData.tpId
    ? {
        label: data.tpData.find((i) => i.tpId == $formData.tpId)?.tpName,
        value: $formData.tpId
      }
    : undefined;
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
        <Form.Control let:attrs>
          <Form.Label>Tujuan Pembelajaran</Form.Label>
          <Combobox.Root
            selected={selectedTp}
            onSelectedChange={(v) => {
              v && ($formData.tpId = v.value);
            }}
            bind:inputValue
            bind:touchedInput
          >
            <div class="relative">
              <Combobox.Input placeholder="Search tujuan pembelajaran" />
            </div>

            <Combobox.Content class="max-h-40 overflow-auto">
              {#each filteredItems as item (item.tpId)}
                <Combobox.Item value={item.tpId} label={item.tpName}>
                  {item.tpName}
                </Combobox.Item>
              {:else}
                <span class="block px-5 py-2 text-sm text-muted-foreground">
                  No results found
                </span>
              {/each}
            </Combobox.Content>
          </Combobox.Root>
          <input hidden bind:value={$formData.tpId} name={attrs.name} />
        </Form.Control>
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
