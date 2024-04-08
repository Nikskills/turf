<script>
	import Navbar from "$lib/components/Navbar.svelte";

</script>

<body>
    <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between"> 
            <!-- de bovenste row -->
            <div>Dashboard</div>
            <div class="flex flex-row">
                <!-- buttons -->
                <div>Button</div>
                <div>Button</div>
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
