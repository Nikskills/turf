<script>
    export let bestDrinkers = new Map()
</script>

<div class="bg-white p-4 rounded-lg shadow-lg w-3/4">
    <h2 class="text-xl font-bold mb-4 text-gray-700">Top 3 Zuiplappen</h2>
    <ul class="space-y-2">
        {#each bestDrinkers as consumer}
            <li class="flex justify-between">
                <span>{consumer[0]}</span>
                <span class="font-bold">{consumer[1]} biertjes</span>
            </li>
        {/each}
    </ul>
</div>