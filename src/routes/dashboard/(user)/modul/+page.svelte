<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { CirclePlus } from 'lucide-svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">Modul Pembelajaran</h1>
    <p>Pengaturan Modul Pembelajaran</p>
  </div>

  <Button href="/dashboard/modul/tp/new" variant="default" class="w-fit gap-3 shadow-lg">
    <CirclePlus class="w-4" />
    Tambah
  </Button>

  <hr />

  <div class="flex flex-wrap">
    {#each data.modulData as md (md.tpId)}
      <a
        class="w-1/3 rounded-md px-4 py-6 shadow-md hover:shadow-lg"
        href={`/dashboard/modul/${md.tpId}`}
      >
        <!-- Title -->
        <div
          class="mb-2 text-xl font-bold text-slate-800 transition duration-300 ease-in-out hover:text-slate-600"
        >
          <span>{md.tpName}</span>
        </div>

        <!-- Total -->
        <p class="text-base text-gray-700">
          Jumlah Modul
          <span class="font-semibold text-gray-900">
            {md.modulCount}
          </span>
        </p>
      </a>
    {/each}
  </div>
</div>
