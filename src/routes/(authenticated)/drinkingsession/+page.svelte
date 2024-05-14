<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData

    
    let counts: Record<string, number> = {};
    $ : {
        data.users.forEach(user => {
            if (counts[user.name] === undefined){
                counts[user.name] = 0;
            }});
    }
    function plus(personName: string) {
        counts[personName] += 1;
    }
    function minus(personName: string){
        if (counts[personName] > 0){
            counts[personName] -= 1;
        }
        console.log("cannot be negative")
    }
    
</script>


<div class="h-screen w-full flex justify-center items-center bg-gray-100">
    <form class="w-full max-w-lg bg-white p-8 shadow-md rounded-lg" method="">
        <h2 class="text-lg font-semibold text-gray-900 mb-6 flex justify-center">Wie heeft gezopen</h2>

        {#each data.users as person}
            <div class="flex flex-col mb-4 mt-1 w-full rounded-md border border-black shadow-sm">
                <div class="flex flex-row justify-evenly items-center">
                    <div class="text-gray-800 font-medium">{person.name}</div>
                    <div class="flex flex-row items-center  pl-4">
                        <button on:click={() => minus(person.name)} class="text-red-500 hover:text-red-700">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path></svg>
                        </button>
                        <div class="px-4 text-lg font-semibold">{counts[person.name]}</div>
                        <button on:click={() => plus(person.name)} class="text-green-500 hover:text-green-700">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        {/each}
        <div>
            <button type="submit" class="w-full rounded-md bg-primarybutton py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">Verstuur</button>
        </div>
    </form>
</div>
