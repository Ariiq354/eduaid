<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { PageData } from './$types';
  import DataTable from './components/data-table.svelte';
  import { CirclePlus } from 'lucide-svelte';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">Tujuan Pembelajaran</h1>
    <p>Temukan dan Kelola Tujuan Pembelajaran.</p>
  </div>

  <Button
    href="/dashboard/tujuanPembelajaran/cp/new"
    variant="default"
    class="w-fit gap-3 shadow-lg"
  >
    <CirclePlus class="w-4" />
    Tambah
  </Button>

  <hr />

  <div class="flex flex-wrap">
    {#each data.cpData as cp (cp.cpId)}
      <a
        class="w-1/3 rounded-md px-4 py-6 shadow-md hover:shadow-lg"
        href={`/dashboard/tujuanPembelajaran/${cp.cpId}`}
      >
        <div
          class="mb-2 text-xl font-bold text-slate-800 transition duration-300 ease-in-out hover:text-slate-600"
        >
          <span>{cp.capaianPembelajaran}</span>
        </div>

        <p class="text-base text-gray-700">
          Jumlah Tujuan Pembelajaran:
          <span class="font-semibold text-gray-900">
            {cp.tpCount}
          </span>
        </p>
      </a>
    {/each}
  </div>
</div>
