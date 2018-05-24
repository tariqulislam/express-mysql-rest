const user = require('../db/models').User;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        console.log(req)
        return user
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error))
    },
    list(req, res) {
        console.log(req)
        return user
        .all()
        .then(users => res.status(200).json(ResponseFormat.build(
            users,
            "User Information Reterive successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).send(error));
    }
}