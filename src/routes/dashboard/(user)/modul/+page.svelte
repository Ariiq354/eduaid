<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { CirclePlus, Pencil, BotMessageSquare } from 'lucide-svelte';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">Modul Pembelajaran</h1>
    <p>Pengaturan Modul Pembelajaran</p>
  </div>

  <Button href="/dashboard/modul/tp/new" variant="default" class="shadow-lg w-fit gap-3">
    <CirclePlus class="w-4"/>
    Tambah
  </Button>

  <hr />

  <div class="flex flex-wrap">
    {#each data.tpData as tp (tp.id)}
      <a class="rounded-md w-1/3 shadow-md hover:shadow-lg px-4 py-6" href={`/dashboard/modul/${tp.id}`}>

          <!-- Title -->
          <div class="font-bold text-xl mb-2 text-slate-800 hover:text-slate-600 transition duration-300 ease-in-out">
            <span>{tp.tujuanPembelajaran}</span>
          </div>

          <!-- Total -->
          <p class="text-gray-700 text-base">
            Jumlah Modul
            <span class="text-gray-900 font-semibold">
              {data.modulData.filter(modulData => modulData.tpId === tp.id).length}
            </span>
          </p>

      </a>
    {/each}
  </div>
</div>
