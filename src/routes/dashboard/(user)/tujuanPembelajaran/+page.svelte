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

    <Button href="/dashboard/tujuanPembelajaran/cp/new" variant="default" class="shadow-lg w-fit gap-3">
      <CirclePlus class="w-4"/>
      Tambah
    </Button>

    <hr />

    <div class="flex flex-wrap">
      {#each data.cpData as cp (cp.id)}
        <a class="max-w-sm rounded overflow-hidden shadow-lg my-4 mx-auto" href={`/dashboard/tujuanPembelajaran/${cp.id}`}>
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-slate-800 hover:text-slate-600 transition duration-300 ease-in-out">
              <span>{cp.capaianPembelajaran}</span>
            </div>
            <p class="text-gray-700 text-base">
              Jumlah Tujuan Pembelajaran: 
              <span class="text-gray-900 font-semibold">
                {data.tpData.filter(tp => tp.cpId === cp.id).length}
              </span>
            </p>
          </div>
        </a>
      {/each}
    </div>

  </div>