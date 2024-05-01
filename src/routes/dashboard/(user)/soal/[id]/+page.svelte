<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import * as Select from '$lib/components/ui/select';
  import { Textarea } from '$lib/components/ui/textarea';
  import { useChat } from 'ai/svelte';
  import { ArrowLeft, Loader2 } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { formSchema } from './schema';

  let currentRoute = $page.url.pathname;

  export let data: PageData;

  const { messages, handleSubmit, input } = useChat({
    api: currentRoute
  });

  const form = superForm(data.form, {
    validators: zodClient(formSchema),

    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Submit sukses');
        await goto(`/dashboard/soal`);
      }
    },

    onError(event) {
      toast.error(event.result.error.message);
    }
  });

  const { form: formData, enhance, submitting } = form;
  $: selectedTp = $formData.tpId
    ? {
        label: data.tp.find((tp) => tp.id == $formData.tpId)?.tujuanPembelajaran,
        value: $formData.tpId
      }
    : undefined;
</script>

<div class="flex flex-col gap-4">
  <!-- Title -->
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">Asisten AI</h1>
      <p>Buat Soal Anda dengan bantuan AI</p>
    </div>
    <Button variant="outline" href={`/dashboard/soal`} class="p-2 shadow-lg">
      <ArrowLeft />
    </Button>
  </div>

  <!-- Line -->
  <hr />

  <div class="text-muted-primary rounded-md border bg-primary/20 px-4 py-2 shadow-md">
    Soal dan jawaban maksimal 5 untuk setiap Tujuan Pembelajaran
  </div>

  <!-- Chat & Input -->
  <div class="flex h-[480px] flex-row gap-4">
    <!-- Chat Interface -->
    <div class="flex w-8/12 flex-col justify-between rounded-md border shadow-md">
      <!--  Chat -->
      <ScrollArea>
        <ul class="flex flex-col gap-2 overflow-y-auto p-4">
          <li class="self-start text-left">
            <div class="font-bold text-foreground">Asisten Ai</div>
            <div
              class="mt-2 w-full max-w-3xl rounded-r-lg rounded-t-lg bg-primary/20 px-4 py-2 text-foreground"
            >
              Halo, saya Edu Ai. Saya akan membantu Anda membuat Soal. Berikan saja Tujuan
              Pembelajaran yang ingin Anda pilih, dan saya akan menghasilkan daftar saran untuk
              Anda.
            </div>
          </li>

          {#each $messages as message}
            {#if message.role === 'user'}
              <li class="self-end text-right">
                <div class="font-bold text-primary">User</div>
                <div
                  class="mt-2 w-full max-w-3xl rounded-l-lg rounded-t-lg bg-primary px-4 py-2 text-primary-foreground"
                >
                  {message.content}
                </div>
              </li>
            {:else}
              <li class="self-start text-left">
                <div class="font-bold text-foreground">Asisten Ai</div>
                <div
                  class="mt-2 w-full max-w-3xl rounded-r-lg rounded-t-lg bg-primary/20 px-4 py-2 text-foreground"
                >
                  {message.content}
                </div>
              </li>
            {/if}
          {/each}
        </ul>
      </ScrollArea>

      <!-- Input -->
      <form
        on:submit={handleSubmit}
        class="sticky bottom-0 flex w-full gap-4 rounded-b-md border-t bg-background p-4"
      >
        <Input bind:value={$input} class="h-full" />
        <Button type="submit" class="h-full">Kirim</Button>
      </form>
    </div>

    <!-- Input Interface -->
    <div class="w-4/12 rounded-md border p-4 shadow-md">
      <form method="POST" class="flex h-full flex-col justify-between" use:enhance>
        <div>
          <Form.Field {form} name="id">
            <Form.Control let:attrs>
              <input hidden name={attrs.name} bind:value={$formData.id} />
            </Form.Control>
          </Form.Field>

          <Form.Field {form} name="soal">
            <Form.Control let:attrs>
              <Form.Label>Soal</Form.Label>
              <Textarea rows={8} {...attrs} class="resize-none" bind:value={$formData.soal} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="answer">
            <Form.Control let:attrs>
              <Form.Label>Jawaban</Form.Label>
              <Input
                {...attrs}
                bind:value={$formData.answer}
                placeholder="Masukkan jawaban dengan format: A B C B D"
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="tpId">
            <Form.Control let:attrs>
              <Form.Label>Tujuan Pembelajaran</Form.Label>
              <Select.Root
                selected={selectedTp}
                onSelectedChange={(v) => {
                  v && ($formData.tpId = v.value);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Pilih tujuan pembelajaran" />
                </Select.Trigger>
                <Select.Content>
                  {#each data.tp as tp (tp.id)}
                    <Select.Item value={tp.id} label={tp.tujuanPembelajaran} />
                  {/each}
                </Select.Content>
              </Select.Root>
              <input hidden bind:value={$formData.tpId} name={attrs.name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>

        <Form.Button disabled={$submitting} class="mt-4 w-fit">
          {#if $submitting}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {/if}
          Submit
        </Form.Button>
      </form>
    </div>
  </div>
</div>
