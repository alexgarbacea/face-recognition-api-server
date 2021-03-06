
const handleRegister = (req, res, knex, bcrypt) => {
    const { name, email, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorect submission');
    }
    const hash = bcrypt.hashSync(password);
    knex.transaction(trx => {//Makes sure both tables are completed in DB
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)//! ! !
            .catch(trx.rollback)
    })

}

module.exports = {
    handleRegister: handleRegister
};