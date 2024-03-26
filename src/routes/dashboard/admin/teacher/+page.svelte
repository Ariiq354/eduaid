<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { PageData } from './$types';
  import DataTable from './components/data-table.svelte';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Guru</h1>
      <p>Pengaturan Guru</p>
    </div>
    <Button href="/dashboard/admin/teacher/new" variant="outline" class="shadow-lg">Tambah</Button>
  </div>
  <hr />
  <DataTable data={data.user} />
</div>
