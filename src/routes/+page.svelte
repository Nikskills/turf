<script lang='ts'>
    import "../app.css";
    import type { PageData } from './$types'

  export let data: PageData
</script>


<body>
    <h1 class = "text-3xl text-bold">Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <div>
        {#each data.feed as consumption (consumption.consumptionId)}
            {consumption.quantity}
            <br/>
        {/each}
    </div>
</body>