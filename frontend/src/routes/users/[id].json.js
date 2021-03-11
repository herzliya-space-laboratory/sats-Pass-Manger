import axios from 'axios';

export async function del(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }
    try {
        const response = await axios.delete(`${process.env.API_URI}/api/v1/user/${req.params.id}`, config);

        res.writeHead(200, {
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


export async function put(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
        const response = await axios.put(`${process.env.API_URI}/api/v1/user/${user._id}`, res.body, config);
        
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


export async function get(req, res, next) 
{
	const { id } = req.params;
	const query = req.url.split('?')[1];

    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
        const response = await axios.get(`${process.env.API_URI}/api/v1/user/${id}?${query}`, config);
        const user = response.data.data;
		const page =  response.data.pagination;

        res.writeHead(response.status, {
			'Content-Type': 'application/json'
		});
        
        res.end(JSON.stringify({user, page}));

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