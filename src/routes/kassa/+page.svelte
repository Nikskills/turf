<script lang="ts">
    import type { PageData } from "./$types";
    import "../../app.css"
	import Table from "$lib/components/Table.svelte";
	import Streepknop from "$lib/components/Streepknop.svelte";
    export let data: PageData


    let items: any[] = [];
    let counts: Record<string, number> = {};
    for (let i = 0; i < data.sessions.length; i++) {
        for (let j = 0; j < data.sessions[i].consumption.length; j++) {
            items.push({
                bier: data.sessions[i].consumption[j].quantity,
                naam: data.sessions[i].consumption[j].drinker.name,
                datum: data.sessions[i].date.getDate() + "-" + data.sessions[i].date.getMonth()+ "-" + data.sessions[i].date.getFullYear()
            }) 
        }
    }
    let columns = [
    { header: 'Naam', key: 'naam' },
    { header: '# Bier', key: 'bier' },
    { header: 'Datum', key: 'datum' }
    ];

    $: {
        data.users.forEach(user =>{
            if (counts[user.name] === undefined) {
                counts[user.name] = 0;
            }
        })
    }

    function count(name: string) {
        counts[name]++;
    }

</script>

<form method="POST"  class="max-h-screen flex flex-col w-screen overflow-hidden">
    <div class="flex-grow h-full">
        <div class="grid grid-cols-1 min-h-screen justify-between">
            <div class="flex justify-center font-bold text-center my-4">Hoi! Streep AUB je drankjes! Vergeet ook niet op verstuur te klikken, anders doet ie niks</div>
            <div>
                <div class="flex flex-row flex-wrap justify-between mx-4">
                    {#each data.users as person}
                    <div class="flex flex-col">
                        <button type="button" on:click={() => count(person.name)}><Streepknop name={person.name} source="src/lib/images/Huisgenootjes/Snack.jpeg" /></button>
                        <input type="number" name="{person.name}" class="border border-white justify-center text-center" id={person.name} bind:value={counts[person.name]} readonly>
                    </div>
                    {/each}
                </div>
                <div></div>
                <div class="flex justify-center w-full my-5"> 
                    <button type="submit" class="w-1/4 rounded-md bg-primarybutton py-2 text-sm font-semibold shadow-sm ">Verstuur</button> 
                </div>
            </div>
            <div class="flex justify-center align-center">
                <div class="hidden md:block w-3/4 rounded-lg mt-5 2xl:mx-5 mb-4 p-6 2xl:p-10">
                    <Table {items} {columns}/>
                </div>
            </div>
        </div>
    </div>
</form>
