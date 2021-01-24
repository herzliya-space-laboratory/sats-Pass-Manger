const axios = require('axios');

export async function get(req, res, next) {
	const { id } = req.params;
    
	const response = await axios.get(`${process.env.API_URI}/api/v1/error/?sort=-startTime`);
    const errors = response.data.data;
    const success = response.data.success;
	const status = response.status;
	

	if (success) {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(errors));
	} else {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: response.data.msg
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
        res.writeHead(201, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(error));
    } catch (error) {
        res.writeHead(500, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: error.message
		}));
	}
}

