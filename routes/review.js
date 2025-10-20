const express=require("express")
const router=express.Router({mergeParams:true})
const wrapasync=require("../utils/wrapasync.js")
const ExpressError=require("../utils/ExpressError.js")
const Listing=require("../models/listing.js")
const Review=require("../models/reviews.js")
const {validatereview, isloggedIn, isreviewauthor}=require("../middleware.js")
 
const reviewcontroller=require("../controllers/review.js")


           //reviews

router.post("/", isloggedIn, validatereview, wrapasync(reviewcontroller.createreview))


           
          //delete review id

router.delete("/:reviewId", isloggedIn , isreviewauthor, wrapasync(reviewcontroller.deletereview))

module.exports=router