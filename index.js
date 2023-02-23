const express = require('express');
const app = express();
const { User, Quote } = require('./db');
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


app.get('/Quote',async (req, res, next) => {
    try {
        res.send(await Quote.findAll());
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

app.post('/Quote', async (req, res, next) => {
    try {
        res.status(201).send(await Quote.create(req.body));
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

app.patch('/Quote/:id', async (req, res, next) => {
    try {
        const quote = await Quote.findByPk(req.params.id);
        await quote.update(req.body);
        res.send(quote);
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

app.delete('/Quote/:id', async (req, res, next) => {
    try {
        res.status(204).send(await Quote.destroy({ where: { id: req.params.id } }));
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = app;
