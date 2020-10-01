<script>
    
    import axios from "axios";
    
    let name = '';
    let satId = '';
    
    function sendSatllliteToDataBase(){
        axios.post("http://localhost:5000/api/v1/satellite/", {name, satId})
    }
</script>

<div class='box'>
    <form on:submit={sendSatllliteToDataBase}>
        <input bind:value={name} placeholder="satlllite name" />
        <input bind:value={satId} placeholder="norad id" />
        <input type='submit' value='create'/>
    </form>
</div>

<style>
    input{
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 1px solid black;
        border-radius: 4px;
        width: 40%;
    }

    input[type="submit"]{
        background-color: blue; /* Green */
        border: none;
        color: white;
        padding: 12px 32px;
        text-align: center;
        display: inline-block;
        font-size: 1em;
        margin: 4px 2px;
        cursor: pointer;
        width: 16%;
    }

    input[type="submit"]:hover {
        background-color: white; 
        color: black; 
    }

    .box{
        border: 1px solid #333;
        padding: 10px;
        margin: 0;
    }
</style>