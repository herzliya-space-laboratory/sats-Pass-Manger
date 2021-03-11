import axios from 'axios';

export async function get(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }
    try {
        const response = await axios.get(`${process.env.API_URI}/api/v1/user`, config);
        const users = response.data.data; 
        
        res.end(JSON.stringify(users));
        res.writeHead(response.status, {
			'Content-Type': 'application/json'
		});
    }
	catch (error) 
	{
        res.writeHead(error.response.status, {
			'Content-Type': 'application/json'
		});

		res.end(
			JSON.stringify({
				message: error.response.data.error,
				status: error.response.status
		}));
	}
        
}


export async function post(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
        const response = await axios.post(`${process.env.API_URI}/api/v1/register`, req.body, config);
        const newUser = response.data.data; 

        res.writeHead(response.status, {
			'Content-Type': 'application/json'
		});
        
        res.end(JSON.stringify(newUser));    
    }
	catch (error) 
	{
        res.writeHead(error.response.status, {
			'Content-Type': 'application/json'
		});

		res.end(
			JSON.stringify({
				message: error.response.data.error,
				status: error.response.status
		}));
	}
}