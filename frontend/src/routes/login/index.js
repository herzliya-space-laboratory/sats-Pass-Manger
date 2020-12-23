import axios from "axios";
import jwt from 'jsonwebtoken';


const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};


export async  function post(req, res) {
    const { email, password } = req.body;
    await axios.post(`http://localhost:4000/api/v1/login/`, { email, password })
        .then((result) => { 
            req.session.token = result.data.data;

            try {
              req.session.decodedToken = jwt.verify(req.session.token , process.env.JWT_SECRET);
              res.end(JSON.stringify({ token: result.data.data }));
            } catch (error) {
              res.end(JSON.stringify({ error }))
            }
        })
        .catch(e =>  res.end(JSON.stringify({ error: e.response.data.error })));
}
        