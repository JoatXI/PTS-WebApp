import UserDao from "../dao/UserDao.mjs";

class UserController {
    constructor(db) {
        this.dao = new UserDao(db, "acc_users");
    }

    findUserByLogin(req, res) {
        try {
            const user = this.dao.findUserByLogin(req.body.username, req.body.password);
            if(user == null) {
                res.status(401).json({ error: "Invalid username or password!"});
            } else {
                req.session.username = user.username;
                res.json(user);
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    findUserBySession(req, res) {
        res.json({username: req.session.username || null});
    }

    logoutUser(req, res) {
        req.session = null;
        res.json({'success': 1});
    }
}

export default UserController;