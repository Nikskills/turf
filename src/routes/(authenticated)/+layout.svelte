<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import "../../app.css"
</script>

<div class="bg-generalbackground w-screen min-h-screen">
    <div class="flex flex-col sm:flex-row gap-5 h-full">
        <div class="w-full sm:w-1/6 md:w-1/12 lg:w-[5%] h-full"><Navbar /></div>
        <div class="w-full sm:w-5/6 md:w-11/12 lg:w-[95%] overflow-hidden">
            <slot />
        </div>
    </div>
</div>
