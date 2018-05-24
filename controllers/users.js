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
        .then(user => res.status(201).json(ResponseFormat.build(
            user,
            "User Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.build(
            error,
            "Something went wrong when create Users",
            "error"
        )))
    },
    list(req, res) {
        console.log(req)
        return user
        .all()
        .then(users => res.status(200).json(ResponseFormat.build(
            users,
            "User Information Reterive successfully",
            200,
            "success"
        )))
        .catch(error => res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong when Reterieve Information",
            400,
            "error"
        )));
    }
}