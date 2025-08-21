import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import userRouter from "./routes/userroutes.js"
import ownerRouter from "./routes/ownerRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"

// initialize express app
const app = express()

// connect database
await connectDB()

// Middleware

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("server is running"))
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))