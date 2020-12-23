
export async  function post(req, res) {
        req.session.decodedToken = undefined;
        req.session.token = undefined;
        console.log(req.session);
        res.end();
}