// middleware that protects routes using POST or DELETE from access by users who are are not logged in
function corsMiddleware(req, res, next) {
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if(req.session.username) {
            next();
        } else {
            res.status(401).json({error: "Youre not logged in. Go away!"});
        }
    }
}

export default corsMiddleware;