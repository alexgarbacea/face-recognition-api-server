const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'x',
        password: 'x',
        database: 'x'
    }
});
const app = express();
app.use(express.json());
app.use(cors());
//
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })

app.put('/image', (req, res) => { image.handleImagePut(req, res, knex) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, ()=> {
    console.log(`Server is running on port 3000`)
});

