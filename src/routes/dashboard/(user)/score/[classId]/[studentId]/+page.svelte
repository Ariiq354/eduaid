<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from '$lib/components/ui/button';
  import DataTable from './components/data-table.svelte';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Nilai</h1>
      <p>Daftar Nilai</p>
    </div>
    <Button
      href={`/dashboard/score/${data.classId}/${data.studentId}/new`}
      variant="outline"
      class="shadow-lg"
    >
      Tambah
    </Button>
  </div>
  <hr />
  <DataTable data={data.scoreData} />
</div>
