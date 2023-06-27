exports.tryCatch = (controller)=>async (req,res,next)=>{
    try {
        await controller(req,res)
        // console.log("iamworking inside tryCatch");
    } catch (error) {
        return next(error)
    }
}