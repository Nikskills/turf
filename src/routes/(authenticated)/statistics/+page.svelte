<script lang="ts">
    import BestDrinkers from "$lib/components/BestDrinkers.svelte";
    import DataWidget from "$lib/components/DataWidget.svelte";
    import BarChart from "$lib/components/charts/BarChart.svelte";
    import type { PageData } from './$types';
  
    export let data: PageData;
  
    let totaalGedronken = data.totalBeersDrank;
    let totaleSessies = data.zuipsessies.length;
    let top3 = data.top3;
    const labels = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let barData = {
      labels: labels,
      datasets: [
        {
          label: 'Biertjes Gedronken',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.monthlyBeersDrank,
        },
        {
          label: 'Zuipsessies',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: data.monthlySessions, 
        },
      ],
    };
  
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
  </script>
  
  <div class="h-full">
    <h1 class="text-3xl font-bold my-6 text-center text-gray-800">Huis Stats</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4">
      <!-- Totale Stats Section -->
      <div class="bg-red-100 w-full flex flex-col pl-3 rounded-md pt-2">
        <div class="text-xl font-semibold mb-4 text-center">Totale Stats</div>
        <div class="flex flex-wrap gap-4 mb-4 justify-evenly">
          <DataWidget databasedata={totaalGedronken.toString()} text="Biertjes gedronken" />
          <DataWidget databasedata={totaleSessies.toString()} text="Zuipsessies" />
        </div>
        <div class="flex justify-center"><BestDrinkers bestDrinkers={top3} /></div>
      </div>
  
      <!-- Dit Jaar Section -->
      <div class="bg-blue-100 w-full flex flex-col pl-3 rounded-md py-2">
        <div class="text-xl font-semibold mb-4 text-center">Dit Jaar</div>
        <div class="flex flex-wrap gap-4 mb-4 justify-evenly">
          <DataWidget databasedata={"0"} text="Biertjes gedronken" />
          <DataWidget databasedata={"0"} text="Zuipsessies" />
        </div>
        <div class="mt-4">
          <div class="h-64 mr-2">
            <BarChart data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  </div>
  

  