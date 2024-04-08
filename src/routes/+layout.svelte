<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import "../app.css"
</script>

<div class="bg-generalbackground">
    <div class="flex flex-row gap-5 ">
        <div class="w-[5%]"><Navbar /></div>
        <div class="w-1/6">
            <slot />
        </div>
    </div>
</div>
