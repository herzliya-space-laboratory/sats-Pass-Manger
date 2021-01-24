<script>
    import { alert, disableAlert } from '../alert'

</script>

{#if $alert.isActive}
    {#if $alert.isError}
        <div role="alert" class="error bg-red-500 text-white font-bold rounded-t px-4 py-2">
            <h2>
                Error: 
            </h2>
            <div>
                <p> {$alert.msg} </p>
                <p> if not solved please refresh the page</p>
            </div>
            <button on:click = {disableAlert}> ok </button>
        </div>
    {:else}
        <div class="info" role="alert">
            <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                
                <div>
                    <p class="font-bold">alert: </p>
                    <p class="text-sm"> {$alert.msg} </p>
                </div>
            </div>
            <button on:click = {disableAlert}> ok </button>
        </div>
    {/if} 
{/if}

<style>
    .info{
        background: rgb(85, 144, 179);
        color: white;
        border: 4px teal;
        padding: 1rem 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin: 1rem;
        border-radius: 1rem;
    }

    .info div{
        margin: 4px;
    }
    .info p{
        font-size: 1rem;
    }

    .info button{
        font-size: 1.5rem;
        background: 5px rgb(24, 2, 59);
        border: rgb(136, 183, 211);
        border-radius: 0.75rem;
        padding: 0.25rem 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }


    .error{
        background: rgb(235, 14, 14);
        color: white;
        border: 4px rgb(23, 4, 75);
        padding: 1rem 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin: 1rem;
        border-radius: 1rem;
    }

    .error div{
        margin: 4px;
    }
    .error p{
        font-size: 1rem;
    }

    .error button{
        font-size: 1.5rem;
        background: 5px rgb(184, 15, 15);
        border: rgb(136, 183, 211);
        border-radius: 0.75rem;
        padding: 0.25rem 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
</style>
