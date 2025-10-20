const Listing=require("./models/listing.js")
const Review=require("./models/reviews.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingschema,reviewschema}=require("./schema.js")




module.exports.isloggedIn=(req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in !")
        return res.redirect("/login")
    }
    next()
}


module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}





          //validate listingschema

module.exports.validatelisting=((req,res,next)=>{
    let {error}=listingschema.validate(req.body)
    console.log(error)
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errmsg)
    }else{
        next()
    }
})



             //validate review schema
 
    module.exports.validatereview=((req,res,next)=>{
    let {error}=reviewschema.validate(req.body)
    console.log(error)
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errmsg)
    }else{
        next()
    }
})





               //authorization for listings               

module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id)){
        req.flash("error","you are not the owner of this listing")
        return res.redirect(`/listings/${id}`)
    }
    next()
}



               //authorization for reviews              

module.exports.isreviewauthor= async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","you are not the author of this listing")
        return res.redirect(`/listings/${id}`)
    }
    next()
}






