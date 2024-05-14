<script lang="ts">
	import DataWidget from '$lib/components/DataWidget.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import Table from '$lib/components/Table.svelte';
    import type {PageData} from './$types'

    export let data: PageData

    let items: any[] = [];
    const totalStock = data.totalStock
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

<div class="flex flex-col w-full mt-5 h-full flex-wrap">
    <div class="flex flex-row justify-between mr-4 flex-wrap">
        <!-- Top row -->
        <div class="font-bold text-3xl">Dashboard</div>
        <div class="flex flex-row gap-4">
            <!-- Buttons -->
            <div><a href="/newsupply"><PrimaryButton text="Nieuwe Voorraad"/></a></div>
            <div><a href="/drinkingsession"><PrimaryButton text="Ik heb gezopen" /></a></div>
        </div>
    </div>
    <div class="flex flex-col mr-4 justify-around flex-grow">
        <!-- Stats row -->
        <div class="flex flex-row flex-wrap">
            <div class="w-full md:w-1/6"></div>
            <div class="w-full md:w-1/3 font-bold text-xl flex flex-col justify-center">
                Huis
                <div class="flex flex-col md:flex-row font-normal text-lg pt-4 gap-4 md:gap-10 flex-wrap sm:mx-2 md:mx-0">
                    <div class="w-full"><DataWidget text="Biertjes Over" databasedata={totalStock}/></div>
                    <div class="w-full"><DataWidget text="Totaal Gedronken" databasedata={0} /></div>
                </div>
            </div>
            <div class="w-full md:w-1/3 font-bold text-xl mt-3 md:mt-0">
                Persoonlijke Zuipstats
                <div class="flex flex-col md:flex-row font-normal text-lg pt-4 gap-4 md:gap-10 flex-wrap">
                    <div class="w-full"><DataWidget text="Biertjes Over" databasedata={0} /></div>
                    <div class="w-full"><DataWidget text="Totaal Gedronken" databasedata={0} /></div>
                </div>
            </div>
            <div class="w-full md:w-1/6"></div>
        </div>
        <div class="md:block hidden">
            <Table {items} {columns}/>
        </div>
    </div>
</div>
