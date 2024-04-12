import express from 'express';
import db from './db.mjs';

const locationRouter = express.Router();


locationRouter.get('/location/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accommodation WHERE location =?');
        const results = stmt.all(req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

locationRouter.get('/typelocation/:type/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accommodation WHERE type =? AND location =?');
        const results = stmt.all(req.params.type, req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

locationRouter.post('/idnpeoplethedate/book', (req, res) => {
    try {
        // Checking if there is availability for the specified accID, thedate, and npeople
        const availabilityStmt = db.prepare('SELECT availability, thedate FROM acc_dates WHERE accID = ? AND thedate = ?');
        const availabilityInfo = availabilityStmt.get(req.body.accID, req.body.thedate);

        if (req.session.username == null) {
            res.status(401).json({ error: "You're not logged in. Go away!"});
        } else if(req.body.accID == "" || req.body.thedate== "" || req.body.npeople == "") {
            res.status(406).json({error: "Error invalid booking! Input data not acceptable"});
        } else if (!availabilityInfo) { // No availability found for the specified accID and thedate
            return res.status(404).json({ error: 'No availability found for the chosen date.' });
        } else if (availabilityInfo.availability < req.body.npeople) {
            return res.status(400).json({ error: 'Not enough availability for the specified number of people.' });
        } else {
            const stmt = db.prepare('INSERT INTO acc_bookings (accID, thedate, npeople) VALUES (?,?,?)');
            const info = stmt.run(req.body.accID, req.body.thedate, req.body.npeople);

            if (info.changes == 1) {
                const stmt = db.prepare('UPDATE acc_dates SET availability = availability - ? WHERE accID = ? AND thedate = ?');
                const info = stmt.run(req.body.npeople, req.body.accID, req.body.thedate);
                res.status(info.changes ? 200 : 404).json({ success: info.changes ? true : false });
            } else {
                res.status(404).json({ error: 'No accommodation with that ID' });
            }
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default locationRouter;