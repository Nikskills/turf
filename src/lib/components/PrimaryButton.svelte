<script>
    /**
	 * @type {string}
	 */
     export let text


     import { createEventDispatcher } from 'svelte';
     const dispatch = createEventDispatcher();
</script>

<button class="bg-primarybutton hover:bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded shadow-md transition-transform duration-300 transform hover:-translate-y-1"
    on:click={(event) => dispatch('click', event)} >   
    { text }
</button>

