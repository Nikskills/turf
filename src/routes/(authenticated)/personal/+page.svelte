<script lang="ts">
	import DataWidget from "$lib/components/DataWidget.svelte";
    import type {PageData} from './$types'
    export let data: PageData
    let gedronken = data.totalBeersDrank
    let sessies = data.drinkingSessions.length
</script>

<div>
    <h1>persoonlijke stats</h1>
    <div class="flex flex-row justify-evenly">
        <div class="flex flex-row justify-between w-1/4">
            <div class="w-full">
                <div>Recent</div>
                <div class="flex flex-row justify-between">
                    <div><DataWidget text="Biertjes gedronken deze maand" databasedata={gedronken}/></div>
                    <div><DataWidget text="Zuipsessies deze maand" databasedata={sessies}/></div>
                </div>
                <div>Graphs</div>
            </div>
            
        </div>
        <div class="flex flex-row justify-between w-1/4">
            <div class="w-full">
                <div>Oud</div>
                <div class="flex flex-row justify-between">
                    <div><DataWidget/></div>
                    <div><DataWidget/></div>
                </div>
                <div>Graphs</div>
            </div>
            
        </div>
    </div>
</div>