<script lang="ts">
	import { enhance } from "$app/forms";
    import  "../../app.css";
</script>


<div class="bg-generalbackground w-screen min-h-screen">
    <form method="post" use:enhance>
        <div class="h-screen w-full flex justify-center items-center bg-generalbackground">
            <div class="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
                <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Log in</h2>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
                    <input type="email" name="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400  focus:ring-opacity-50" placeholder="Vul je email in" required>
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
                    <input type="password" name="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400  focus:ring-opacity-50" placeholder="Vul je wachtwoord in" required>
                </div>

                <button type="submit" class="w-full rounded-md bg-primarybutton py-2 text-sm font-semibold  shadow-sm hover:bg-primarybuttondark focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Continue</button>
                <a href="/signup" class="">Ik heb nog geen account</a>
            </div>
            
        </div>
    </form>
</div>