<script lang="ts">
	import DataWidget from '$lib/components/DataWidget.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SignoutButton from '$lib/components/SignoutButton.svelte';
	import Table from '$lib/components/Table.svelte';
    import type {PageData} from './$types'

    export let data: PageData
    let userName = data.user
    let totalBeersDrank = (data.totalBeersDrank)
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
        <div class="font-bold text-3xl pl-3">Welkom {userName}</div>
        <div class="flex flex-row gap-4">
            <!-- Buttons -->
            <div><a href="/newsupply"><PrimaryButton text="Nieuwe Voorraad"/></a></div>
            <div><a href="/drinkingsession"><PrimaryButton text="Ik Heb Gezopen" /></a></div>
            <div><SignoutButton/></div>
        </div>
    </div>
    <div class="flex flex-col mr-4 justify-around flex-grow">
        <!-- Stats row -->
        <div class="flex flex-row flex-wrap">
            <div class="w-full md:w-1/6"></div>
            <div class="w-full md:w-1/3 font-bold text-xl mt-3 md:mt-0 mx-5 bg-white px-5 py-5 rounded-md shadow-lg">
                Huis
                <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-6 text-lg pt-4 gap-4 md:gap-10 sm:mx-2 md:mx-0 font-bold">
                    <div class="w-full"><DataWidget text="Biertjes In Voorraad" databasedata={totalStock}/></div>
                    <div class="w-full"><DataWidget text="Biertjes Gedronken" databasedata={totalBeersDrank} /></div>
                </div>
            </div>
            <div class="w-full md:w-1/3 font-bold text-xl mt-3 md:mt-0 mx-5 bg-white px-5 py-5 rounded-md shadow-lg">
                Persoonlijke Zuipstats
                <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-6 font-bold text-lg pt-4 gap-4 md:gap-10 sm:mx-2 md:mx-0">
                    <div class="w-full"><DataWidget text="Biertjes Over" databasedata={0} /></div>
                    <div class="w-full"><DataWidget text="Totaal Gedronken" databasedata={0} /></div>
                </div>
            </div>
            <div class="w-full md:w-1/6"></div>
        </div>
        <div class="hidden md:block bg-white shadow-lg rounded-lg mπx-2 ml-5 2xl:mx-5 mb-4 p-6 2xl:p-10">
            <div class="font-bold text-2xl mb-4 text-gray-800">Huis Zuipsessies</div>
            <Table {items} {columns}/>
        </div>
    </div>
</div>
