<script>
    export let databasedata = 0;
    export let text = 'Omschrijving';
    import { Card } from 'flowbite-svelte';
</script>


<Card class="bg-generalbackground p-4 md:p-6 rounded-lg w-40 h-40 2xl:w-48 2xl:h-48 shadow-lgtransition-transform duration-300 transform hover:-translate-y-1 border-none text-gray-800">
    <div class="flex flex-col justify-evenly h-full">
        <div class="flex items-center justify-center text-3xl md:text-4xl font-bold text-red-500">
            {databasedata}
        </div>
        <div class="flex items-center justify-center text-sm md:text-lg text-gray-600">
            {text}
        </div>
    </div>
</Card>

