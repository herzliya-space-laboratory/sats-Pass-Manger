export async function get(req, res, next) {
	const axios = require('axios');
	const query = req.url.split('?')[1];
    
	const now = new Date();
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

	try {
		axios.get(`${process.env.API_URI}/api/v1/satellites/passes?endTime=${nextWeek}`);
		const response = await axios.get(`${process.env.API_URI}/api/v1/pass?${query}`)
		const passes = response.data.data;
		const pageData = response.data.pagination;
		const status = response.status;
		
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
		
		res.end(JSON.stringify({passes, pageData}));
	
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
