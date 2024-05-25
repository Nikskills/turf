<script lang="ts">
	import { goto } from "$app/navigation";


    async function handleSignout() {
        const response = await fetch("/api/signout", {
            method: "POST"
        });

        if (response.ok) {
            const data = await response.json();
            if (data.redirect) {
                // Redirect to the login page after successful signout
                goto(data.redirect);
            }
        } else {
            console.error("Failed to sign out");
        }
    }
</script>

<button on:click={handleSignout} class="bg-primarybutton hover:bg-primarybuttondark text-black font-bold py-2 px-4 rounded shadow-md transition-transform duration-300 transform hover:-translate-y-1">
    Log Uit
</button>
