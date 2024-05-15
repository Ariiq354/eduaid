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

  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each data.cpData as cp (cp.id)}
      <a
        class="flex flex-col gap-2 rounded-md bg-primary p-4 text-primary-foreground shadow-md hover:shadow-lg"
        href={`/dashboard/admin/tujuanPembelajaran/${cp.id}`}
      >
        <div class="border-b border-white pb-2">{cp.subject.subjectName}</div>
        <div class="flex h-full w-full flex-col justify-between gap-2">
          <div>{cp.capaianPembelajaran}</div>
          <div class="flex gap-2">
            <Notebook />
            {cp.tp.length}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
