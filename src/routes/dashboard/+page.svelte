<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import PrimaryButton from "$lib/components/PrimaryButton.svelte";
	import { text } from "@sveltejs/kit";
</script>

<body>
    <div class="flex flex-col w-full mt-5">
        <div class="flex flex-row justify-between"> 
            <!-- de bovenste row -->
            <div>Dashboard</div>
            <div class="flex flex-row gap-4 mr-10">
                <!-- buttons -->
                <div><PrimaryButton text="Nieuwe Voorraad"/></div>
                <div><PrimaryButton text="Ik heb gezopen"/></div>
            </div>
        </div>
        <div>
            <!-- de onderste row -->
            <div class="flex flex-col">
                <div>
                    <!-- row met stats -->
                    stats
                </div>
                <div>
                    <!-- row met tabel -->
                    tabel
                </div>
            </div>
        </div>
    </div>
    
</body>
