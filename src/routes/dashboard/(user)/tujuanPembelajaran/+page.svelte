<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { BotMessageSquare, Notebook, Plus } from 'lucide-svelte';
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
        <div>{cp.capaianPembelajaran}</div>
        <div class="flex gap-2">
          <Notebook />
          {cp.tpCount}
        </div>
      </a>
    {/each}
  </div>
</div>
