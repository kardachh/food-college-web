const path = require('path')
const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    req.session.authenticated && console.log(req.session.user)
    next()
})

router.get('/', (req, res) => {
    req.session.authenticated ? res.sendFile(path.join(path.resolve(), '/public/views/main/index.html')) : res.redirect('/authorization')
})

router.get('/getUserData', (req, res) => {
    req.session.authenticated ? res.json(req.session.user) : res.redirect('/authorization')
})

router.get('/authorization', (req, res) => {
    req.session.authenticated ? res.redirect('/') : res.sendFile(path.join(path.resolve(), '/public/views/authorization/index.html'))
})

router.post('/login', async (req, res) => {
    const {login, password} = req.body;
    if (login && password) {
        if (req.session.authenticated) {
            res.json(req.session)
        } else {
            const {getUser} = require('./database')
            const data = await getUser(login,password)
            if (data.length !==0) {
                req.session.authenticated = true;
                req.session.user = data[0];
                res.json({
                    msg: {
                        user: req.session.user,
                        authorization: true
                    }
                })
            } else {
                res.status(403).json({msg: "bad credentials1"})
            }
        }
    } else {
        res.status(403).json({msg: "empty fields"})
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router
