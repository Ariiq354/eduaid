<script lang="ts">
  import { Notebook } from 'lucide-svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">Tujuan Pembelajaran</h1>
      <p>Daftar Capaian Pembelajaran</p>
    </div>
  </div>

  <hr />

  <div class="grid grid-cols-3 gap-4">
    {#each data.cpData as cp (cp.cpId)}
      <a
        class="flex w-full items-center justify-between rounded-md bg-primary p-4 text-primary-foreground shadow-md hover:shadow-lg"
        href={`/dashboard/tujuanPembelajaran/${cp.cpId}`}
      >
        <div class="border-b border-white pb-2">{cp.subjectName}</div>
        <div class="flex h-full w-full flex-col justify-between gap-2">
          <div>{cp.capaianPembelajaran}</div>
          <div class="flex gap-2">
            <Notebook />
            {cp.tpCount}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
