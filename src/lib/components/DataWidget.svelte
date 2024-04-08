<script>
    export let data = 'iets van database'
    export let text = 'omschrijving'
    import { Card } from 'flowbite-svelte'
</script>


<Card class="bg-widgetaccent px-5 py-5 rounded-md w-40 h-40 shadow-md transition-transform duration-300 transform hover:-translate-y-0.5 border-none">
    <div class="flex flex-col justify-between h-full">
        <div>{ data }</div>
        <div>{ text }</div>
    </div>
</Card>