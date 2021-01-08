
export async  function post(req, res) {
        req.session.decodedToken = undefined;
        req.session.token = undefined;
        res.end();
}