// middleware that protects routes using POST or DELETE from access by users who are are not logged in
function corsMiddleware(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
}

export default corsMiddleware;