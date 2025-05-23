import express from 'express'
const app = express();
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.route.js'
import userRoutes from './Routes/user.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import chatRoutes from './Routes/chat.route.js'

dotenv.config();

const port = process.env.PORT | 5000

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes);
app.get('/', (req, res) => {
   res.send("Hello World")
})

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
   connectDB();
})
