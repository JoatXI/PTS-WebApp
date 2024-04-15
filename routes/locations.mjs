import express from 'express';
import db from './db.mjs';
import LocationController from '../controllers/locationController.mjs';

const locationRouter = express.Router();
const lController = new LocationController(db);

locationRouter.get('/location/:location', lController.findLocationByName.bind(lController));

locationRouter.get('/typelocation/:type/:location', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accommodation WHERE type =? AND location =?');
        const results = stmt.all(req.params.type, req.params.location);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

locationRouter.post('/idnpeoplethedate/book', lController.bookLocation.bind(lController));

export default locationRouter;