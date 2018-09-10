const db = require('mongoose');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userUri = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/users/`;
const User = require('../models/user.model');


//Sign up user route
exports.signUp = (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then((user) => {
        if(user.length > 0) {
            return res.status(409).json({ message: 'A user with this email address already exists.' });
        } else {
            encrypt.hash(req.body.password, 15, (err, hash) => {
                if(err) {
                    return res.status(500).json({ error: err });
                } else {
                    let user = new User({
                        _id: new db.Types.ObjectId,
                        email: req.body.email,
                        password: hash,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    });

                    user.save()
                    .then((result) => {
                        res.status(201).json({ message: 'User was sucessfully created.' });
                        console.log(result);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({ error: err});
                    });
                }
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err});
    });
};

//Sign in user route
exports.signIn = (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then((user) => {

        if(user.length === 0) {
            return res.status(401).json({ message: "User email or password is incorrect, or empty." });
        } else {
            encrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({ message: "User email or password is incorrect, or empty." });
                }

                if(result) {
                    const token = jwt.sign(
                        {
                            userId: user[0]._id,
                            email: user[0].email 
                        },
                        process.env.PRIVATE_SECRET_KEY,
                        {
                            expiresIn: "1h"
                        }    
                    );

                    return res.status(200).json({
                        message: 'Authentication was successful.',
                        token: token
                    });
                }

                res.status(401).json({ message: "User email or password is incorrect, or empty." });
            });

        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err});
    });
};

exports.updatePwd = (req, res, next) => {
    encrypt.hash(req.body.password, 15, (err, hash) => {
    User.findOneAndUpdate({email: req.body.email}, {$set:{password: hash}}, {new: true}, function(err, doc){
        err ? res.status(500).json({error: err}) : res.status(200).json(doc)
    });
})  
};

//List all users with authetication
exports.getUsers = (req, res) => {
    User.find()
    .exec()
    .then((users) => {
        const results = {
            count: users.length,
            users: users.map( u => {
                return {
                    firstname: u.firstname,
                    lastname: u.lastname,
                    email: u.email,
                    request: {
                        type: 'GET',
                        url: userUri + u._id
                    }
                }
            }) 
        }
        res.status(200).json(results);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err});
    });

};
