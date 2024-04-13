<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;

    const cpId = $page.params.cpId
</script>

<div>CP ID : {cpId}</div>

<ul>
{#each data.tpData as tp (tp.id)}

    {#if tp.cpId === cpId}
        <li>
            <a href={`/dashboard/tujuanPembelajaran/${cpId}/${tp.id}`}>{tp.tujuanPembelajaran}</a>
        </li>
    {/if}

{/each}
</ul>
