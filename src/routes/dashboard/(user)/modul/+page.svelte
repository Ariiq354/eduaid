<script lang="ts">
  import { Notebook } from 'lucide-svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">Modul Pembelajaran</h1>
      <p>Daftar Tujuan Pembelajaran</p>
    </div>
  </div>

  <hr />

  <div class="grid grid-cols-3 gap-4">
    {#each data.tpData as tp (tp.tpId)}
      <a
        class="flex flex-col items-center justify-between gap-2 rounded-md bg-primary p-4 text-primary-foreground shadow-md hover:shadow-lg"
        href={`/dashboard/modul/${tp.tpId}`}
      >
        <div class="w-full border-b border-white pb-2">{tp.subjectName}</div>
        <div class="flex h-full w-full flex-col justify-between gap-2">
          <div>{tp.tpName}</div>
          <div class="flex gap-2">
            <Notebook />
            {tp.modulCount}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
