
<script>
    export let pass;

    const didThePassHappen = new Date(pass.startTime) < new Date();
    const passPageUrl = `/${didThePassHappen ? 'whatWasInAPass' : 'planPass'}/${pass._id}`;

</script>

<div>
    <a href={passPageUrl}>
        <table>
            <tr>
                <td> {pass.Satellite.name} </td>
                <td> {new Date(pass.startTime).toLocaleString().replace(',', ' ')} </td>
                <td> {new Date(pass.endTime).toLocaleString().replace(',', ' ')} </td>
                <td> {pass.maxElevation.toFixed(2)} </td>
                <td> {pass.duration} </td>
            </tr>
        </table>
    </a>
</div>

<style>
    a{   
        display: inline-block;
        text-decoration: none;
		font-size: 1.2em;
        margin: 10px 0;
        width: 100%;
	}

	a:hover 
	{
		color: blue;
	}

	div{
		border-bottom: 2px dotted blue;
	}

    td{
        text-align: center; 
        width: 22%;
    }
</style>