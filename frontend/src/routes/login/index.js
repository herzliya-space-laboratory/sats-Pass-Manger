import axios from "axios";
import jwt from 'jsonwebtoken';


const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};


export async  function post(req, res) {
    const { email, password } = req.body;
    await axios.post(`${process.env.API_URI}/api/v1/login/`, { email, password })
        .then((result) => { 
            req.session.token = result.data.data;
            req.session.decodedToken = jwt.verify(req.session.token , process.env.JWT_SECRET);
            res.end(JSON.stringify({ token: result.data.data }));
        })
        .catch(e =>  res.end(JSON.stringify({ error: e.response.data.error })));
}
        