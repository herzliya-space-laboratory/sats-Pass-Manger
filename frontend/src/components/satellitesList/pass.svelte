
<script>
    export let startTime;
    export let endTime;
    export let maxElevation;
    export let duration;
    export let _id;

    const didThePassHappen = new Date(startTime) < new Date();
    const passPageUrl = `/${didThePassHappen ? 'whatWasInAPass' : 'planPass'}/${_id}`;

</script>

<div>
    <a href={passPageUrl}>
        <table>
            <tr>
                <td> {new Date(startTime).toLocaleString().replace(',', ' ')} </td>
                <td> {new Date(endTime).toLocaleString().replace(',', ' ')} </td>
                <td> {maxElevation.toFixed(2)} </td>
                <td> {duration} </td>
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
        width: 32.5%;
    }
</style>