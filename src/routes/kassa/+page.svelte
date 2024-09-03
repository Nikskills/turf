<script lang="ts">
    import type { PageData } from "./$types";
    import "../../app.css"
	import Table from "$lib/components/Table.svelte";
    export let data: PageData


    let items: any[] = [];
    for (let i = 0; i < data.sessions.length; i++) {
        for (let j = 0; j < data.sessions[i].consumption.length; j++) {
            items.push({
                beschrijving: data.sessions[i].description,
                bier: data.sessions[i].consumption[j].quantity,
                naam: data.sessions[i].consumption[j].drinker.name,
                datum: data.sessions[i].date.getDate() + "-" + data.sessions[i].date.getMonth()+ "-" + data.sessions[i].date.getFullYear()
            }) 
        }
    }
    let columns = [
    { header: 'Naam', key: 'naam' },
    { header: '# Bier', key: 'bier' },
    { header: 'Beschrijving', key: 'beschrijving' },
    { header: 'Datum', key: 'datum' }
    ];
</script>

<div class="min-h-screen flex flex-col w-screen">
    <div class="flex-grow h-full">
        <div class="grid grid-cols-1 min-h-screen justify-between">
            <div class="flex justify-center text-center my-4">Hoi! Doe even strepen AUB</div>
            <div>
                <div class="flex flex-row justify-between mx-1">
                    {#each data.users as person}
                        <div class="justify-between">{person.name}</div>
                    {/each}
                </div>
            </div>
            <div class="flex justify-center align-center">
                <div class="w-3/4 rounded-lg mt-5 2xl:mx-5 mb-4 p-6 2xl:p-10">
                    <Table {items} {columns}/>
                </div>
            </div>
        </div>
    </div>
</div>
