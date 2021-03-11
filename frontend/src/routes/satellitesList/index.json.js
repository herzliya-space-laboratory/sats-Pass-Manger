const axios = require('axios');

export async function get(req, res, next) {
	const query = req.url.split('?')[1];
    
    try 
    {
        const response = await axios.get(`${process.env.API_URI}/api/v1/satellite/`);
        
        const satellites = response.data.data;
        const status = response.status;
        
        res.writeHead(status, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({satellites}));
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

    const  { name, satId } = req.body;
    
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
	    const response = await axios.post(
            `${process.env.API_URI}/api/v1/satellite/`,
            { name, satId }, config);
        const satellite = response.data.data;
        const status = response.status;
        
        res.writeHead(status, {
            'Content-Type': 'application/json'
        });
    
        res.end(JSON.stringify(satellite));  
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