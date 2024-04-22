<script lang="ts">
    import type { PageData } from './$types';
    import { Button } from '$lib/components/ui/button';

    export let data: PageData;
    const { answerImage } = data
</script>

<div>
    {answerImage}

    <Button
    href="https://www.google.com">
        Test
    </Button>
</div>