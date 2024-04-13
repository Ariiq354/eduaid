<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { PageData } from './$types';
  import DataTable from './components/data-table.svelte';
  import { CirclePlus } from 'lucide-svelte';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">Modul Pembelajaran</h1>
    <p>Pengaturan Modul Pembelajaran</p>
  </div>

  <Button href="/dashboard/modul/new" variant="default" class="shadow-lg w-fit gap-3">
    <CirclePlus class="w-4"/>
    Tambah
  </Button>

  <hr />
  <DataTable data={data.modulData} />
</div>
