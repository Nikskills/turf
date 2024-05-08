<script lang="ts">
	import DataWidget from "$lib/components/DataWidget.svelte";
    import type {PageData} from './$types'
    export let data: PageData
    let gedronken = data.totalBeersDrank
    let sessies = data.zuipsessies.length
</script>

<div class="h-screen">
    <h1>statistieken voor het huis</h1>
    <div class="flex flex-row justify-evenly h-full">
        <div class="flex flex-row justify-between w-1/4 h-full">
            <div class="w-full h-full">
                <div class="flex flex-row justify-between h-full">
                    <div><DataWidget text="Biertjes gedronken door het huis" databasedata={gedronken}/></div>
                    <div><DataWidget text="Zuipsessies in totaal" databasedata={sessies}/></div>
                </div>
                <div>Graphs</div>
            </div>
            
        </div>
        <!-- <div class="flex flex-row justify-between w-1/4">
            <div class="w-full">
                <div>Oud</div>
                <div class="flex flex-row justify-between">
                    <div><DataWidget/></div>
                    <div><DataWidget/></div>
                </div>
                <div>Graphs</div>
            </div>
            
        </div> -->
    </div>
</div>