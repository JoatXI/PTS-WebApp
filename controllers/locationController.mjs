import LocationDao from "../dao/LocationDao.mjs";

class LocationController {
    constructor(db) {
        this.dao = new LocationDao(db, "accommodation", "acc_dates", "acc_bookings");
    }

    findLocationByName(req, res) {
        try {
            const location = this.dao.findLocationByName(req.body.location);
            if (location == null) {
                res.status(401).json({ error: "Invalid location!" });
            } else {
                res.json(location);
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    bookLocation(req, res) {
        try {
            const result = this.dao.bookLocation(req.body.accID, req.body.thedate, req.body.npeople);
            
            if(req.session.username == null) {
                res.status(401).json({ error: "You're not logged in. Go away!" });
            } else if(req.body.accID == "" || req.body.thedate== "" || req.body.npeople == "") {
                res.status(406).json({error: "Error invalid booking! Input data not acceptable"});
            } else if(result == -1) {
                res.status(400).json({ error: 'Not enough availability for the specified number of people.' });
            } else if(result == false) { // No availability found for the specified accID and thedate
                res.status(404).json({ error: 'No availability found for the chosen date.' });
            } else if(result == null) {
                res.status(400).json({ error: 'No accommodation with that ID' });
            } else {
                res.status(200).json({ success: true });
            }

        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
}

export default LocationController;