<script>
	import DataWidget from '$lib/components/DataWidget.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import Table from '$lib/components/Table.svelte';

  let items = [
      { naam: "John", bier: 5, beschrijving: "Keihard Pilsen", datum: "2022-04-01" },
      { naam: "Emma", bier: 8, beschrijving: "Laffe Borrel", datum: "2022-04-02" },
      { naam: "Sophia", bier: 3, beschrijving: "Brak", datum: "2022-04-03" },
      { naam: "Liam", bier: 6, beschrijving: "Lachu", datum: "2022-04-04" }
  ];

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
            <div><PrimaryButton text="Ik heb gezopen" /></div>
        </div>
    </div>
    <div class="flex flex-col mr-4 justify-around flex-grow">
        <!-- Stats row -->
        <div class="flex flex-row flex-wrap">
            <div class="w-full md:w-1/6"></div>
            <div class="w-full md:w-1/3 font-bold text-xl flex flex-col justify-center">
                Huis
                <div class="flex flex-col md:flex-row font-normal text-lg pt-4 gap-4 md:gap-10 flex-wrap sm:mx-2 md:mx-0">
                    <div class="w-full"><DataWidget text="Biertjes Over" databasedata={0}/></div>
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
