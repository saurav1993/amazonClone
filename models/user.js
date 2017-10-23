const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
//User schems attributes
var UserSchema = new Schema({
    email : { type : String , unique : true , lowercase : true},
    password : String,
    profile : {
        name : {type : String, default: ''},
        picture : {type : String, default: ''},
        address : String,
        history : [
            {
                date : Date,
                paid : {type : Number, default : 0},
                //item : 
            }
        ]
    }
})

//Hash the password
UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt,null,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});


//Compare password in the database and the one the user types 
UserSchema.method.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);