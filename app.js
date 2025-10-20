if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}

const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodoverride=require("method-override")
const ejsmate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")
const express_sessions=require("express-session")
const MongoStore = require('connect-mongo');

const listingsrouter=require("./routes/listing.js")
const reviewsrouter=require("./routes/review.js")
const userrouter=require("./routes/user.js")

const flash=require("connect-flash")

const passport=require("passport")
const LocalStrategy=require("passport-local")
const User=require("./models/user.js")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodoverride("_method"))
app.engine("ejs",ejsmate)
app.use(express.static(path.join(__dirname,"/public")))

const dbUrl=process.env.ATLASDB_URL;


main()
.then((res)=>{
    console.log("db is connected")  
})
.catch((err)=>{
    console.log(err)
})

async function main(){
await mongoose.connect(dbUrl);
}

const store= MongoStore.create({
    mongoUrl:dbUrl,
     crypto: {
        secret: process.env.SECRET,
     },
     touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("err in mongo session")
})

const session_options={secret:process.env.SECRET,
    store,
    resave:false,
    saveUninitialized:true,
cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
} 
}




    app.use(express_sessions(session_options))
    app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
        res.locals.error=req.flash("error")
        res.locals.curruser=req.user
    next()
}) 



app.use("/listings",listingsrouter)
app.use("/listings/:id/reviews",reviewsrouter)
app.use("/",userrouter)


        


app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})


app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("listings/error.ejs",{message})
})  


app.listen(8080,()=>{
    console.log("app is listening on port 8080")
})