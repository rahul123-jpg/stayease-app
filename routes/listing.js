 const express=require("express")
const router=express.Router()
const wrapasync=require("../utils/wrapasync.js")
const Listing=require("../models/listing.js")
const { isloggedIn, isOwner,validatelisting } = require("../middleware.js")
const listingcontroller=require("../controllers/listing.js")
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({storage})




router.route("/")
.get( wrapasync(listingcontroller.index))
.post( isloggedIn, 
     upload.single("listing[image]"),
         validatelisting,
    wrapasync(listingcontroller.create))


       

          //new route
router.get("/new",isloggedIn,listingcontroller.rendernewform)



router.route("/:id")
.get( wrapasync(listingcontroller.show))
.put(isloggedIn,isOwner,
     upload.single("listing[image]"),
 validatelisting,wrapasync(listingcontroller.update))
.delete(isloggedIn, isOwner, wrapasync(listingcontroller.delete))


       
    
          //edit route

router.get("/:id/edit", isloggedIn, isOwner, wrapasync(listingcontroller.rendereditform))




module.exports=router