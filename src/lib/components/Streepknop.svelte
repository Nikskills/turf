<script>
    export let name = ""
    export let source = ""
</script>


<div class="flex flex-col text-center">
    <div class=" flex justify-center"><img class="h-[90px] w-[90px] border mx-1 rounded-full" src={source} alt="hoofd"></div>
    <div>{name}</div>
</div>