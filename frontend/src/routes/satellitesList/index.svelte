
<script context="module">
	import { setAlert } from '../../alert';

    export async function preload(page, session) {
        let res = await this.fetch("satellitesList.json");

        
        const { satellites, message } =  await res.json();
        
        if(res.status != 200)
            setAlert(message);

        return { satellites };
	}
</script>

<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    import Satellite from '../../components/satellitesList/Satellite.svelte';
    import AddSatellite from '../../components/satellitesList/addSatellite.svelte';
    import Title from '../../components/satellitesList/title.svelte';
    
    export let satellites;
    
    let name = '';
    let satId = '';
    
    async function createSat(){
        const res =  await fetch(`satellitesList.json`, {
            method: "POST",
            body: JSON.stringify( {name, satId}),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            })
            .catch(e => setAlert(e));
        
        const data = await res.json();

        if (res.status != 200)
            setAlert(data.message);
            
        satellites = [ data, ...satellites];        
    }

    const deleteSat = (id) => async () => {
        fetch(`/satellitesList/${id}.json`, {
            method: "DELETE",
            body: JSON.stringify( {name, satId}),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            })
            .then( res => {
                if(res.status == 200)
                    satellites = satellites.filter(sat => sat._id != id);
                else
                    res.json().then(({ message }) => {
                        setAlert(JSON.stringify(message));
                    });
            })
            .catch( e => setAlert(e, true));

       
                   
    }
</script>


<svelte:head>
	<title> satellites list </title>
</svelte:head>

<div class="container flex flex-col m-auto">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 ">
                    <Title/>
                    <div class="h-3/4 overflow-y-auto">
                        <tbody class="bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
                            {#each satellites as satellite, i}
                                <div class =  { "w-full " + (i % 2 == 0 ? 'bg-gray-800': 'bg-black')}>
                                    <Satellite {satellite} {deleteSat}/>
                                </div>
                            {/each}
                        </tbody>
                    </div>
                </table>
                {#if $session.token}
                    <AddSatellite bind:name = {name} bind:satId = {satId} {createSat}/>
                {/if}
            </div>
        </div>
    </div>
</div>
