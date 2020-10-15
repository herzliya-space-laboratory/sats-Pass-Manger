export async function get(req, res, next) {
	const axios = require('axios');
    
	const now = new Date();
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
	await axios.get(`http://localhost:4000/api/v1/satellites/passes?endTime=${nextWeek}`);
	const response = await axios.get(`http://localhost:4000/api/v1/pass?sort=-startTime&limit=0`)
    const passes = response.data.data;
    const success = response.data.success;
    const status = response.status;

	if (success) {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});
  
		res.end(JSON.stringify(passes));
	} else {
		res.writeHead(status, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: response.data.msg
		}));
	}
}
