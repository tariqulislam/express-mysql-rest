const comment = require('../db/models').Comment;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return comment
        .create({
            title: req.body.title,
            userId: req.params.userId
        })
        .then(comment => res.status(201).json(
           ResponseFormat.build(
               comment,
               "Comment Save Successfully",
               201,
               "success"
           )
        ))
        .catch(error => res.status(400).json(
            ResponseFormat.error(
                error,
                "Somethis went wrong when save the data",
                400,
                "error"
            )
        ));
    }
}