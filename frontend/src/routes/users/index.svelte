<script context="module">
	import { setAlert } from '../../alert';
	export async function preload(page, session) {

        if(!session.token)
            this.redirect(302, '/login');

        try {
            const res = await this.fetch(`users/users`);
            if(res.error);
                setAlert(res.error);

            const users = await res.json();

            if (res.status != 200)
                setAlert(parsed.message, true);
            return {users: users};
        } catch (error) {
            setAlert(error);
        }
    }
</script>

<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    
    import UsersListTitle from '../../components/users/usersListTitle';
    import User from '../../components/users/user';
    import AddUser from '../../components/users/addUser';

    export let users;

    const createUser = (userToCreate) => async () => { 
        const res =  await fetch("/users/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": "Bearer " +  $session.token,  
            },
            body: JSON.stringify(userToCreate) ,
            });

        const data = await res.json();

        console.log(data);
        if (res.status != 200)
            setAlert(data.message, true);
        else
            users = [ data, ...users];
    }

    const deleteUser = (id) => async () => {
        try {
            const res =  await fetch(`/users/${id}.json`, {
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": "Bearer " +  $session.token,  
            }
            });
            
            const data = await res.text();
            if (res.status != 200)
                setAlert(data.message, true);
            else
                users = users.filter(user => user._id != data);
        } catch (error) {
            setAlert(error);   
        }
    }

</script> 



<div class='max-w-screen-xl m-auto'>
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow-white overflow-hidden border-b border-gray-800 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 ">
                        <UsersListTitle/>
						<div class="h-3/4 overflow-y-auto">
							<tbody class="w-full bg-black-100 divide-y divide-gray-200 flex flex-col items-center justify-between">
								{#each users as user, i}
                                    <div class =  { "w-full " + (i % 2 == 0 ? 'bg-gray-800': 'bg-black')}>
									    <User {user} {deleteUser}/>
                                    </div>
								{/each}
							</tbody>
						</div>
					</table>
                    {#if $session.decodedToken.role == "admin"}
                        <AddUser {createUser}/>
                    {/if}
				</div>
			</div>
		</div>
	</div>	
</div>
