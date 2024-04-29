<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { ArrowLeft, BotMessageSquare, Plus } from 'lucide-svelte';
  import type { PageData } from './$types';
  import DataTable from './components/data-table.svelte';

  export let data: PageData;
</script>

{#if data.cp}
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold">Tujuan Pembelajaran</h1>
        <p>Tabel Daftar Tujuan Pembelajaran</p>
      </div>
      <div class="flex flex-row gap-4">
        <Button variant="outline" href="/dashboard/tujuanPembelajaran" class="p-2 shadow-lg">
          <ArrowLeft />
        </Button>
        <Button
          href={`/dashboard/tujuanPembelajaran/${data.cpId}/new`}
          variant="outline"
          class="p-2 shadow-lg"
        >
          <Plus />
        </Button>
      </div>
    </div>

    <hr />

    <div class="text-muted-primary rounded-md border bg-primary/20 px-4 py-2 shadow-md">
      Capaian Pembelajaran: {data.cp.capaianPembelajaran}
    </div>
    <DataTable data={data.tpData} cpId={data.cpId} />
  </div>
{/if}
