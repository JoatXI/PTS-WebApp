import express from 'express';
import Database from 'better-sqlite3';
import betterSqlite3Session from 'express-session-better-sqlite3';
import expressSession from 'express-session';
import * as crypto from 'crypto';

const app = express();
const db = new Database('placestostay.db');
const sessDb = new Database('session.db'); // sqlite database to store session data
const SqliteStore = betterSqlite3Session(expressSession, sessDb); // creates a session store

app.use(express.json());

app.use(express.static('public'));

const pass = crypto.randomBytes(32).toString('hex');

app.use(expressSession({
    // Specify the session store to be used.
    store: new SqliteStore(), 

    // a secret used to digitally sign session cookie, use something unguessable (e.g. random bytes as hex) in a real application.
    secret: pass, 

    // regenerate session on each request (keeping the session active)
    resave: true, 

    // save session to store before data is stored in it (disabled as this unnecessarily creates empty sessions)
    saveUninitialized: false, 

    // resets cookies for every HTTP response. The cookie expiration time will be reset, to 'maxAge' milliseconds beyond the time of the response. 
    // Thus, the session cookie will expire after 10 mins of *inactivity* (no HTTP request made and consequently no response sent) when 'rolling' is true.
    // If 'rolling' is false, the session cookie would expire after 10 minutes even if the user was interacting with the site, which would be very
    // annoying - so true is the sensible setting.
    rolling: true, 

    // destroy session (remove it from the data store) when it is set to null, deleted etc
    unset: 'destroy', 

    // useful if using a proxy to access your server, as you will probably be doing in a production environment: this allows the session cookie to pass through the proxy
    proxy: true, 

    // properties of session cookie
    cookie: { 
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));

/*
app.use((req, res, next) => {
	console.log("Session is");
	console.log(req.session);
	next();
})
*/

app.post('/login', (req, res) => {
	try {
		const stmt = db.prepare('SELECT * FROM acc_users WHERE username = ? AND password = ?')
		const results = stmt.all(req.body.username, req.body.password);
		if(results.length == 1) {
			req.session.username = results[0].username;
			res.json({"username": results[0].username});
		} else {
			res.status(401).json({error: "Invalid Login, Try again!"});
		}
	} catch(error) {
		res.status(500).json({ error: error });
	}
});

// Logout route
app.post('/logout', (req, res) => {
    req.session = null;
    res.json({'success': 1 });
});

// middleware that protects routes using POST or DELETE from access by users who are are not logged in
app.use( (req, res, next) => {
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if(req.session.username) { 
            next();
        } else {
            res.status(401).json({error: "You're not logged in. Go away!"});
        }
    }
});

// 'GET' login route - useful for clients to obtain currently logged in user
app.get('/login', (req, res) => {
    res.json({username: req.session.username || null} );
});

app.get('/', (req, res) => {
    res.send("PTS Application Assessment");
});

app.get('/location/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accommodation WHERE location =?');
        const results = stmt.all(req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get('/typelocation/:type/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accommodation WHERE type =? AND location =?');
        const results = stmt.all(req.params.type, req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/idnpeoplethedate/book', (req, res) => {
    try {
        
        if (req.session.username == null) {
            res.status(401).json({ error: "You're not logged in. Go away!"});
        } else if(req.body.accID == "" || req.body.thedate== "" || req.body.npeople == "") {
            res.status(400).json({error: "Error invalid booking! Input data is empty"});
        } else if (req.body.npeople > 1 || req.body.thedate < 240601 || req.body.thedate > 240603) {
            res.status(400).json({ error: "Accommodation not available!"});
        } else {
            const stmt = db.prepare('INSERT INTO acc_bookings (accID, thedate, npeople) VALUES (?,?,?)');
            const info = stmt.run(req.body.accID, req.body.thedate, req.body.npeople);

            if (info.changes == 1) {
                const stmt = db.prepare('UPDATE acc_dates SET availability = availability - 1 WHERE accID = ?');
                const info = stmt.run(req.body.accID);
                res.json({success: 1});
            } else {
                res.status(404).json({ error: 'No accommodation with that ID' });
            }
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});