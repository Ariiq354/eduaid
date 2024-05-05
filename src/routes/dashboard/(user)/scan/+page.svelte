<script lang="ts">
  import { goto } from '$app/navigation';
  import ImageUpload from '$lib/components/ImageUpload.svelte';
  import * as Form from '$lib/components/ui/form';
  import * as Popover from '$lib/components/ui/popover';
  import * as Command from '$lib/components/ui/command';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { cn, processValues } from '$lib/utils';
  import { Check, ChevronsUpDown, Loader2 } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { formSchema, nilaiSchema } from './schema';
  import { tick } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

  export let data: PageData;

  let loading = false;
  let ans: string;
  let myIndex: string;
  let score: string;

  $: {
    $nilaiFormData.tpId = (data.soalData.find((soal) => (soal.id = ans))?.tpId as string) ?? '';
    $nilaiFormData.studentId = $formData.studentId ?? '';
    $nilaiFormData.nilai = parseInt(score ?? 0);
  }

  const form = superForm(data.imageForm, {
    resetForm: false,
    validators: zodClient(formSchema),

    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Upload link gambar ke DATABASE berhasil!');
        try {
          const response = await fetch(
            `https://useless-anastasie-synexcu.koyeb.app/ocr?q=${$formData.link}&ans=${ans}&questions=5&choices=5`
          );
          if (response.ok) {
            const pydata = await response.json();
            const parsedData = JSON.parse(pydata);

            const { myIndex: processedMyIndex, grading: processedGrading } = processValues(
              parsedData.myIndex,
              parsedData.grading
            );

            myIndex = processedMyIndex;
            score = parsedData.score;
          } else {
            toast.error('Network response was not ok.');
          }
        } catch (error) {
          throw new Error('Error fetching data');
        }
      }
    },

    onError(event) {
      toast.error(event.result.error.message);
    }
  });

  const nilaiForm = superForm(data.nilaiForm, {
    validators: zodClient(nilaiSchema),
    resetForm: false,

    async onUpdate({ form }) {
      if (form.valid) {
        toast.success('Submit success');
        await goto('/dashboard/scan');
      }
    },

    onError(event) {
      toast.error(event.result.error.message);
    }
  });

  let open = false;

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  const { form: formData, enhance, submitting } = form;
  const { form: nilaiFormData, enhance: nilaiEnhance, submitting: nilaiSubmitting } = nilaiForm;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">Scan</h1>
      <p>Form Scan Soal</p>
    </div>
  </div>
  <hr />
  <div class="flex gap-12">
    <form method="POST" action="?/image" class="w-full" use:enhance>
      <Form.Field {form} name="link">
        <Form.Control let:attrs>
          <ImageUpload
            disabled={loading}
            url={$formData.link}
            onChange={(url) => ($formData.link = url)}
            onRemove={() => ($formData.link = '')}
          />
          <input hidden bind:value={$formData.link} name={attrs.name} aria-hidden="true" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="name">
        <Form.Control let:attrs>
          <Form.Label>Deskripsi Gambar</Form.Label>
          <Input {...attrs} bind:value={$formData.name} placeholder="Deskripsi gambar" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="studentId" class="mt-4 flex flex-col gap-1">
        <Popover.Root bind:open let:ids>
          <Form.Control let:attrs>
            <Form.Label>Pilih Siswa</Form.Label>
            <Popover.Trigger
              class={cn(
                buttonVariants({ variant: 'outline' }),
                'w-[300px] justify-between',
                !$formData.studentId && 'text-muted-foreground'
              )}
              role="combobox"
              {...attrs}
            >
              {data.studentData.find((f) => f.studentId === $formData.studentId)?.studentName ??
                'Pilih siswa...'}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Popover.Trigger>
            <input hidden bind:value={$formData.studentId} name={attrs.name} aria-hidden="true" />
          </Form.Control>
          <Popover.Content class="w-[300px] p-0">
            <Command.Root>
              <Command.Input autofocus placeholder="Cari siswa..." class="h-9" />
              <Command.Empty>Siswa belum ada</Command.Empty>
              <Command.Group>
                <ScrollArea class="h-[200px]">
                  {#each data.studentData as student}
                    <Command.Item
                      value={student.studentName}
                      onSelect={() => {
                        $formData.studentId = student.studentId;
                        closeAndFocusTrigger(ids.trigger);
                      }}
                    >
                      {student.studentName}
                      <Check
                        class={cn(
                          'ml-auto h-4 w-4',
                          student.studentId !== $formData.studentId && 'text-transparent'
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

      <div class="space-y-2">
        <Label>Pilih Soal</Label>
        <Select.Root
          onSelectedChange={(v) => {
            v && (ans = String(v.value));
          }}
        >
          <Select.Trigger class="w-full" aria-label="select soal">
            <Select.Value placeholder="Select soal" />
          </Select.Trigger>
          <Select.Content>
            {#each data.soalData as soal}
              <Select.Item value={soal.answer}>
                <div class="truncate">
                  {soal.soal}
                </div>
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <Form.Button disabled={$submitting || $formData.link.length == 0} class="mt-4 w-fit">
        {#if $submitting}
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Submit dan Scan
      </Form.Button>
    </form>
    <div class="w-full">
      <form method="POST" action="?/nilai" class="w-full" use:nilaiEnhance>
        <div class="mb-2 flex flex-col gap-3">
          <Label>Hasil Scan</Label>
          <Input bind:value={myIndex} disabled placeholder="Hasil scan AI" />
          <Label>Kunci Jawaban</Label>
          <Input bind:value={ans} disabled placeholder="Kunci jawaban soal" />
        </div>

        <Form.Field form={nilaiForm} name="tpId">
          <Form.Control let:attrs>
            <input {...attrs} bind:value={$nilaiFormData.tpId} hidden aria-hidden="true" />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={nilaiForm} name="studentId">
          <Form.Control let:attrs>
            <input {...attrs} bind:value={$nilaiFormData.studentId} hidden aria-hidden="true" />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={nilaiForm} name="nilai">
          <Form.Control let:attrs>
            <Form.Label>Nilai Jawaban</Form.Label>
            <Input {...attrs} bind:value={$nilaiFormData.nilai} type="number" />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Button disabled={$nilaiSubmitting} class="mt-4 w-fit">
          {#if $nilaiSubmitting}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {/if}
          Submit nilai
        </Form.Button>
      </form>
      <br />
      <p class="font-sans text-sm italic">
        *Mohon untuk selalu mengecek ulang jika ada hasil yang dianggap salah
      </p>
    </div>
  </div>
</div>
