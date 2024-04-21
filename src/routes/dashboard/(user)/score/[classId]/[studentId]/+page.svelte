<script lang="ts">
  import { Hash } from 'lucide-svelte';
  import type { PageData } from './$types';
  import { Button } from '$lib/components/ui/button';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Nilai</h1>
      <p>Daftar Nilai</p>
    </div>
    <Button variant="ghost" href="/dashboard/score/{data.classId}">Kembali</Button>
  </div>
  <hr />
  <div class="grid grid-cols-3 gap-4">
    {#each data.scoreData as scoreData}
      <pre>{JSON.stringify(scoreData, null, 2)}</pre>
      <!-- <a
        href="/dashboard/score/{data.classId}/{studentData.studentId}"
        class="flex w-full justify-between rounded-md bg-blue-900 p-4 text-white"
      >
        <div>{studentData.studentName}</div>
        <div class="flex gap-2">
          <Hash />
          {#if studentData.average}
            {studentData.average}
          {:else}
            0
          {/if}
        </div>
      </a> -->
    {/each}
  </div>
</div>
