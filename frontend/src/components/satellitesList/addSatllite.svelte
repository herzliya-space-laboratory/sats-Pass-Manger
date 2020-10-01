<script>
    let name = '';
    let satId = '';

    function onSubmit(){
        axios.post('http://localhost:5000/api/v1/satellite', {name, satId})
    }
</script>

<div class = 'box'>
    <form  on:submit= {onSubmit}>
        <input bind:value={name} placeholder="sat name">
        <input bind:value={satId} placeholder="sat id">
        <input type="submit" value="create">
    </form>
</div>

<style>
    input{
        padding: 8px 4px;
        margin: 0;
        box-sizing: border-box;
        border: 1px solid black;
        border-radius: 4px;
        width: 40%;
    }
	
    input[type="submit"]{
        background-color: rgb(0, 0, 200);
        color: white;
        padding: 5px 2px;
        font-size: 20px;
        margin: 0;
        cursor: pointer;
        width: 18%;
    }

    input[type="submit"]:hover {
        background-color: white; 
        color: black; 
    }

    .box{
        border: 2px solid #333;
        padding: 0px;
        margin: 0px;

    }

</style>