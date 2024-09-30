<script lang="ts">
	import TableComp from "$lib/components/TableComp.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
    import '../../app.css'
	import DataWidget from "$lib/components/DataWidget.svelte";

    const users = data.users
    let rows = []
    const remainingBeers = data.remainingBeers

    for (let user of users) {
        if (user.name != 'Huis') {
            rows.push({
                naam: user.name,
                balans: user.balance
            })
        }
    }

    let columns = [
        {header: 'Naam', key: 'naam'},
        {header: 'Balans', key: 'balans'}
    ]

</script>

<div class="bg-generalbackground min-h-screen">
    <div class="flex justify-start p-4">
        <div class="w-[14%]">
            <button class="rounded-md bg-secondary text-generalbackground py-2 text-sm font-semibold shadow-sm mx-2 my-1 w-full" on:click={() => window.location.href="/kassa"}>Terug</button>
        </div>
    </div>
    
    <div class="flex flex-col items-center justify-center p-6">
        <h1 class="text-4xl font-bold text-black mb-8 text-center w-full">Balans</h1>

        <div class="w-full max-w-6xl flex flex-row justify-between space-x-4">

            <div class="bg-generalbackground rounded-lg p-6 w-full">
                <TableComp items={rows} columns={columns} />
            </div>

            <div class="w-full rounded-lg p-6 bg-generalbackground">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <DataWidget databasedata={remainingBeers.toString()} text="Biertjes over"/>
                </div>
            </div>
            

        </div>
    </div>
</div>
