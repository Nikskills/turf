<script lang="ts">
    import DataWidget from "$lib/components/DataWidget.svelte";
    import BarChart from "$lib/components/charts/BarChart.svelte";
    import type { PageData } from './$types';
  
    export let data: PageData;
  
    let totaalGedronken = data.totalBeersDrank;
    let totaleSessies = data.zuipsessies.length;
    console.log(data.monthlyBeersDrank)
    console.log(data.monthlySessions)

  
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let barData = {
      labels: labels,
      datasets: [
        {
          label: 'Biertjes Gedronken',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.monthlyBeersDrank, // Example data points
        },
        {
          label: 'Zuipsessies',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: data.monthlySessions, // Example data points
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
  
  <div class="h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Huis Stats</h1>
    <div class="flex flex-row justify-evenly h-full">
      <div class="flex flex-row justify-between w-3/4 h-full gap-4">
        <div class="bg-red-100 w-full flex flex-col pl-3">
          <div class="text-xl font-semibold mb-4">Totale Stats</div>
          <div class="flex flex-row flex-wrap gap-4 mb-4">
            <DataWidget databasedata={totaalGedronken} text="Biertjes gedronken" />
            <DataWidget databasedata={totaleSessies} text="Totale Zuipsessies" />
          </div>
          <div class="mt-4">
            <div class="text-xl font-semibold mb-2">Charts</div>
            <div class="h-64">
              <BarChart data={barData} options={barOptions} />
            </div>
          </div>
        </div>
        <div class="bg-blue-100 w-full flex items-center justify-center text-xl font-semibold">
          Nieuwe stats
        </div>
      </div>
    </div>
  </div>
  