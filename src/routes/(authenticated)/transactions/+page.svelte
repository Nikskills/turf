<script lang="ts">
  import Table from '$lib/components/Table.svelte'; 
  import type {PageData} from './$types'
  export let data: PageData
  let transactions = data.stockTransactions
  let consumptions = data.consumptions 
  let items = [];
  for (let transaction of transactions){
    items.push({
      datum: transaction.transactionDate.getDate(),
      type: transaction.transactionType,
      persoon: transaction.user.name,
      hoeveelheid: transaction.quantity,
    })
  }

  for (let consumption of consumptions){
    items.push({
      datum: consumption.session.date.getDate(),
      type: "CONSUMPTION",
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

<h1>transacties en saaie meuk</h1>

<div>
    <Table {columns} {items} />
</div>

