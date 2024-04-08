<script>
	import DataWidget from "$lib/components/DataWidget.svelte";
    import PrimaryButton from "$lib/components/PrimaryButton.svelte";
</script>

<body>
    <div class="flex flex-col w-full mt-5 h-full">
        <div class="flex flex-row justify-between mr-4"> 
            <!-- de bovenste row -->
            <div class="font-bold text-3xl">Dashboard</div>
            <div class="flex flex-row gap-4">
                <!-- buttons -->
                <div><PrimaryButton text="Nieuwe Voorraad"/></div>
                <div><PrimaryButton text="Ik heb gezopen"/></div>
            </div>
        </div>
        <div>
            <!-- de onderste row -->
            <div class="flex flex-col mt-10 mr-4">
                <div>
                    <!-- row met stats -->
                    <div class="flex flex-row justify-between">
                        <div class="w-1/6"></div>
                        <div class="w-1/3 font-bold text-xl flex flex-col">
                            Huis
                            <div class="flex flex-row font-normal text-lg pt-4 gap-10">
                                <div><DataWidget text='Biertjes Over' data='0'/></div>
                                <div><DataWidget text='Totaal Gedronken' data='0'/></div>
                            </div>
                        </div>
                        <div class="w-1/3 font-bold text-xl">
                            Persoonlijke Zuipstats
                            <div class="flex flex-row font-normal text-lg pt-4 gap-10">
                                <div><DataWidget text='Biertjes Over' data='0'/></div>
                                <div><DataWidget text='Totaal Gedronken' data='0'/></div>
                            </div>
                        </div>
                        <div class="w-1/6"></div>
                    </div>
                </div>
                <div>
                    <!-- row met tabel -->
                    tabel
                </div>
            </div>
        </div>
    </div>
    
</body>
