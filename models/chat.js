// const { mongo } = require('mongoose')

mongo = require('mongoose')

const chat = mongo.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,

    },
    Date:{
        type: Date
    }
})

Chat = mongo.model( 'chat', chat )  

module.exports= Chat;