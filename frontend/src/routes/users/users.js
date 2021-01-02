import axios from 'axios';

export async function get(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }
    try {
        const response = await axios.get(`${process.env.API_URI}/api/v1/user`, config);
        const users = response.data.data; 
        res.end(JSON.stringify(users));
    } catch (error) {
        res.end(JSON.stringify({error}));
        
    }
}


export async function post(req, res, next) 
{
    let config = {
        headers: {
            authorization: "Bearer " +  req.session.token,
        }
    }

    try {
        const response = await axios.post(`${process.env.API_URI}/api/v1/register`, req.body, config);
        const newUser = response.data.data; 
        res.end(JSON.stringify(newUser));

    } catch (error) {
        res.end(JSON.stringify({error: error.response.data.error}));
        
    }
}