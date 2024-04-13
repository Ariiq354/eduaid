<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { useChat } from "ai/svelte"

    const { messages, handleSubmit, input} = useChat({
        api:"/dashboard/chat"
    });
</script>

<div>
    <h1 class="text-3xl font-bold">AI Assistant Chat</h1>
</div>

<ul class="flex flex-col py-8">

    <li class="self-start text-left">
        <div class="font-bold text-slate-600">assistant</div>
        <div class="px-4 py-2 rounded-r-md rounded-t-md bg-slate-600 text-white max-w-3xl w-full">
            Anda sedang berbicara dengan Asisten Guru AI EduAid. Saya dapat membantu Anda dengan berbagai tugas seperti menetapkan tujuan belajar, membuat modul, dan lainnya. Bagaimana saya bisa membantu Anda hari ini?
        </div>
    </li>

    {#each $messages as message}

        {#if message.role === "user"}
            <li class="self-end text-right">
                <div class="font-bold text-primary">{message.role}</div>
                <div class="px-4 py-2 rounded-l-md rounded-t-md bg-primary text-white max-w-3xl w-full">
                    {message.content}
                </div>
            </li>

        {:else}
            <li class="self-start text-left">
                <div class="font-bold text-slate-600">{message.role}</div>
                <div class="px-4 py-2 rounded-r-md rounded-t-md bg-slate-600 text-white max-w-3xl w-full">
                    {message.content}
                </div>
            </li>
        {/if}
    
    {/each}
</ul>

<form on:submit={handleSubmit} class="flex gap-4 ">
    <Input bind:value={$input} class="h-full"/>
    <Button type="submit" class="h-full">Send</Button>
</form>