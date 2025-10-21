const Listing=require("../models/listing.js")



           //index route controller

module.exports.index = async (req, res) => {
  const { country } = req.query; // URL se country le lo
  let alllistings;

  if (country) {
    alllistings = await Listing.find({ country: country });
  } else {
    alllistings = await Listing.find({});
  }
  res.render("listings/index.ejs", { alllistings, country: country || "" });
};


             //new route controller

module.exports.rendernewform=(req, res) => {
  res.render("listings/new.ejs")
};


              //show controller

module.exports.show=async (req,res)=>{
 let{id}=req.params;
 console.log(id)
 const listing=await Listing.findById(id)
 .populate({
    path:"reviews",
    populate:{
        path:"author",       
    },
 }).populate("owner")
 if(!listing){
            req.flash("error","Your req for listing doesn't exist  ")
         return res.redirect("/listings")
 } 
 console.log(listing)
 res.render("listings/show.ejs",{listing})
}


              //create route controller                 

module.exports.create=async (req,res,next)=>{
  console.log(req.body)
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting=new Listing(req.body.listing)
    newlisting.owner=req.user._id;
     newlisting.image={url,filename}
    await newlisting.save()
    req.flash("success","new listing created")
    res.redirect("/listings")
}



                 //edit route controller 
    
module.exports.rendereditform=async (req,res)=>{
    let{id}=req.params
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested does not exist");
        res.redirect("/listings");
    }
    let originalimageurl=listing.image.url;
    originalimageurl=originalimageurl.replace("upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalimageurl})

}


              //update route controller

module.exports.update=async (req,res)=>{
        let{id}=req.params;
       let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing})
       if( typeof req.file!=="undefined"){
           let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename}
    await listing.save()
       }
            req.flash("success","Listing Updated")
        res.redirect(`/listings/${id}`)
}


               //delete route controller

module.exports.delete=async (req,res)=>{
            let{id}=req.params;
            let deletelisting=await Listing.findByIdAndDelete(id)
            console.log(deletelisting)
                req.flash("success","Listing Deleted")
            res.redirect("/listings")
}



            