<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import "../../app.css"
</script>

<div class="bg-generalbackground min-h-screen flex overflow-hidden">
    <aside class="w-16 md:w-18 2xl:w-24 h-full">
        <Navbar />
    </aside>
    <main class="flex-grow overflow-hidden">
        <slot />
    </main>
</div>

