const db = require("../../models");

module.exports = {
    findById: function (req, res) {
        db.Reply
            .findById({
                where: { id: req.id},
                include: [{
                    model: db.User,
                    attributes: ['email']
                }]
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {

        const { body, ThreadId, UserId } = req.body;
        db.Reply
            .create({ body, ThreadId, UserId })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Reply
            .findOneandUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        console.log(req.params)
        db.Reply
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

}