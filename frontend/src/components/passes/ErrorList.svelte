<script>
    import ErrorCard from './ErrorCard'
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    export let users;
    export let formErrors;
    export let submitError;
    export let componentId;

    const toggleModal = (modalID) => () => {
        document.getElementById(modalID).classList.toggle("hidden");
        document.getElementById(modalID).classList.toggle("flex");
    }


    function reloadList(newError, isNew){
        if(isNew)
            formErrors = [ ...formErrors, newError];
        else{
            formErrors = formErrors.map(error => error._id == newError._id? newError: error);
        }

        submitError();
    }

    function removeFromList(id){
        formErrors = formErrors.filter(error => error._id !== id);
        submitError();
    }
</script>

{#each formErrors as error, i}
    <div class="inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-700 text-white rounded-full text-xl hover:text-gray-500 hover:bg-gray-200 mr-1 mt-1">

        <ErrorCard toggleModal = {toggleModal(`error-id-${componentId + '-' + i}`)} {reloadList} {removeFromList} modalIDToUse = {`error-id-${componentId + '-' + i}`} {error} {users} ErrorId={error._id}/> 
        <h3 class = "text-sm font-medium hover:text-gray-500 hover:bg-gray-200 m-2">
            {formErrors[i].hypothesis}
        </h3>

        <button 
            on:click={toggleModal(`error-id-${componentId + '-' + i}`)}
            class="inline-flex items-center text-xl leading-5 font-medium rounded-mdfocus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            +
        </button>
    </div>
{/each}

{#if $session.token}
    <ErrorCard toggleModal = {toggleModal(`error-id-new-${componentId}`)} {reloadList}  modalIDToUse = {`error-id-new-${componentId}`} {users} /> 
    <button 
        class="m-2 inline-flex items-center px-2 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
        on:click={toggleModal(`error-id-new-${componentId}`)}>
            add error
    </button>
{/if}
