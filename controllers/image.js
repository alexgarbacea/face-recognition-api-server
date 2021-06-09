const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
    apiKey: '5b82b35316374a7787427578beaa249c'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (req, res, knex) => {
    const { id } = req.body;

    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })

    //CODE THAT WORKS WITHOUT DATABASE
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id == id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if (!found) res.status(400).json("Not found...")
}

module.exports = {
    handleImagePut,
    handleApiCall
};