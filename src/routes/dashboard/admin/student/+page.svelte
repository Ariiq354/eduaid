<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { PageData } from './$types';
  import DataTable from './components/data-table.svelte';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Students</h1>
      <p>Manage Students</p>
    </div>
    <Button href="/dashboard/admin/student/new">Add</Button>
  </div>
  <hr />
  <DataTable data={data.student} />
</div>
