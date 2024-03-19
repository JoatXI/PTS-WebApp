import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('accomodation.db');

app.use(express.json());

app.use(express.static('public'));

app.get('/location/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accomodation WHERE location =?');
        const results = stmt.all(req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get('/typelocation/:type/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accomodation WHERE type =? AND location =?');
        const results = stmt.all(req.params.type, req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/idnpeoplethedate/:id/:npeople/:thedate', (req, res) => {
    try {
        const stmt = db.prepare('INSERT INTO acc_bookings (id, npeople, thedate) VALUES (?,?,?)');
        const info = stmt.run(req.body.npeople, req.body.thedate, req.params.id);
        if(info.changes == 1) {
            const stmt = db.prepare('UPDATE acc_dates SET availability = availability - 1 WHERE id = ?');
            const update = stmt.run(req.params.id);
            res.status(update.changes ? 200:404).json({success: update.changes ? true: false});
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});