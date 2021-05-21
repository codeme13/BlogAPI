const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/blogging",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Connection Sucessfull buddy");
}).catch((err)=>
{
    console.log("No connection");
});
