<script lang="ts">
	import DataWidget from "$lib/components/DataWidget.svelte";
    import type {PageData} from './$types'
    export let data: PageData
    let gedronken = data.totalBeersDrank
    let sessies = data.drinkingSessions.length
    let averageConsumption = data.averageBeersPerSession;
    let recentGedronken = data.totalBeersDrankThisMonth;
    let recenteSessies = data.totalDrinkingSessionsThisMonth;
</script>

<div class="container mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Persoonlijke Stats</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Recent Stats Section -->
        <div class=" p-6 rounded-lg border-solid border border-black">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Recent</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <DataWidget text="Biertjes gedronken deze maand" databasedata={recentGedronken} />
                <DataWidget text="Zuipsessies deze maand" databasedata={recenteSessies} />
                <DataWidget text="Gem. Consumptie per Sessies" databasedata={recentGedronken/recenteSessies} />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-600">Graphs</h3>
        </div>

        <!-- Old Stats Section -->
        <div class=" p-6 rounded-lg border-solid border border-black">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Oud</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <DataWidget text="Totaal gedronken" databasedata={gedronken} />
                <DataWidget text="Totaal zuipsessies" databasedata={sessies} />
                <DataWidget text="Gem. Consumptie per Sessies" databasedata={averageConsumption} />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-600">Graphs</h3>
        </div>
    </div>
</div>
