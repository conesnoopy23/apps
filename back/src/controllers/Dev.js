const axios     = require('axios');
const Model_dev = require('../models/Model_dev');

module.exports = {
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Model_dev.findById(user); 

        const users = await Model_dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        });
        return res.json(users);
    },

    async store(req, res){
        const { username } = req.body;

        const userExists = await Model_dev.findOne({user: username});

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar } = response.data;

        if (name==null && bio==null) {
            const new_dev = await Model_dev.create({
                name: username,
                user: username,
                bio : 'Sem biografia',
                avatar
            });
            return res.json(new_dev);
        } else {
            const new_dev = await Model_dev.create({
                name: name,
                user: username,
                bio,
                avatar
            })
            return res.json(new_dev);
        }

    }
};