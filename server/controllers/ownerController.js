import User from '../models/user.js';
// API to change the role of user
export const changeRoleToOwner=async(req,res)=>{

    try {

        const {_id}=req.user;
        await User.findByIdAndUpdate(_id,{role:"owner"})
        res.json({success:true,message:"Now You can list cars"})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false
            ,message:error.message})  
    }

}

// API to list car
export const addCar=async(req,res)=>{
    try {
        const {_id}=req.user;
        let car=JSON.parse(req.body.carData)
        const imageFile=req.file;
    } catch (error) {
         console.log(error.message)
        res.json({success:false
            ,message:error.message}) 
    }
}