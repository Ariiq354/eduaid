<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import * as Combobox from '$lib/components/ui/combobox';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import { ArrowLeft, Loader2 } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { formSchema } from './schema';

  // Form
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

  // Select
  $: selectedBatch = $formData.batch
    ? {
        label: $formData.batch.toString(),
        value: $formData.batch.toString()
      }
    : undefined;

  // Combobox
  let inputValue = '';
  let touchedInput = false;

  $: filteredItems =
    inputValue && touchedInput
      ? data.teacher.filter((i) => i.username.toLowerCase().includes(inputValue.toLowerCase()))
      : data.teacher;
  $: selectedTeacher = $formData.userId
    ? {
        label: data.teacher.find((i) => i.id == $formData.userId)?.username,
        value: $formData.userId
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
      <Form.Control let:attrs>
        <Form.Label>Wali Kelas</Form.Label>
        <Combobox.Root
          selected={selectedTeacher}
          onSelectedChange={(v) => {
            v && ($formData.userId = v.value);
          }}
          bind:inputValue
          bind:touchedInput
        >
          <div class="relative">
            <Combobox.Input placeholder="Search teacher" />
          </div>

          <Combobox.Content>
            {#each filteredItems as item (item.id)}
              <Combobox.Item value={item.id} label={item.username}>
                {item.username}
              </Combobox.Item>
            {:else}
              <span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
            {/each}
          </Combobox.Content>
        </Combobox.Root>
        <input hidden bind:value={$formData.userId} name={attrs.name} />
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
