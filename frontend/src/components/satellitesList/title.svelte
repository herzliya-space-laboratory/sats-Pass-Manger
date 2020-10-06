<script>
    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<div class = "Satellite">        
        <p>
            <b class = 'left'>satellite norad id</b>
            <b class = 'right'>satellite norad id</b>
        </p>
</div>


<style>
    .Satellite{
        display:  block;
        border: 1px solid #333;
        border-bottom: 2px dotted rgb(17, 16, 105);
        padding: 5px;
        margin: 0;
    }

    p{   
        display: inline-block;
        text-decoration: none;
		font-size: 2em;
        margin: 10px 0;
        width: 100%;
	}

    b{
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    .right {
        padding-right: 10%;
        float: right; 
    }

    .left {
        padding-left: 10%;
        float: left; 
    }

</style>