<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
import { useChat } from "ai/svelte"

    const { messages, handleSubmit, input} = useChat({
        api:"/dashboard/chat"
    });
</script>

<ul>
    {#each $messages as message}
    <li class="flex flex-col pb-4">
        <div>
            <span class="font-semibold text-xs">{message.role}</span>
        </div>
        <div class="bg-slate-500 w-fit px-2 py-1 rounded-sm">
            <span class="text-white">{message.content}</span>
        </div>
    </li>
    {/each}
</ul>

<form on:submit={handleSubmit} class="flex">
    <Input bind:value={$input}/>
    <Button type="submit">Send</Button>
</form>