import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('placestostay.db');

app.use(express.json());

app.use(express.static('public'));

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
        if(req.body.accID == "" || req.body.thedate== "" || req.body.npeople == "") {
            res.status(400).json({error: "Error invalid booking! Input data is empty"});
        } else {
            const stmt = db.prepare('INSERT INTO acc_bookings (accID, thedate, npeople) VALUES (?,?,?)');
            const info = stmt.run(req.body.accID, req.body.thedate, req.body.npeople);

            if(info.changes == 1) {
                const stmt = db.prepare('UPDATE acc_dates SET availability = availability - 1 WHERE accID = ?');
                const info = stmt.run(req.body.accID);
                res.status(info.changes ? 200:404).json({success: info.changes ? true: false});
            } else {
                res.status(404).json({ success: false, message: 'Failed to insert booking details' });
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