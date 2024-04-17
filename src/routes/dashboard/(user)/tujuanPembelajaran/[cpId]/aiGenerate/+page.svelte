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
import { Loader2 } from 'lucide-svelte';
import { Button } from '$lib/components/ui/button';
import { useChat } from "ai/svelte";
import { page } from '$app/stores';

let currentRoute = $page.url.pathname;

export let data: PageData;

const { messages, handleSubmit, input} = useChat({
    api:currentRoute
});

const form = superForm(data.form, {
    validators: zodClient(formSchema),

    async onUpdate({ form }) {
        if (form.valid) {
            toast.success('Submit succesfull');
            await goto('/dashboard/tujuanPembelajaran');
        }
    },

    onError(event) {
        toast.error(event.result.error.message);
    }
});

const { form: formData, enhance, submitting } = form;

    $: selectedCP = $formData.cpId
    ? {
        label: data.capaianPembelajaran.find((capaianPembelajaran) => capaianPembelajaran.id == $formData.cpId)?.capaianPembelajaran,
        value: $formData.cpId
    }
    : undefined;
</script>


<div class="flex flex-col gap-4">

    <!-- Title -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold">Asisten Ai</h1>
            <p>Buat Tujuan Pembelajaran dengan bantua Ai</p>
        </div>
        <Button variant="ghost" href="/dashboard/tujuanPembelajaran">Kembali</Button>
    </div>

    <!-- Line -->
    <hr />

    <!-- Chat & Input -->
    <div class="flex flex-row gap-4 min-h-">

        <!-- Chat Interface -->
        <div class="flex flex-col justify-between py-8 w-8/12 border rounded-md">

            <!--  Chat -->
            <ul class="flex flex-col py-8 px-4">
                {#each $messages as message}
                    {#if message.role === "user"}
                        <li class="self-end text-right">
                            <div class="font-bold text-primary">{message.role}</div>
                            <div class="px-4 py-2 rounded-l-md rounded-t-md bg-primary text-white max-w-3xl w-full">
                                {message.content}
                            </div>
                        </li>
                    {:else}
                        <li class="self-start text-left">
                            <div class="font-bold text-slate-600">{message.role}</div>
                            <div class="px-4 py-2 rounded-r-md rounded-t-md bg-slate-600 text-white max-w-3xl w-full">
                                {message.content}
                            </div>
                        </li>
                    {/if}
                {/each}
            </ul>

            <!-- Input -->
            <form on:submit={handleSubmit} class="flex gap-4 px-4 w-full">
                <Input bind:value={$input} class="h-full"/>
                <Button type="submit" class="h-full">Send</Button>
            </form>

        </div>

        <!-- Input Interface -->
        <div class="flex flex-col w-4/12 p-8 border rounded-md">
            <form method="POST" use:enhance>
            <Form.Field {form} name="id">
                <Form.Control let:attrs>
                <input hidden name={attrs.name} bind:value={$formData.id} />
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="tujuanPembelajaran">
                <Form.Control let:attrs>
                <Form.Label>Tujuan Pembelajaran</Form.Label>
                <Input {...attrs} bind:value={$formData.tujuanPembelajaran} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="cpId">
                <Form.Control let:attrs>
                <Form.Label>Pelajaran</Form.Label>
                <Select.Root
                    selected={selectedCP}
                    onSelectedChange={(v) => {
                    v && ($formData.cpId = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Pilih CP..." />
                    </Select.Trigger>
                    <Select.Content>
                    {#each data.capaianPembelajaran as capaianPembelajaran}
                        <Select.Item value={capaianPembelajaran.id} label={capaianPembelajaran.capaianPembelajaran} />
                    {/each}
                    </Select.Content>
                </Select.Root>
                <input hidden bind:value={$formData.cpId} name={attrs.name} />
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
    </div>

</div>