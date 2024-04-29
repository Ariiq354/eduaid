<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import DataTable from './components/data-table.svelte';
  export let data: PageData;

  onMount(() => {
    window.print();
  });
  window.onafterprint = () => {
    history.back();
  };
</script>

<div class="min-h-screen w-full bg-white">
  <div class="flex w-full justify-center text-black">Daftar Nilai Siswa</div>
  <DataTable data={data.scoreData} />
  <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
</div>
