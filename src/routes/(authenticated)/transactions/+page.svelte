<script lang="ts">
  import Table from '$lib/components/Table.svelte'; 
  import type {PageData} from './$types'
  export let data: PageData
  let transactions = data.stockTransactions
  let consumptions = data.consumptions 
  let items = [];
  for (let transaction of transactions){
    let soort;
    if (transaction.transactionType === "CONSUMPTION"){soort = "Gezopen"}else{soort = "Gekocht"}
    items.push({
      datum: transaction.transactionDate.getDate(),
      type: soort,
      persoon: transaction.user.name,
      hoeveelheid: transaction.quantity,
    })
  }

  for (let consumption of consumptions){
    items.push({
      datum: consumption.session.date.getDate(),
      type: "Gezopen",
      persoon: consumption.drinker.name,
      hoeveelheid: -consumption.quantity,
    })
  }


  let columns = [
      { header: 'Persoon', key: 'persoon' },
      { header: 'Datum', key: 'datum' },
      { header: 'Type', key: 'type' },
      { header: 'Hoeveelheid', key: 'hoeveelheid' }
  ];
</script>

<div class="p-6 flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold mb-6">Transacties</h1>
  <div class="overflow-x-auto bg-white rounded-lg p-4 w-2/3">
    <Table {columns} {items} />
  </div>
</div>

