<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import "../../app.css"
</script>

<div class="bg-generalbackground w-100% h-100%">
    <div class="flex flex-row gap-5 ">
        <div class="w-[5%]"><Navbar /></div>
        <div class="w-[95%]">
            <slot />
        </div>
    </div>
</div>
