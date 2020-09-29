const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require('../users/users-model');

router.post("/register", (req, res) => {
    let { email, password } = req.body;
    console.log(email);
    if(!email || !password){
        res.status(400).json({ message: "Please supply an email and password."});
    } else if (email.length < 3){
        res.status(400).json({ message: "Email must be at least 3 characters long."});
    } else if (password.length < 8){
        res.status(400).json({ message: "Password must be at least 8 characters long."})
    }
    User.addUser(req.body)
        .then(response => {
            User.findById(response.id)
                .first()
                .then(user => {
                    const token = Token(user);
                    res.status(200).json({ user, subject: `Hello ${user.email}, here's a token`, token});
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                })
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        })
})

router.post("/login", (req, res) => {
    let { email, password } = req.body;
    if (!email || !password){
        res.status(400).json({ message: "Please supply a email and password."});
    } 
    User.findBy({ email: email })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = Token(user);
                localStorage.setItem('token', token);
                res.status(200).json({ user, subject: `Hello ${user.email}, here's a token`, token});
            } else {
                res.status(401).json({ message: "Please provide the correct credentials."});
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

module.exports = router;