const axios = require('axios');
    
export async function get(req, res, next) {
	const { id } = req.params;
	try
	{
		const response = await axios.get(`${process.env.API_URI}/api/v1/pass/${id}?sort=-startTime`);
			
		const passes = response.data.data;
		const status = response.status;
	
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(passes));
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

export async function put(req, res, next) {
	let url = req.query.before == "true" ?
		`${process.env.API_URI}/api/v1/pass/updatePlan/${req.params.id}`:
		`${process.env.API_URI}/api/v1/pass/updateWhatWasExequte/${req.params.id}`;

	let config = {
		headers: {
			authorization: "Bearer " + req.session.token,
		}
	}

	try
	{
		const response =  await axios.put(url, req.body, config);

		const status = response.status;
		const { passes } = response.data.data;

		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(passes));
	
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