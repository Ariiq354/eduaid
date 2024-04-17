<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { CirclePlus, Pencil, BotMessageSquare } from 'lucide-svelte';
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;

    const cpId = $page.params.cpId
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold">{data.tpData.find(tp => tp.cpId === cpId)?.cp?.capaianPembelajaran || 'Capaian pembelajaran not found'}</h1>
    </div>
    
    <div class="flex flex-row gap-4">
        <Button href="/dashboard/tujuanPembelajaran/${cpId}/new" variant="default" class="shadow-lg w-fit gap-3">
            <CirclePlus class="w-4"/>
            Tambah
        </Button>
        <Button href="/dashboard/tujuanPembelajaran/${cpId}/aiGenerate" variant="default" class="shadow-lg w-fit gap-3">
            <BotMessageSquare class="w-4"/>
            Tambah dengan Ai
        </Button>
    </div>

    <hr />

    <h2 class="font-bold text-1xl">Tujuan Pembelajaran: </h2>

    {#each data.tpData as tp (tp.id)}

        {#if tp.cpId === cpId}
            <div class="bg-neutral-50 p-2 rounded-md shadow-sm hover:shadow-md">
                <div class="flex flex-row justify-between w-full items-center">
                    <p class="">{tp.tujuanPembelajaran}</p>

                    <Button class="shadow-lg w-fit gap-3" href={`/dashboard/tujuanPembelajaran/${cpId}/${tp.id}`}>
                        <Pencil class="w-4"/>
                        Edit
                    </Button>
                </div>
            </div>
        {/if}

    {/each}

</div>