<script lang="ts">
  import type { PageData } from './$types';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { formSchema } from './schema';
  import { goto } from '$app/navigation';
  import { ArrowLeft, Loader2 } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { useChat } from 'ai/svelte';
  import { page } from '$app/stores';
  import { Textarea } from '$lib/components/ui/textarea';
  import { ScrollArea } from '$lib/components/ui/scroll-area';

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
        await goto(`/dashboard/admin/tujuanPembelajaran/${data.cpId}`);
      }
    },

    onError(event) {
      toast.error(event.result.error.message);
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

{#if data.cp}
  <div class="flex flex-col gap-4">
    <!-- Title -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold">Asisten AI</h1>
        <p>Buat Tujuan Pembelajaran Anda dengan bantuan AI</p>
      </div>
      <Button
        variant="outline"
        href={`/dashboard/admin/tujuanPembelajaran/${data.cpId}`}
        class="p-2 shadow-lg"
      >
        <ArrowLeft />
      </Button>
    </div>

    <!-- Line -->
    <hr />

    <div class="text-muted-primary rounded-md border bg-primary/20 px-4 py-2 shadow-md">
      Capaian Pembelajaran: {data.cp.capaianPembelajaran}
    </div>

    <!-- Chat & Input -->
    <div class="flex h-[480px] flex-row gap-4">
      <!-- Chat Interface -->
      <div class="flex w-8/12 flex-col justify-between rounded-md border shadow-md">
        <!--  Chat -->
        <ScrollArea>
          <ul class="flex flex-col gap-2 p-4">
            <li class="self-start text-left">
              <div class="font-bold text-foreground">Asisten Ai</div>
              <div
                class="mt-2 w-full max-w-3xl rounded-r-lg rounded-t-lg bg-primary/20 px-4 py-2 text-foreground"
              >
                Halo, saya Edu Ai. Saya akan membantu Anda membuat Tujuan Pembelajaran. Berikan saja
                Capaian Pembelajaran yang ingin Anda pilih, dan saya akan menghasilkan daftar saran
                untuk Anda.
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
      <div class="flex w-4/12 flex-col rounded-md border p-4 shadow-md">
        <form method="POST" use:enhance>
          <Form.Field {form} name="id">
            <Form.Control let:attrs>
              <input hidden name={attrs.name} bind:value={$formData.id} />
            </Form.Control>
          </Form.Field>

          <Form.Field {form} name="tujuanPembelajaran">
            <Form.Control let:attrs>
              <Form.Label>Tujuan Pembelajaran</Form.Label>
              <Textarea rows={10} {...attrs} bind:value={$formData.tujuanPembelajaran} />
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
    </div>
  </div>
{/if}
