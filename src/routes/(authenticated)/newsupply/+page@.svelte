<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    import '../../../app.css'

    let users = data.users;
    let kratjes = 0;
    let gekochtDoor = '';
    let kosten = 0;
    let biertjesPerKrat = 0;
    // Error messages
    let errors = {
        hoeveelheid: '',
        gekochtDoor: '',
        kosten: '',
        biertjesPerKrat: ''
    };
</script>

<div class="h-screen w-full flex justify-center items-center bg-gray-100">
    <form class="w-full max-w-lg bg-white p-8 shadow-md rounded-lg" method="post">
        <!-- Terug Button -->
        <div class="flex justify-start mb-4">
            <div class="w-[14%] py-2 rounded-lg  text-black hover:opacity-80">
                <button on:click={() => window.history.back()} type="button">Terug</button>
            </div>
        </div>

        <h2 class="text-lg font-semibold text-gray-900 mb-6">Nieuwe Voorraad</h2>
        <div class="space-y-6">
            <div>
                <label for="kratjes" class="block text-sm font-medium text-gray-900">Hoeveelheid kratjes:</label>
                <input type="number" id="kratjes" name="hoeveelheid" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="Vul aantal in" bind:value={kratjes}>
                {#if errors.hoeveelheid}
                    <p class="text-red-500 text-xs italic">{errors.hoeveelheid}</p>
                {/if}
            </div>
            <div>
                <label for="biertjesPerKrat" class="block text-sm font-medium text-gray-900">Hoeveelheid biertjes per krat:</label>
                <input type="number" id="biertjesPerKrat" name="biertjesPerKrat" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="Vul aantal in" bind:value={biertjesPerKrat}>
                {#if errors.biertjesPerKrat}
                    <p class="text-red-500 text-xs italic">{errors.biertjesPerKrat}</p>
                {/if}
            </div>
            <div>
                <label for="namen" class="block text-sm font-medium text-gray-900">Gekocht door:</label>
                <select id="namen" name="namen" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" bind:value={gekochtDoor}>
                    <option value="">Selecteer een gebruiker</option>
                    {#each data.users as user}
                        <option value="{user.name}" selected={user.name === gekochtDoor}>{user.name}</option>
                    {/each}
                </select>
                {#if errors.gekochtDoor}
                    <p class="text-red-500 text-xs italic">{errors.gekochtDoor}</p>
                {/if}
            </div>
            <div>
                <label for="kosten" class="block text-sm font-medium text-gray-900">Totale kosten</label>
                <input type="text" id="kosten" name="kosten" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="Vul totale kosten in" bind:value={kosten}>
                {#if errors.kosten}
                    <p class="text-red-500 text-xs italic">{errors.kosten}</p>
                {/if}
            </div>
            <div>
                <label for="datum" class="block text-sm font-medium text-gray-900">Gekocht op</label>
                <input type="date" id="datum" name="datum" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
            </div>
            <div>
                <button type="submit" class="w-full rounded-md text-white bg-primarybutton py-2 text-sm font-semibold shadow-sm hover:primarybutton hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">Verstuur</button>
            </div>
        </div>
    </form>
</div>
