export async function get(req, res, next) {
	const { id } = req.params;
	const axios = require('axios');
	let error;
	
	const now = new Date();
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
	const query = req.url.split('?')[1];
	
	axios
		.get(`http://localhost:4000/api/v1/satellite/passes/${id}?endTime=${nextWeek}`)
		.catch(e => console.log(e));

	const response = await axios
		.get(`http://localhost:4000/api/v1/satellite/${id}?${query}`)
		.catch(e => error = e);

	if(!error){
		const satellite = response.data.data;
		const page =  response.data.pagination;
		const success = response.data.success;
		const status = response.status;
	
		if (success) {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify({satellite, page}));
		} else {
			res.writeHead(status, {
				'Content-Type': 'application/json'
			});

			res.end(JSON.stringify({
				message: response.data.msg
			}));
		}
	}
	else{
		res.writeHead(error.status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: error.data.msg
		}));
	}
}
