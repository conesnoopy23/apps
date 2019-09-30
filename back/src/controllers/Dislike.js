const Model_dev = require('../models/Model_dev');

module.exports = {
    async store(req, res){
        console.log(req.params.devId);
        console.log(req.headers.user);

        const {devId} = req.params;
        const {user}  = req.headers; 

        const loggedDev = await Model_dev.findById(user); 
        const targetDev = await Model_dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({error: 'Dev not exists'});
        } 

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save()
        
        return res.json(loggedDev);
    }
};