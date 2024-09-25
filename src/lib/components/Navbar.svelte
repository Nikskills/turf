<script>
    import { UserSettingsOutline} from 'flowbite-svelte-icons'
    import { page } from '$app/stores';  
    
</script>

<div class="bg-primarybutton h-full">
    <div class="flex justify-center items-center"><a href="/dashboard"><img src="logo.png" alt="alt" class="w-20 h-20"/></a></div>
    <div class="flex flex-col justify-evenly h-full">
        <div class="flex items-center hover:bg-primarybutton hover:opacity-60"><a href="/personal" class=" flex items-center text-white"><img src="User_fill.png" class="w-10 h-10 {$page.url.pathname == '/personal' ? 'border-2 border-white' : ''}" alt="alt"/><span class="ml-2">Persoonlijk</span></a></div>
        <div class="flex items-center hover:bg-primarybutton hover:opacity-60"><a href="/statistics" class="flex items-center text-white"><img src="Chart.png" alt="alt" class="w-10 h-10 {$page.url.pathname == '/statistics' ? 'border-2 border-white' : ''}"/><span class="ml-2">Statistieken</span></a></div>
        <div class="flex items-center hover:bg-primarybutton hover:opacity-60"><a href="/transactions" class="flex items-center text-white"><img src="Wallet_duotone_line.png" alt="alt" class="w-10 h-10 {$page.url.pathname == '/transactions' ? 'border-2 border-white' : ''}"/><span class="ml-2">Transacties</span></a></div>
        <div class="flex items-center hover:bg-primarybutton hover:opacity-60"><a href="/settings" class=" flex items-center text-white"><UserSettingsOutline size=xl class="{$page.url.pathname == '/settings' ? 'border-2 border-white text-white' : 'text-white'}"/><span class="ml-2">Instellingen</span></a></div>
    </div>
</div>

