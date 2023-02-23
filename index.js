const express = require('express');
const app = express();
const { User, Quote } = require('./db');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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