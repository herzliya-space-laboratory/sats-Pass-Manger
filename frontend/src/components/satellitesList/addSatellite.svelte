<script>
    
    import axios from "axios";
    
    let name = '';
    let satId = '';
    
    function sendSatllliteToDataBase(){
        axios.post("http://localhost:4000/api/v1/satellite/", {name, satId})
    }
</script>

<div class='box'>
    <form on:submit={sendSatllliteToDataBase}>
        <input class="appearance-none ml-3 inline-block w-1/3 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" bind:value={name} placeholder="satlllite name" />
        <input class="appearance-none inline-block w-1/3 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" bind:value={satId} placeholder="norad id" />
        <input type='submit' value='create' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
    </form>
</div>
