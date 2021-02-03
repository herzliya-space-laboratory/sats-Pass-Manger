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
        res.end(response.data.data._id);

    } catch (error) {
        res.end(JSON.stringify({error: error.response.data.error}));
        
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

        res.end(JSON.stringify({user, page}));

    } catch (error) {
        res.end(JSON.stringify({error: error.response.data.error, status: error.response.status}));
        
    }
}        