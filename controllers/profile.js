
const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;
    knex.select('*').from('users').where({ id })//just {id} because the property and the value are the same
        .then(user => {
            if (user.length) res.json(user[0]);
            else res.status(400).json(`User ${id} not found...`)
        })
}

module.exports = {
    handleProfileGet: handleProfileGet
};