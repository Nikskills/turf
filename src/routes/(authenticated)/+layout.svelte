<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import "../../app.css"
</script>

<div class="bg-white min-h-screen flex overflow-hidden">
    <aside class="w-40 h-screen hidden md:block fixed">
        <Navbar />
    </aside>
    <main class="ml-40 flex-grow overflow-auto mt-3">
        <slot />
    </main>
</div>
