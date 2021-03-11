const axios = require('axios');


export async function get(req, res, next) {
	const { id } = req.params;
    
    try 
    {
		const response = await axios.get(`${process.env.API_URI}/api/v1/error/${id}`);
		const error = response.data.data;
		const status = response.status;

		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(error));
	} 
    catch (error) 
    {
        res.writeHead(error.response.status, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({message: error.response.data.error, status: error.response.status}));
    }
}

export async function del(req, res, next) {
	const { id } = req.params;
    
	let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
	}
	
    try 
    {
		const response = await axios.delete(`${process.env.API_URI}/api/v1/error/${id}`, config);
		
		const status = response.status;
		

		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end("");} 
	catch (error) 
	{
		res.writeHead(error.response.status, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({message: error.response.data.error, status: error.response.status}));
	}
		
}

export async function put(req, res, next) {
	const { id } = req.params;
	const errorToCreate = req.body;
	let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
		const response = await axios.put(`${process.env.API_URI}/api/v1/error/${id}`, errorToCreate,config);
		const error = response.data.data;
		const status = response.status;

        res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(error));
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
