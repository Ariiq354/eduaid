<script lang="ts">
    import type { PageData } from './$types';
    import type { SubmitFunction } from '../$types';
    import { Button } from '$lib/components/ui/button';
    import { CirclePlus, Pencil, BotMessageSquare, Trash } from 'lucide-svelte';
    import { page } from '$app/stores';
    import { toast } from 'svelte-sonner';
    import { invalidateAll } from '$app/navigation';

  export let data: PageData;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">{data.tpData?.capaianPembelajaran}</h1>
  </div>

  <div class="flex flex-row gap-4">
    <Button
      href="/dashboard/tujuanPembelajaran/${data.cpId}/new"
      variant="default"
      class="w-fit gap-3 shadow-lg"
    >
      <CirclePlus class="w-4" />
      Tambah
    </Button>
    <Button
      href="/dashboard/tujuanPembelajaran/${data.cpId}/aiGenerate"
      variant="default"
      class="w-fit gap-3 shadow-lg"
    >
      <BotMessageSquare class="w-4" />
      Tambah dengan Ai
    </Button>
  </div>

  <hr />

  <h2 class="text-1xl font-bold">Tujuan Pembelajaran:</h2>

  {#if data.tpData}
    {#each data.tpData.tp as tp (tp.id)}
      <div class="rounded-md bg-neutral-50 p-2 shadow-sm hover:shadow-md">
        <div class="flex w-full flex-row items-center justify-between">
          <p class="">{tp.tujuanPembelajaran}</p>

                    <div class="flex flex-row gap-4">
                        <Button class="shadow-lg w-fit gap-3" href={`/dashboard/tujuanPembelajaran/${cpId}/${tp.id}`}>
                            <Pencil class="w-4"/>
                            Edit
                        </Button>

                        <Button class="shadow-lg w-fit gap-3">
                            <Trash class="w-4"/>
                            Hapus
                        </Button>
                    </div>
                    
                </div>
            </div>
        {/if}

    {/each}
  {/if}
</div>
