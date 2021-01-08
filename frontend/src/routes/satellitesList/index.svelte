
<script context="module">
    import axios from "axios";
    
    export async function preload(page, session) {
        let res = await axios.get("http://localhost:4000/api/v1/satellite/");
        const data = res.data.data;
        return { data };
	}
</script>

<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import Satellite from '../../components/satellitesList/Satellite.svelte';
    import AddSatellite from '../../components/satellitesList/addSatellite.svelte';
    import Title from '../../components/satellitesList/title.svelte';
    
    export let data;
    
    let name = '';
    let satId = '';
    
    async function createSat(){
        let config = {
            headers: {
                authorization: "Bearer " +  $session.token,
            }
        }
        
        await axios.post("http://localhost:4000/api/v1/satellite/", {name, satId}, config)
            .then(res => data = [ res.data.data, ...data])
            .catch(e => alert( e.response.data.error));
            
        
    }

    const deleteSat = (id) => async () => {
        let config = {
            headers: {
                authorization: "Bearer " +  $session.token,
            }
        }
        
        await axios.delete(`http://localhost:4000/api/v1/satellite/${id}`, config)
            .then((res) => data = data.filter(sat => sat._id != id))
            .catch(e => alert( e.response.data.error));
            
        
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
                            {#each data as satellite}
                                <Satellite {satellite} {deleteSat}/>
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
