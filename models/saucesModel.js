const mongoose = require('mongoose');

const SaucesSchema = mongoose.Schema(

    {
        userId:{type:String, require:true},
        name:{ type:String, require:true},
        manufacturer:{ type:String, require:true},
        description:{ type:String, require:true},
        mainPepper:{ type:String, require:true},
        imageUrl:{ type:String, require:true},
        heat:{ type:Number, require:true},
        likes:{ type:Number, default:0},
        dislikes:{ type:Number, default:0},
        usersLiked: {type:[String], required:false},
        usersDisliked: {type:[String], required:false}
    }
);

const Sauce = mongoose.model('Sauce', SaucesSchema);

module.exports = { Sauce };