
const handleSignin = (req, res, knex, bcrypt) => {
    const{email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorect submission');
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return knex.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('Unable to get data'))
            }
            else res.status(400).json('Wrong email or password')
        })
        .catch(err => res.status(400).json('Wrong email or password'))
}

module.exports = {
    handleSignin: handleSignin
};