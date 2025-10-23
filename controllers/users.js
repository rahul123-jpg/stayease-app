const User=require("../models/user.js");

              //user signup render controller

module.exports.rendersignup=(req,res)=>{
    res.render("users/signup.ejs")
}       
           


               //user signup route controller
            
module.exports.signup=async(req,res)=>{
    try{
    let{username,email,password}=req.body;
    const newuser=new User({email,username});
    const registeruser=await User.register(newuser,password)
    console.log(registeruser)
    req.login(registeruser,(err)=>{
        if(err){
            return next()
        }
        req.flash("success","Welcome to Stayease")
    res.redirect("/listings")
    })
    
}
catch(err){
        req.flash("error",err.message)
        res.redirect("/signup")
    }
}


       
               //user log in render controller

module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs")
}


               //user login controller

module.exports.login=async(req,res)=>{
    console.log(req.params)
    req.flash("success","welcome to Stayease app")
    let redirectUrl=res.locals.redirectUrl||"/listings"
    res.redirect(redirectUrl)
}



                   //user logout controller

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","you are logged out!")
        res.redirect("/listings")
    })
}