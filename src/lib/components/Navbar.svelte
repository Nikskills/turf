<script>
    import { UserSettingsOutline} from 'flowbite-svelte-icons'
    import { page } from '$app/stores';  
    
</script>

<div class="bg-navbarpurple h-full">
    <div><a href="/dashboard"><img src="logo.png" alt="alt"/></a></div>
    <div class="flex flex-col justify-evenly h-screen">
        <div><a href="/personal" class="hover:bg-gray-800 "><img src="User_fill.png" class="{$page.url.pathname == '/personal' ? 'border-2 border-white' : ''}" alt="alt"/></a></div>
        <div><a href="/statistics" class="hover:bg-gray-800"><img src="Chart.png" alt="alt" class="{$page.url.pathname == '/statistics' ? 'border-2 border-white' : ''}"/></a></div>
        <div><a href="/transactions" class="hover:bg-gray-800"><img src="Wallet_duotone_line.png" alt="alt" class="{$page.url.pathname == '/transactions' ? 'border-2 border-white' : ''}"/></a></div>
        <div><a href="/settings" class="hover:bg-gray-800"><UserSettingsOutline size=undefined class="{$page.url.pathname == '/settings' ? 'border-2 border-white text-white' : 'text-white'}"/></a></div>
    </div>
</div>
