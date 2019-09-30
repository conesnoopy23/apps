const {Schema, model} = require('mongoose');

const DevSchema = new Schema({
    name:{
        type: String,
    },
    user:{
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Model_dev',
    }],
    
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Model_dev',
    }],

},{
    timestamps: true,
});

module.exports = model('Model_dev',DevSchema)