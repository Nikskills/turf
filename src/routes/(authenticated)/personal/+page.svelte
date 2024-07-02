<script lang="ts">
    import BarChart from "$lib/components/charts/BarChart.svelte";
    import DataWidget from "$lib/components/DataWidget.svelte";
	  import { writable } from "svelte/store";
    import type { PageData } from './$types';

  
    export let data: PageData;
    let beersDrank = data.beersDrank
    let zuipsessies = data.zuipsessies.length
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let labels = Array(daysInMonth).fill(0)
    for (let i = 0; i < daysInMonth; i++){
      labels[i] = (i+1).toString();
    }
    let barData = {
      labels: labels,
      datasets: [
        {
          label: 'Biertjes Gedronken',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.dailyBeersDrank, // Example data points
        },]
    }
    const activeTab = writable('tab1')
    const setTab = (tab: string) => {
	    activeTab.set(tab);
	  };

    //BarChart options
    let barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Dit Jaar',
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
    $: {
      if ($activeTab == 'tab1') {
        barOptions.plugins.title.text = "Deze Maand"
      }else if ($activeTab == 'tab2') {
        barOptions.plugins.title.text = "Altijd"
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
            <div><BarChart options={barOptions} data={barData}/></div>
            <div><DataWidget /></div>
          </div>
        {:else if $activeTab === 'tab2'}
          <div class="border border-black h-full w-full">
            <div><BarChart options={barOptions}/></div>
            <div><DataWidget /></div>
          </div>
        {/if}
      </div>
      </div>
      
  </div>


  