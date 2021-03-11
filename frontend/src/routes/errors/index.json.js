const axios = require('axios');

export async function get(req, res, next) {    

	try
	{
		const response = await axios.get(`${process.env.API_URI}/api/v1/error/?sort=-startTime`);
		const errors = response.data.data;
		const status = response.status;
		

		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(errors));	
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



export async function post(req, res, next) {
	const errorToCreate = req.body;
	let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
		const response = await axios.post(`${process.env.API_URI}/api/v1/error/`, errorToCreate, config);
		const error = response.data.data;
        res.writeHead(response.status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(error));
    } catch (error) {        
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

