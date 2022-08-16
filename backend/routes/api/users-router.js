require('dotenv').config()
const router = require('express').Router();

const { User } = require('../../db/models')

router.get('/signin', async (req, res) => {
    const user = await User.getCurrentUserById(120);
    res.json(user)
});

router.post('/signup', (req, res) => {
    
});

router.delete('/signout', (req, res) => {
    
});

module.exports = router;