<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import Table from '$lib/components/Table.svelte';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	export let data: PageData;

	const activeTab = writable('tab1');
	let transactions = data.stockTransactions;
	let consumptions = data.consumptions;
	let users = data.users;
	let items = [];
	let userData = [];
  



	for (let user of users) {
		userData.push({
			naam: user.name,
			balans: user.balance.toFixed(2)
		});
	}

	// Functions to change the active tab
	const setTab = (tab: string) => {
		activeTab.set(tab);
	};

	for (let transaction of transactions) {
		let soort;
		if (transaction.transactionType === 'CONSUMPTION') {
			soort = 'Gezopen';
		} else {
			soort = 'Gekocht';
		}
		items.push({
			datum: new Date(transaction.transactionDate).getDate(),
			type: soort,
			persoon: transaction.user.name,
			hoeveelheid: transaction.quantity
		});
	}

	for (let consumption of consumptions) {
		items.push({
			datum: new Date(consumption.session.date).getDate(),
			type: 'Gezopen',
			persoon: consumption.drinker.name,
			hoeveelheid: -consumption.quantity
		});
	}

	let columns1 = [
		{ header: 'Persoon', key: 'persoon' },
		{ header: 'Datum', key: 'datum' },
		{ header: 'Type', key: 'type' },
		{ header: 'Hoeveelheid', key: 'hoeveelheid' }
	];
	let columns2 = [
		{ header: 'Naam', key: 'naam' },
		{ header: 'Balans', key: 'balans' }
	];

  let columns3 = [
    {header: 'Van', key: 'van'},
    {header: 'Hoeveel', key: 'hoeveel'},
    {header: 'Naar', key: 'naar'},
    {header: 'Betaald', key: 'betaald'}
  ]

// Updated to use a writable store for records
const records = writable([]);
//button is not yet working but the rest works
async function calculateBalance() {
  const response = await fetch("/api/calculateSettlements", { method: "POST" });
  const data = await response.json();
  const newRecords = data.settlements.map((record: { debtorName: any; amount: number; creditorName: any; }) => ({
    van: record.debtorName,
    hoeveel: `$${record.amount.toFixed(2)}`,
    naar: record.creditorName,
    betaald:` <button class="p-2 bg-green-500 text-white rounded" onclick="settlePayment(${record})">Betalen</button>`
  }));
  records.set(newRecords);
}

function settlePayment(record: any) {
  console.log('Settling payment for:', record);
  // Add your logic to handle the payment settlement
}
 

</script>

<div class="p-6 flex flex-col justify-center items-center">
	<h1 class="text-3xl font-bold mb-6">Gegevens</h1>
	<div class="justify-start items-start pl-6 w-3/4 mb-2">
		<button class="pb-2 mr-2" class:border-b-2={ $activeTab === 'tab1' } class:border-primarybutton={ $activeTab === 'tab1' } class:border-transparent={ $activeTab !== 'tab1' } on:click={() => setTab('tab1')}>Transacties</button>
		<button class="pb-2" class:border-b-2={ $activeTab === 'tab2' } class:border-primarybutton={ $activeTab === 'tab2' } class:border-transparent={ $activeTab !== 'tab2' } on:click={() => setTab('tab2')}>Verrekeningen</button>
	</div>
	<div class="flex flex-row w-3/4">
		{#if $activeTab === 'tab1'}
			<div class="overflow-x-auto bg-white rounded-lg w-3/4">
				<Table columns={columns1} {items} />
			</div>
			<div class="overflow-x-auto bg-white rounded-lg w-1/4">
				<Table columns={columns2} items={userData} />
        <div class="flex justify-center mt-5"><PrimaryButton text="Verreken" on:click={calculateBalance} /></div>
			</div>
		{:else if $activeTab === 'tab2'}
			<div class="pl-6">
				<div><h2>Verreken de Lijst</h2></div>
        <div><PrimaryButton text="Verreken" on:click={calculateBalance} /></div>
        <div class="settlement-list">
          <Table
          columns={columns3}
          items={$records}
        />
        </div>
			</div>
		{/if}
	</div>
</div>
