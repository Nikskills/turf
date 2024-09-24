<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import TableComp from '$lib/components/TableComp.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	export let data: PageData;
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { page } from '$app/stores';

	const activeTab = writable('tab1');
	const records = writable([]);
  
	let transactions = data.stockTransactions;
	let consumptions = data.consumptions;
	let users = data.users;
	let items = [];
	let userData = [];
  
	// Prepare user data
	for (let user of users) {
	  userData.push({
		naam: user.name,
		balans: user.balance.toFixed(2)
	  });
	}
  
	// Prepare items data
	for (let transaction of transactions) {
	  let soort = transaction.transactionType === 'CONSUMPTION' ? 'Gezopen' : 'Gekocht';
	  items.push({
		datum: new Date(transaction.transactionDate).toLocaleDateString(),
		type: soort,
		persoon: transaction.user.name,
		hoeveelheid: transaction.quantity
	  });
	}
  
	for (let consumption of consumptions) {
	  items.push({
		datum: new Date(consumption.session.date).toLocaleDateString(),
		type: 'Gezopen',
		persoon: consumption.drinker.name,
		hoeveelheid: -consumption.quantity
	  });
	}
  
	const columns1 = [
	  { header: 'Persoon', key: 'persoon' },
	  { header: 'Datum', key: 'datum' },
	  { header: 'Type', key: 'type' },
	  { header: 'Hoeveelheid', key: 'hoeveelheid' }
	];
  
	const columns2 = [
	  { header: 'Naam', key: 'naam' },
	  { header: 'Balans', key: 'balans' }
	];
  
	const columns3 = [
	  { header: 'Van', key: 'van' },
	  { header: 'Hoeveel', key: 'hoeveel' },
	  { header: 'Naar', key: 'naar' },
	  { header: 'Betaald', key: 'betaald' }
	];
  
	// Function to change the active tab
	const setTab = (tab: string) => {
	  activeTab.set(tab);
	};
  
	// Function to calculate balance and fetch settlements
	// Voor nu even laten maar later aanpassen
	onMount( () => calculateBalance() )

	async function calculateBalance() {
	  const response = await fetch("/api/calculateSettlements", { method: "POST" });
	  const data = await response.json();
  
	  const formattedSettlements = data.settlements.map((settlement: any) => ({
		van: settlement.debtorName,
		naar: settlement.creditorName,
		hoeveel: `${settlement.amount.toFixed(2)}`,
		betaald: settlement.paid,
		debtorId: settlement.debtorId,
		creditorId: settlement.creditorId,
	  }));
  
	  records.set(formattedSettlements);
	}
  
	async function settlePayment(debtorId: string, creditorId: string, amount: number) {
		const response = await fetch("/api/settlePayments", {
			method: "POST",
			body: JSON.stringify({
				debtorId,
				creditorId,
				amount
			})
		})
		if (!response.ok) {
            const errorData = await response.json();
            console.error("Error occurred:", errorData);
            alert(`Error: ${errorData.error || 'Payment settlement failed'}`);
            return;
        }
		window.location.reload()
	}
  </script>
  
  <div class="p-6 flex flex-col justify-center items-center">
	<h1 class="text-3xl font-bold mb-6">Gegevens</h1>
	<div class="justify-start items-start pl-6 w-3/4 mb-2">
	  <button
		class="pb-2 mr-2"
		class:border-b-2={$activeTab === 'tab1'}
		class:border-primarybutton={$activeTab === 'tab1'}
		class:border-transparent={$activeTab !== 'tab1'}
		on:click={() => setTab('tab1')}
	  >
		Transacties
	  </button>
	  <button
		class="pb-2"
		class:border-b-2={$activeTab === 'tab2'}
		class:border-primarybutton={$activeTab === 'tab2'}
		class:border-transparent={$activeTab !== 'tab2'}
		on:click={() => setTab('tab2')}
	  >
		Verrekeningen
	  </button>
	</div>
	<div class="flex flex-row w-3/4">
	  {#if $activeTab === 'tab1'}
		<div class="overflow-x-auto bg-white rounded-lg w-3/4">
		  <TableComp columns={columns1} items={items} />
		</div>
		<div class="overflow-x-auto bg-white rounded-lg w-1/4">
		  <TableComp columns={columns2} items={userData} />
		  <div class="flex justify-center mt-5">
			<PrimaryButton text="Verreken" on:click={calculateBalance} />
		  </div>
		</div>
	  {:else if $activeTab === 'tab2'}
		<div class="pl-6 w-full">
		  <div class="flex flex-col items-center w-full">
			<div class="overflow-x-auto bg-white rounded-lg w-full mt-3">
				{#if $records.length > 0}			  
				  <Table hoverable={true}>
					<TableHead>
						{#each columns3 as column}
					  		<TableHeadCell>{column.key}</TableHeadCell>
						{/each}
					</TableHead>
					<TableBody tableBodyClass="divide-y">
						{#each $records as settlement}
							{#if settlement}
								<TableBodyRow>
									<TableBodyCell>{settlement.van}</TableBodyCell>
									<TableBodyCell>{settlement.hoeveel}</TableBodyCell>
									<TableBodyCell>{settlement.naar}</TableBodyCell>
									<TableBodyCell>
										{#if settlement.paid}
											<span>Paid</span>
										{:else}
											<button on:click={() => settlePayment(settlement.debtorId, settlement.creditorId, settlement.hoeveel)} class="p-2 bg-primarybutton text-black rounded">
											Betalen
											</button>
										{/if}
									</TableBodyCell>
								</TableBodyRow>
							{/if}
					 	{/each}
					</TableBody>
				  </Table>
				{:else}
					<div class="flex flex-col justify-center">
						<p>Er zijn geen verrekeningen mogelijk, zuip eerst maar meer :heart </p>
					</div>
				{/if}
			</div>
		  </div>
		</div>
	  {/if}
	</div>
  </div>
  