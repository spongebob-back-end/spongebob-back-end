require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { User, Quote } = require('./db');
//const {JWT_SECRET = 'neverTell'} = process.env;
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Authentication middleware
const setUser = async (req, res, next) => {
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else {
      const [, token] = auth.split(" ");
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  };  

// POST /register
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword
        });
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET
          );
        res.send({ message: "success", token });
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
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET
          );
        res.send({ message: "success", token });
    } catch (error) {
        res.status(500).send(error.message);
    }
  });




   


  app.get('/Quote',setUser,async (req, res, next) => {
    try {
        res.send(await Quote.findAll());
    }
    catch(error){
        console.error(error);
        next(error);
    }
});


app.post('/Quote',setUser, async (req, res, next) => {
    try {
        res.status(201).send(await Quote.create(req.body));
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

app.patch('/Quote/:id',setUser, async (req, res, next) => {
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

app.delete('/Quote/:id',setUser,  async (req, res, next) => {
    try {
        res.status(204).send(await Quote.destroy({ where: { id: req.params.id } }));
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

app.listen(PORT, () => {
    console.log(`Quotes are ready at http://localhost:${PORT}`);
});


  module.exports = app;
