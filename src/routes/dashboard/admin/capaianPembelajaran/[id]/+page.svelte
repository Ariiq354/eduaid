<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import * as Combobox from '$lib/components/ui/combobox';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { ArrowLeft, Loader2 } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { formSchema } from './schema';

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

  // Combobox
  let inputValue = '';
  let touchedInput = false;

  $: filteredItems =
    inputValue && touchedInput
      ? data.subject.filter((i) => i.subjectName.toLowerCase().includes(inputValue.toLowerCase()))
      : data.subject;
  $: selectedSubject = $formData.subjectId
    ? {
        label: data.subject.find((i) => i.id == $formData.subjectId)?.subjectName,
        value: $formData.subjectId
      }
    : undefined;
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
      <Form.Control let:attrs>
        <Form.Label>Pelajaran</Form.Label>
        <Combobox.Root
          selected={selectedSubject}
          onSelectedChange={(v) => {
            v && ($formData.subjectId = v.value);
          }}
          bind:inputValue
          bind:touchedInput
        >
          <div class="relative">
            <Combobox.Input placeholder="Search subject" />
          </div>

          <Combobox.Content>
            {#each filteredItems as item (item.id)}
              <Combobox.Item value={item.id} label={item.subjectName}>
                {item.subjectName}
              </Combobox.Item>
            {:else}
              <span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
            {/each}
          </Combobox.Content>
        </Combobox.Root>
        <input hidden bind:value={$formData.subjectId} name={attrs.name} />
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
