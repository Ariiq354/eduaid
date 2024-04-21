<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { CirclePlus, Pencil, BotMessageSquare } from 'lucide-svelte';
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;

    const tpId = $page.params.tpId
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold">{data.modulData.find(modul => modul.tpId === tpId)?.tp?.tujuanPembelajaran || 'Capaian pembelajaran not found'}</h1>
    </div>
    
    <div class="flex flex-row gap-4">
        <Button href="/dashboard/modul/${tpId}/new" variant="default" class="shadow-lg w-fit gap-3">
            <CirclePlus class="w-4"/>
            Tambah
        </Button>
        <Button href="/dashboard/modul/${tpId}/aiGenerate" variant="default" class="shadow-lg w-fit gap-3">
            <BotMessageSquare class="w-4"/>
            Tambah dengan Ai
        </Button>
    </div>

    <hr />

    <h2 class="font-bold text-1xl">Modul: </h2>

    {#each data.modulData as modul (modul.id)}

        {#if modul.tpId === tpId}
            <div class="bg-neutral-50 p-2 rounded-md shadow-sm hover:shadow-md">
                <div class="flex flex-row justify-between w-full items-center">
                    <p class="">{modul.modul}</p>

                    <Button class="shadow-lg w-fit gap-3" href={`/dashboard/modul/${tpId}/${modul.id}`}>
                        <Pencil class="w-4"/>
                        Edit
                    </Button>
                </div>
            </div>
        {/if}

    {/each}

</div>