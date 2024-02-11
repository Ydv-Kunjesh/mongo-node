
const express = require('express');
const { default: mongoose } = require('mongoose');
path = require('path');
path = require('path')
app = express()
port = 8080;
mongoosh = require('mongoose')
Chat = require("./models/chat.js")
const k = require( "method-override" )



app.set("views" , path.join(__dirname,'views'))
app.set("view engine" , "ejs")
app.use(express.urlencoded({extended : true}))
app.use(k('_method'));

mongoose.connect("mongodb://127.0.0.1:27017/webDev").then((res)=>(console.log("connceted SucessFully"))).catch(err=>{console.log(` ${err}Error in connection`)});

app.get("/",(req,res)=>{
    res.render('home.ejs')
})

app.get("/chat",async(req,res)=>{
    chats = await Chat.find()
    date = await Chat.find({time:Chat.Date.toTimeString()})
    // time = date.toTimeString()
     console.log(date)
    res.render('chat.ejs',{chats : chats})
})

app.get('/chat/new',(req,res)=>{
    res.render('new.ejs')
})

app.post('/chat',(req,res)=>{
    const {from,to,msg} = req.body
    newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        Date: new Date()
    })
    // console.log(newChat);
    newChat.save().then((res)=>{`Document Saved`}).catch((err)=>{console.log(`Error in you Backend`);})
    res.redirect("/chat")
})

//Edit Route

app.get('/chat/:id/edit',async(req,res)=>{
   const {id} = req.params
  chat =  await Chat.findById(id);
  res.render('edit.ejs',chat)

})

app.put( '/chat/:id' , async (req,res)=>{
   let  {id}=req.params;
    let {msg } = req.body;
    updatedchat = await Chat.findByIdAndUpdate(id,{msg})
    res.redirect("/chat")
     
});

//Delete Route
app.delete('/chat/:id', async(req,res)=>{
    const {id} = req.params
    console.log(id);
    let chat = await Chat.findByIdAndDelete(id)
    console.log(chat);
    res.redirect('/chat')
})
app.listen(port,()=>{
    console.log(`Listening On ${port}`);
})












// chat1 = new Chat({
//     from:'Kunjesh Yadav',
//     to:"Priya Yadav",
//     msg:"Happy Valentine Day Bae❤️",
//     Date:new Date(),
// })

// chat1.save().then((res) => {
//     console.log(`${res} Data Saved`);
// }).catch((err) => {
//     console.error(err)})