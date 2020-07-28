const express = require("express");
const User = require("./users-model");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id).then(user => {
        if (user.length > 0) {
            res.status(200).json({ user });
        } else {
            res.status(400).json({ message: "Please supply a valid ID" })
        }
    }).catch(err => {
        res.status(500).json({ error: "Failed to get user", err: err.message })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    console.log(user)
    if (user.password) {
        const hash = bcrypt.hashSync(user.password, 16);
        user.password = hash;
    }
    console.log(user)

    User.updateUser(user, id).then(updated => {
        if (updated) {
            res.status(200).json({ updated })
        } else {
            res.status(400).json({ message: "Please provide a valid ID" })
        }
    }).catch(err => {
        res.status(500).json({ err: err.message, message: "Error updating User" })
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    User.removeUser(id).then(user =>
        res.status(204).json({ message: `User ${id} has been deleted` })
    ).catch(err =>
        res.status(500).json({ error: "Failed to delete user", err: err.message })
    );
});

module.exports = router;