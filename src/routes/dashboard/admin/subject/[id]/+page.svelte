<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { toast } from 'svelte-sonner';
  import { formSchema } from './schema';
  import { goto } from '$app/navigation';
  import { Loader2 } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(formSchema),

    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Submit succesfull');
        await goto('/dashboard/admin/subject');
      }
    },

    onError(event) {
      toast.error(event.result.error.message);
    }
  });

  const { form: formData, enhance, submitting } = form;

  $: selectedBatch = $formData.batch.toString()
    ? {
        label: $formData.batch.toString(),
        value: $formData.batch.toString()
      }
    : undefined;
</script>

<!-- <SuperDebug data={form.form} /> -->
<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Pelajaran</h1>
      {#if $formData.id}
        <p>Ubah Pelajaran</p>
      {:else}
        <p>Buat Pelajaran</p>
      {/if}
    </div>
    <Button variant="ghost" href="/dashboard/admin/subject">Kembali</Button>
  </div>
  <hr />

  <form method="POST" use:enhance>
    <Form.Field {form} name="id">
      <Form.Control let:attrs>
        <input hidden name={attrs.name} bind:value={$formData.id} />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="subjectName">
      <Form.Control let:attrs>
        <Form.Label>Nama Pelajaran</Form.Label>
        <Input {...attrs} bind:value={$formData.subjectName} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="batch">
      <Form.Control let:attrs>
        <Form.Label>Batch</Form.Label>
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
    <Form.Field {form} name="minimum">
      <Form.Control let:attrs>
        <Form.Label>Nilai batas bawah</Form.Label>
        <Input {...attrs} bind:value={$formData.minimum} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="medium">
      <Form.Control let:attrs>
        <Form.Label>Nilai batas atas</Form.Label>
        <Input {...attrs} type="number" bind:value={$formData.medium} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={$submitting} class="mt-4">
      {#if $submitting}
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
      {/if}
      Submit
    </Form.Button>
  </form>
</div>
