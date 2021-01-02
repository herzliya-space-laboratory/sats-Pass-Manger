<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    import axios from "axios";
    import { createForm } from "svelte-forms-lib";
    
    const {
      form,
      errors,
      state,
      handleChange,
      handleSubmit,
      handleReset
    } = createForm({
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit: async values => {

        const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(values),
        });

        const parsed = await response.json();
        
        if (parsed.error)
            alert(JSON.stringify( parsed.error));
        else
        {
            $session.token = parsed.token;
            $session.decodedToken = parsed.decodedToken;
            goto("/");
        }

      }
    });
</script>


<svelte:head>
	<title>login</title>
</svelte:head>



<div class="shadow-white w-3/4 m-auto overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-center text-4xl leading-6 font-medium text-white">
            login
        </h3>
    </div>

    <div class="text-black">
            <div class="m-auto bg-gray-50 px-4 py-5">
					<input class="block sm:w-1/2 w-full m-auto" type="email" placeholder="enter email" name = "email" bind:value={$form.email}/>
            </div>

            <div class="m-auto bg-gray-50 px-4 py-5">
					<input class="block sm:w-1/2 w-full m-auto" type="password" placeholder="enter password" name = "password" bind:value={$form.password}/> 
            </div>

    </div>
		
    <div class="flex">
        <button 
            type="button" 
            on:click={handleSubmit}
            class="m-5 inline-flex items-center px-4 py-2 border border-gray-300 text-xl leading-5 font-medium rounded-md text-white bg-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
            >
                submit
        </button>
    </div>

</div>


<style>
	input {
		padding: 6px 10px;
		margin: 8px 0;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 4px;
	}

	input:focus {
		background-color: lightblue;
	}


	button {
		background-color:  rgb(142, 142, 142);
		border: black 1px;
		border-radius: 25px;
		color: black;
		padding: 5px 10px;
		margin: 10px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}

    button ~ button {
      margin-left: 15px;
    }

</style>