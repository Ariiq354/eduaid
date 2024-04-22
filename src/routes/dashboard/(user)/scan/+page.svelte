<svelte:head>
    <title>Posts debug</title>
</svelte:head>

<script context="module">
    export async function load({params, fetch}) {
        const Posts = await GetAllPosts()
        async function GetAllPosts(params) {
            let url = 'http://localhost:8000/'
            const res = await fetch(url)
            return await res.json
        }
        return {
            props: {
                Posts:Posts
            }
        }
    }
</script>

<script>
    export let Posts;
</script>

<section id="posts">
{Posts}
</section>