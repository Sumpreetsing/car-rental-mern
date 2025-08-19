import ImageKit from 'imagekit';
import User from '../models/user.js';
import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Car from '../models/Car.js';
import Booking from '../models/Bookings.js';
// API to change the role of user
export const changeRoleToOwner = async (req, res) => {

    try {

        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now You can list cars" })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false
            , message: error.message
        })
    }

}

// API to add car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file;
        
        // Fix: Read file content, not directory
        const fileBuffer = fs.readFileSync(imageFile.path) // Changed from readdirSync to readFileSync
        
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })
        
        // optimization through imagekit url transformation 
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: 1280 },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        });

        const image = optimizedImageURL;
        await Car.create({ ...car, owner: _id, image })
        
        // Clean up: Delete temporary file
        fs.unlinkSync(imageFile.path);
        
        res.json({ success: true, message: "Car Added" })
        
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to list owner cars

export const getOwnerCars=async(req,res)=>{
    try {
        const { _id } = req.user;
        const cars=await Car.find({owner:_id})
        res.json({
            success: true,
            cars
        })
     
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to toggle car availability
export const toggleCarAvaliability=async(req,res)=>{
    try {
        const { _id } = req.user;
        const {carId}=req.body
        const car=await Car.findById(carId)


        // checking is car belongs to the user
        if(car.owner.toString()!==_id.toString()){
            return res.json({
            success: false,
            message: "Unauthorized"
        })
        }

        car.isAvaliable=!car.isAvaliable;
        await car.save()
        res.json({
            success: true,
            message: "Avaliability toggled"
        })

        
        res.json({
            success: true,
            cars
        })
     
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API to Delete car
export const deleteCar=async(req,res)=>{
    try {
        const { _id } = req.user;
        const {carId}=req.body
        const car=await Car.findById(carId)


        // checking is car belongs to the user
        if(car.owner.toString()!==_id.toString()){
           return res.json({
            success: false,
            message: "Unauthorized"
        })
        }

        car.owner=null;
        car.isAvaliable=false;
        await car.save()
        res.json({
            success: true,
            message: "Car removed"
        })

        
        res.json({
            success: true,
            cars
        })
     
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to get dashboard data

export const getDashboardData=async(req,res)=>{
    try {
        
        const {_id,role}=req.user;
        if(role!== 'owner'){
             return res.json({
            success: false,
            message: "Unauthorized"
        })
    }

    const cars=await Car.find({owner:_id})
    const bookings=await Booking.find({owner:_id}).populate('car').sort(
        {createdAt:-1});

    const pendingBookings=await Booking.find({owner:_id,status:"pending"})
    const completedBookings=await Booking.find({owner:_id,status:"confirmed"})
    
        // calculate monthly revenue from bookings where status is confirmed
        const monthlyRevenue=bookings.slice().filter(booking=>
            booking.status==='confirmed'
        ).reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData={
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({success:true,dashboardData});


    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to update user image
export const updateUserImage=async()=>{
    try {
         const {_id}=req.user;

         const imageFile = req.file;
        
        // Fix: Read file content, not directory
        const fileBuffer = fs.readFileSync(imageFile.path) // Changed from readdirSync to readFileSync
        
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })
        
        // optimization through imagekit url transformation 
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        });

        const image = optimizedImageURL;

        await User.findByIdAndUpdate(_id,{image});

        res.json({success:true,message:"Image updated"})

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}