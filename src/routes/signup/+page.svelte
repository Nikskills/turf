<script lang="ts">
    import { enhance } from "$app/forms";
	import  "../../app.css";
</script>

<form method="post" use:enhance class="h-screen w-full flex justify-center items-center bg-generalbackground">
    <div class="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Nieuw Account</h2>

        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
            <input type="email" name="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="Enter your email" required>
        </div>

        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-900">Naam</label>
            <input type="text" name="name" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="Enter your name" required>
        </div>

        <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-900">Wachtwoord</label>
            <input type="password" name="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" placeholder="Enter your password" required>
        </div>

        <button type="submit" class="w-full rounded-md bg-primarybutton py-2 text-sm font-semibold text-white shadow-sm hover:bg-primarybuttondark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">Verder</button>
		<a href="/login">Ik heb al een account</a>
    </div>
</form>
