const axios = require('axios');


export async function get(req, res, next) {
	const { id } = req.params;
    
	const response = await axios.get(`${process.env.API_URI}/api/v1/error/${id}`);
    const error = response.data.data;
    const success = response.data.success;
	const status = response.status;
	

	if (success) {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(error));
	} else {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: response.data.msg
		}));
	}
}

export async function del(req, res, next) {
	const { id } = req.params;
    
	let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
	}
	
	const response = await axios.delete(`${process.env.API_URI}/api/v1/error/${id}`, config);
    const success = response.data.success;
	const status = response.status;
	

	if (success) {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end("");
	} else {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: response.data.msg
		}));
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
    } catch (error) {
        res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: response.data.msg
		}));
	}
}
