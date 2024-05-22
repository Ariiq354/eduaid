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
  function modifiedTp(val: string) {
    const substring = 'Siswa dapat';
    // Escape special characters in the substring for regex
    const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Create a regex pattern to match the substring at the beginning of the string
    const pattern = new RegExp('^' + escapedSubstring + '\\s*');
    // Replace the substring with an empty string
    return val.replace(pattern, '');
  }
</script>

<div class="min-h-screen w-full bg-white">
  <div class="flex w-full justify-center text-black">Daftar Nilai Siswa</div>
  <div class="flex w-full flex-col">
    <div>Nama: {data.studentData?.studentName}</div>
    <div>Kelas: {data.studentData?.class?.classname}</div>
  </div>
  <DataTable data={data.scoreData} />
  <table class="mt-12 w-full border">
    {#each data.scoreData as scoreData}
      <tr class="border">
        <td rowspan="2" class="border p-4">
          {scoreData.subjectName}
        </td>
        <td class="p-4">
          {#if (scoreData.maxScore || 0) < (scoreData.q1 || 0)}
            Siswa masih butuh bimbingan dalam {modifiedTp(scoreData.maxTp || '')}
          {:else if (scoreData.maxScore || 0) < (scoreData.q2 || 0)}
            Siswa cukup baik dalam {modifiedTp(scoreData.maxTp || '')}
          {:else}
            Siswa sangat baik dalam {modifiedTp(scoreData.maxTp || '')}
          {/if}
        </td>
      </tr>
      <tr>
        <td class="p-4">
          {#if (scoreData.minScore || 0) < (scoreData.q1 || 0)}
            Siswa masih butuh bimbingan dalam {modifiedTp(scoreData.minTp || '')}
          {:else if (scoreData.minScore || 0) < (scoreData.q2 || 0)}
            Siswa cukup baik dalam {modifiedTp(scoreData.minTp || '')}
          {:else}
            Siswa sangat baik dalam {modifiedTp(scoreData.minTp || '')}
          {/if}
        </td>
      </tr>
    {/each}
  </table>
</div>
