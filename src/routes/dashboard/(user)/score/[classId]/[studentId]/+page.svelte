<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from '$lib/components/ui/button';
  import DataTable from './components/data-table.svelte';
  import { ArrowLeft, Plus } from 'lucide-svelte';

  export let data: PageData;
</script>

{#if data.student}
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold">Nilai</h1>
        <p>Tabel Daftar Nilai</p>
      </div>
      <div class="flex gap-4">
        <Button variant="outline" href={`/dashboard/score/${data.classId}`} class="p-2 shadow-lg">
          <ArrowLeft />
        </Button>
        <Button
          href={`/dashboard/score/${data.classId}/${data.studentId}/new`}
          variant="outline"
          class="p-2 shadow-lg"
        >
          <Plus />
        </Button>
        <Button
          variant="outline"
          class="shadow-lg"
          href={`/dashboard/score/${data.classId}/${data.studentId}/template/${data.studentId}`}
        >
          Print
        </Button>
      </div>
    </div>
    <hr />
    <div class="text-muted-primary rounded-md border bg-primary/20 px-4 py-2 shadow-md">
      Nama Siswa: {data.student.studentName}
    </div>
    <DataTable data={data.scoreData} classId={data.classId} studentId={data.studentId} />
  </div>
{/if}
