<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
  import { writable } from 'svelte/store';
  import type { selectSubject } from '$lib/server/schema';
  import * as Table from '$lib/components/ui/table';
  import DataTableActions from './data-table-action.svelte';
  import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let data: selectSubject[];

  const tableData = writable(data);
  $: tableData.set(data);

  const table = createTable(tableData, {
    page: addPagination({
      initialPageSize: 10
    }),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
    })
  });

  const columns = table.createColumns([
    table.column({
      accessor: 'subjectName',
      header: 'Nama Pelajaran'
    }),
    table.column({
      accessor: 'phase',
      header: 'Fase',
      cell: ({ value }) => {
        switch (value) {
          case 1:
            return 'Fase 1 (Kelas 1 & 2)';
          case 2:
            return 'Fase 2 (Kelas 3 & 4)';
          case 3:
            return 'Fase 3 (Kelas 5 & 6)';
          default:
            return '-';
        }
      }
    }),
    table.column({
      accessor: 'minimum',
      header: 'Nilai batas bawah'
    }),
    table.column({
      accessor: 'medium',
      header: 'Nilai batas atas'
    }),
    table.column({
      accessor: ({ id }) => id,
      header: 'Menu',
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
      plugins: {
        sort: {
          disable: true
        },

        filter: {
          exclude: true
        }
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
</script>

<div>
  <div class="flex items-center py-4">
    <Input class="max-w-sm" placeholder="Cari..." type="text" bind:value={$filterValue} />
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row class="bg-primary/20 hover:bg-primary/10">
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <Table.Head
                    {...attrs}
                    class="hidden first-of-type:table-cell last-of-type:table-cell md:table-cell"
                  >
                    {#if cell.id !== 'Menu'}
                      <Button
                        variant="ghost"
                        class="hover:bg-background/0 hover:text-foreground"
                        on:click={props.sort.toggle}
                      >
                        <Render of={cell.render()} />
                        <ArrowUpDown class={'ml-2 h-4 w-4'} />
                      </Button>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell
                    {...attrs}
                    class="hidden first-of-type:table-cell last-of-type:table-cell md:table-cell"
                  >
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}><ChevronLeft size="20" /></Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}><ChevronRight size="20" /></Button
    >
  </div>
</div>
