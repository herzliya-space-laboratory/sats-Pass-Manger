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
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
        const response = await axios.get(`${process.env.API_URI}/api/v1/user/${req.params.id}`, config);
        const user = response.data.data;
        res.end(JSON.stringify(user));

    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({error: error.response.data.error}));
        
    }
}        