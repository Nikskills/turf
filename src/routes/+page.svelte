<script lang='ts'>
    import "../app.css";
    import { enhance } from "$app/forms";
</script>


<body>
    <form method="post" use:enhance>
        <button>Sign out</button>
    </form>
</body>