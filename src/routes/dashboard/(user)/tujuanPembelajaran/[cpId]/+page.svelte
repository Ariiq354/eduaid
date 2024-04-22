<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { BotMessageSquare, CirclePlus, Pencil, Trash } from 'lucide-svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">{data.tpData?.capaianPembelajaran}</h1>
  </div>

  <div class="flex flex-row gap-4">
    <Button
      href="/dashboard/tujuanPembelajaran/${data.cpId}/new"
      variant="default"
      class="w-fit gap-3 shadow-lg"
    >
      <CirclePlus class="w-4" />
      Tambah
    </Button>
    <Button
      href="/dashboard/tujuanPembelajaran/${data.cpId}/aiGenerate"
      variant="default"
      class="w-fit gap-3 shadow-lg"
    >
      <BotMessageSquare class="w-4" />
      Tambah dengan Ai
    </Button>
  </div>

  <hr />

  <h2 class="text-1xl font-bold">Tujuan Pembelajaran:</h2>

  {#if data.tpData}
    {#each data.tpData.tp as tp (tp.id)}
      <div class="rounded-md bg-neutral-50 p-2 shadow-sm hover:shadow-md">
        <div class="flex w-full flex-row items-center justify-between">
          <p class="">{tp.tujuanPembelajaran}</p>

          <div class="flex flex-row gap-4">
            <Button
              class="w-fit gap-3 shadow-lg"
              href={`/dashboard/tujuanPembelajaran/${data.cpId}/${tp.id}`}
            >
              <Pencil class="w-4" />
              Edit
            </Button>

            <Button class="w-fit gap-3 shadow-lg">
              <Trash class="w-4" />
              Hapus
            </Button>
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
