<script lang="ts">
    import DataWidget from "$lib/components/DataWidget.svelte";
    import type { PageData } from './$types';
  
    export let data: PageData;
  
    let gedronken = data.totalBeersDrank;
    let sessies = data.drinkingSessions.length;
    let averageConsumption = data.averageBeersPerSession;
    let recentGedronken = data.totalBeersDrankThisMonth;
    let recenteSessies = data.totalDrinkingSessionsThisMonth;
  </script>
  
  <div class="container mx-auto my-8 p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Persoonlijke Stats</h1>
  
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Recent Stats Section -->
      <div class="bg-blue-100 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-700 text-center">Recent</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <DataWidget text="Biertjes gedronken deze maand" databasedata={recentGedronken} />
          <DataWidget text="Zuipsessies deze maand" databasedata={recenteSessies} />
          <DataWidget text="Gem. Consumptie per Sessies" databasedata={recentGedronken / recenteSessies} />
        </div>
      </div>
  
      <!-- Old Stats Section -->
      <div class="bg-purple-100 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-700 text-center">Oud</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <DataWidget text="Totaal gedronken" databasedata={gedronken} />
          <DataWidget text="Totaal zuipsessies" databasedata={sessies} />
          <DataWidget text="Gem. Consumptie per Sessies" databasedata={averageConsumption} />
        </div>
      </div>
  
      <!-- Recent Graph Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-700 text-center">Recent Graphs</h2>
        <div class="h-64 bg-blue-50 rounded-md shadow-sm flex items-center justify-center text-gray-500">Graphs Placeholder</div>
      </div>
  
      <!-- Old Graph Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-700 text-center">Oude Graphs</h2>
        <div class="h-64 bg-purple-50 rounded-md shadow-sm flex items-center justify-center text-gray-500">Graphs Placeholder</div>
      </div>
    </div>
  </div>


  