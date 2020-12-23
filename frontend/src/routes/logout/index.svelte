<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    
    fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: '',
        });
    
    
    $session.decodedToken = undefined;
    $session.token = undefined;
    goto('/login')
</script>


<svelte:head>
	<title>logout</title>
</svelte:head>

