const axios = require('axios');
const Dev = require('../models/Model_dev');

// module.exports = {
//     store(req, res){
//         console.log(req.body.username);
//         return res.json({ ok:true });
//     }
// };

module.exports = {
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user); 

        const users = await Dev.find({
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
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name: username,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
};