<script>
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "$lib/components/ui/select";
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from "$lib/components/ui/table";

    import { CirclePlus, Brain } from 'lucide-svelte';

</script>

<div class="flex flex-col gap-4">
    <div class="text-2xl font-bold">Modul Pembelajaran</div>

    <div class="flex flex-row gap-2">
        <Input class="w-1/3" placeholder="Cari Tujuan Pembelajaran"></Input> 
        <Select>
            <SelectTrigger class="w-1/12">
                <SelectValue placeholder="Kelas" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="next">6A-2021</SelectItem>
                <SelectItem value="sveltekit">6B-2021</SelectItem>
                <SelectItem value="astro">6C-2021</SelectItem>
            </SelectContent>
        </Select>
    </div>  
    <div class="flex flex-row gap-2">
        <Button class="gap-3"> 
            <CirclePlus class="w-4"/> 
            Tambah Baru
        </Button>
        <Button class="gap-3"> 
            <Brain class="w-4"/>
            Buat dengan AI
        </Button>

    </div>
    <div class="flex flex-row ">
        <Table>
            <TableCaption>Tabel Modul Pembelajaran</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead>Modul</TableHead>
                <TableHead>Tujuan Pembelajaran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Perbaruan Terakhir</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow >
                    <TableCell>Hidup</TableCell>
                    <TableCell>Mati</TableCell>
                    <TableCell>Anna</TableCell>
                    <TableCell>20-07-2024 19:54</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>