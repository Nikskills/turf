<script lang="ts">
    import type { PageData } from "./$types";
    import "../../app.css"
	import Streepknop from "$lib/components/Streepknop.svelte";
    export let data: PageData

    let counts: Record<string, number> = {};

    // Combine actual users with 7 empty users
    let displayUsers = [...data.users, ...Array(7).fill({ name: 'User', image: '' })];

    $: {
        displayUsers.forEach(user => {
            if (user.name && counts[user.name] === undefined) {
                counts[user.name] = 0;
            }
        })
    }

    function count(name: string) {
        counts[name]++;
    }

</script>

<form method="POST" class="max-h-screen flex flex-col w-screen">
    <div class="flex-grow h-full">
        <!-- Title Section -->
        <div class="grid grid-cols-1 min-h-screen justify-between mt-6 mx-4">
            <div class="flex justify-center font-bold mb-12 px-2"> <!-- mb-12 adds more bottom margin -->
                <div class="font-bold text-black w-2/3 my-1">
                    <h1 class="text-2xl">Streep Systeem der Huize Pinguin</h1>
                </div>
                <div class="grid grid-flow-col w-1/3">
                    <a href="/balance" class="w-full"><button class="w-[95%] rounded-md bg-secondary text-generalbackground py-2 text-sm font-semibold shadow-sm mx-2 my-1">Balans</button></a>
                    <a href="/newsupply" class="w-full"><button class="w-[95%] rounded-md bg-secondary text-generalbackground py-2 text-sm font-semibold shadow-sm mx-2 my-1">Nieuwe Voorraad</button></a>
                </div>
            </div>

            <!-- Description Section -->
            <div class="h-full mb-12"> <!-- mb-12 adds more bottom margin between description and content -->
                <div class="grid grid-cols-4">
                    <p class="col-start-2 col-end-4 py-1 px-4 ">
                        Hier kun je bier strepen! Klik op een naam om een biertje toe te voegen. Vergeet niet op verstuur te klikken, anders telt het niet :(
                    </p>
                </div>

                <!-- Main Content Section -->
                <div class="bg-secondary bg-opacity-20 py-2 mx-3 rounded-lg my-2 h-max mt-12"> 
                    <div class="flex flex-row flex-wrap justify-center gap-10 mx-4 my-4">
                        {#each displayUsers as person}
                        {#if person.name != 'Huis'}
                            <div class="flex flex-col my-1 py-2 border-black border rounded-lg w-auto bg-white">
                                <button type="button" on:click={() => count(person.name)}>
                                    <Streepknop name={person.name} source={`src/lib/images/Huisgenootjes/${person.name}.jpg`} />
                                </button>
                                <input type="number" name="{person.name}" class="border-none bg-inherit justify-center text-center w-auto" id={person.name} bind:value={counts[person.name]} readonly>
                            </div>
                        {/if}
                        {/each}
                    </div>

                    <div class="flex justify-center w-full my-5">
                        <button type="submit" class="w-1/4 rounded-md bg-primarybutton text-generalbackground py-2 text-sm font-semibold shadow-sm">
                            Verstuur
                        </button>
                    </div>  
                </div>       
            </div>
        </div>
    </div>
</form>
