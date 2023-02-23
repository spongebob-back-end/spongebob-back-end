const express = require('express');
const app = express();
const { User } = require('./db');
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(express.urlencoded({extended:true}));







// POST /register
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: hashedPassword
        });
        res.send('successfully created user ');
    } catch (error) {
        res.status(500).send(error.message);
    }
  });



  // POST /login
  app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.send('Username not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('incorrect username or password');
        }
        res.send('successfully logged in user ');
    } catch (error) {
        res.status(500).send(error.message);
    }
  });