const axios = require('axios');

export async function get(req, res, next) {
	const { id } = req.params;
	let error;
	
	const now = new Date();
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
	const query = req.url.split('?')[1];
	
	try {
		axios
			.get(`${process.env.API_URI}/api/v1/satellite/passes/${id}?endTime=${nextWeek}`)
			.catch(e => console.log(e));

		const response = await axios
			.get(`${process.env.API_URI}/api/v1/satellite/${id}?${query}`)
			.catch(e => error = e);
			
		const satellite = response.data.data;
		const page =  response.data.pagination;
		const status = response.status;

		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({satellite, page}));
	
	} catch (error) {
		res.writeHead(error.status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: error.data.msg
		}));
	}
}


export async function del(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
        const response = await axios.delete(`${process.env.API_URI}/api/v1/satellite/${req.params.id}`, config);

		res.writeHead(response.status, {
			'Content-Type': 'application/json'
		});
        
		res.end(response.data.data._id);
    
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
