<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Nilai</h1>
      <p>Daftar Kelas</p>
    </div>
  </div>
  <hr />
  {#each data.classData as classData}
    <pre>{JSON.stringify(classData, null, 2)}</pre>
  {/each}
</div>
