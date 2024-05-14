<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    export let data: PageData
    let counts: Record<string, number> = {};
    let beschrijving = '';
    let isFormValid = false;

    $: {
        data.users.forEach(user => {
            if (counts[user.name] === undefined) {
                counts[user.name] = 0;
            }
        });
        validateForm();
    }

    function plus(personName: string) {
        counts[personName] += 1;
        validateForm();
    }

    function minus(personName: string) {
        if (counts[personName] > 0) {
            counts[personName] -= 1;
            validateForm();
        } else {
            console.log("cannot be negative"); // Only log if trying to go negative
        }
    }

    function validateForm() {
        isFormValid = beschrijving.trim() !== '' && Object.values(counts).every(count => count >= 0);
    }

</script>


<form method="POST">
    <div class="h-screen w-full flex justify-center items-center bg-gray-100">
        <div class="w-full max-w-lg bg-white p-8 shadow-md rounded-lg">
            <h2 class="text-lg font-semibold text-gray-900 mb-6 flex justify-center">Wie heeft gezopen</h2>

            {#each data.users as person}
                <div class="flex flex-row justify-evenly items-center border border-black rounded-md my-2">
                    <div class="text-gray-800 font-medium">{person.name}</div>
                    <div class="flex flex-row items-center pl-4">
                        <button type="button" on:click={() => minus(person.name)} class="text-red-500 hover:text-red-700">
                            -
                        </button>
                        <input type="number" name="{person.name}" bind:value={counts[person.name]} class="mx-1 text-lg font-semibold border border-white" readonly />
                        <button type="button" on:click={() => plus(person.name)} class="text-green-500 hover:text-green-700">
                            +
                        </button>
                    </div>
                </div>
            {/each}
            <div class="mb-3">
                <label for="beschrijving" class="block text-sm font-medium text-gray-900">Beschrijving</label>
                <input type="text" id="beschrijving" name="beschrijving" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="Vul beschrijving in">
            </div>
            <button type="submit" class="w-full rounded-md bg-primarybutton py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">Verstuur</button>
        </div>
    </div>
</form>
