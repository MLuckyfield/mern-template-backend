const router = require('express').Router();
const {register, login} = require('../../services/authentication');

//Registration

    //user
    router.post('/register-user', async (req, res) => {
      await register(req.body,'user',res);
    });

    //admin
    router.post('/register-admin', async (req, res) => {
      await register(req.body,'admin',res);
    });

    //super
    router.post('/register-super', async (req, res) => {
      await register(req.body,'super',res);
    });

//Login

    //user
    router.post('/login-user', async (req, res) => {
      await login(req.body,'user',res);
    });

    //admin
    router.post('/login-admin', async (req, res) => {
      await login(req.body,'admin',res);
    });

    //super
    router.post('/login-super', async (req, res) => {
      await login(req.body,'super',res);
    });


//Get Profile
    router.get('profile', async (req, res) => {})

//Protected Routes

    //user
    router.post('/profile-user', async (req, res) => {});

    //admin
    router.post('/profile-admin', async (req, res) => {});

    //super
    router.post('/profile-super', async (req, res) => {});

module.exports = router;
