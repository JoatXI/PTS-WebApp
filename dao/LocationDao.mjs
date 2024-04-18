class LocationDao {
    constructor(db, table, table2, table3) {
        this.db = db;
        this.table = table;
        this.table2 = table2;
        this.table3 = table3;
    }

    findLocationByName(location) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE location = ?`);
        const result = stmt.all(location);
        return result;
    }
    
    bookLocation(accID, thedate, npeople) {
        const availableStmt = this.db.prepare(`SELECT availability, thedate FROM ${this.table2} WHERE accID = ? AND thedate = ?`);
        const availableInfo = availableStmt.get(accID, thedate);

        if(!availableInfo) {
            return false;
        } else if (availableInfo.availability < npeople) {
            return -1;
        } else {
            const stmt = this.db.prepare(`INSERT INTO ${this.table3} (accID, thedate, npeople) VALUES (?,?,?)`);
            const info = stmt.run(accID, thedate, npeople);
            if(info.changes == 1) {
                const stmt = this.db.prepare(`UPDATE ${this.table2} SET availability = availability - ? WHERE accID = ? AND thedate = ?`);
                const info = stmt.run(npeople, accID, thedate);
                return info.changes ? 1 : 0;
            } else {
                return null;
            }
        }
    }
}

export default LocationDao;