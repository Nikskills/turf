<script lang="ts">
  import BarChart from "$lib/components/charts/BarChart.svelte";
  import DataWidget from "$lib/components/DataWidget.svelte";
  import { writable } from "svelte/store";
  import type { PageData } from './$types';

  export let data: PageData;

  let beersDrank = data.beersDrank;
  let zuipsessies = data.zuipsessies.length;
  let beersDrankForever = data.beersDrankForever;
  let allZuipsessies = data.allZuipsessies.length;

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  // Generate labels for the days in the current month
  let labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  let barData = {
    labels: labels,
    datasets: [
      {
        label: 'Biertjes Gedronken',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: data.dailyBeersDrank, // Example data points
      },
    ],
  };

  const activeTab = writable('tab1');
  const setTab = (tab: string) => activeTab.set(tab);

  // BarChart options
  let options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Deze Maand',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Reactive statement to update the chart title based on the active tab
  $: {
    if ($activeTab === 'tab1') {
      options.plugins.title.text = "Deze Maand";
    } else if ($activeTab === 'tab2') {
      options.plugins.title.text = "Altijd";
    }
  }
</script>

<div class="container mx-auto h-full">
  <div class="p-6 flex flex-col items-center h-full">
    <h1 class="text-3xl font-bold mb-6">Mijn Statistieken</h1>
      <div class="justify-start items-start pl-6 w-3/4 mb-2">
        <button class="pb-2 mr-2" class:border-b-2={$activeTab === 'tab1'} class:border-primarybutton={$activeTab === 'tab1'} class:border-transparent={$activeTab !== 'tab1'} on:click={() => setTab('tab1')}>
        Afgelopen Maand
        </button>
        <button class="pb-2" class:border-b-2={$activeTab === 'tab2'} class:border-primarybutton={$activeTab === 'tab2'} class:border-transparent={$activeTab !== 'tab2'} on:click={() => setTab('tab2')}>
        Altijd
      </button>
    </div>
    <div class="flex flex-row w-3/4 h-full">
      {#if $activeTab === 'tab1'}
        <div class="border border-black h-full w-full">
          <div><BarChart {options} data={barData} /></div>
          <div><DataWidget /></div>
        </div>
      {:else if $activeTab === 'tab2'}
        <div class="border border-black h-full w-full">
          <div><DataWidget databasedata={beersDrankForever._sum.quantity?.toString()} text="Biertjes Totaal Gedronken" /></div>
          <div><DataWidget databasedata={allZuipsessies.toString()} text="Totale Hoeveelheid Zuipsessies" /></div>
        </div>
      {/if}
    </div>
  </div>
</div>
