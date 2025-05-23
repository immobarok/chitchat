import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
   const { email, password, fullName } = req.body;
   try {
      if (!email || !password || !fullName) {
         return res.status(400).json({ message: 'All feild are required' })
      }
      if (password.length < 6) {
         return res.status(400).json({ message: 'Password must be atleast 6 or more character longer' })
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
         return res.status(400).json({ message: "Invalid email format" })
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: 'Email already exists please use a different one ' })
      }
      const idx = Math.floor(Math.random() * 100);
      const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
      const newUser = await User.create({
         email,
         password,
         fullName,
         profilePic: randomAvatar,
      })

     try {
        await upsertStreamUser({
           id: newUser._id.toString(),
           name: newUser.fullName,
           image: newUser.profilePic || "",
        });
        console.log(`Stream user upserted successfully for ${newUser.fullName}`);
     } catch (error) {
         console.error("Error upserting stream user", error);
     }

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
         expiresIn: '7d'
      })
      res.cookie('jwt', token, {
         maxAge: 7 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         sameSite: 'strict',
         secure: process.env.NODE_ENV === 'production',
      })
      res.status(201).json({
         success: true,
         message: 'User created successfully',
         user: newUser
      })
   } catch (error) {
      console.log("Error creating user", error);
      res.status(500).json({
         success: false,
         message: 'Error in signup contorller',
         error: error.message
      })
   }
}

export async function login(req, res) {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ message: 'All feild are required' })
      }
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: 'User not found' })
      }
      const isMatched = await user.matchPassword(password);
      if (!isMatched) {
         return res.status(400).json({ message: 'Invalid credentials' })
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
         expiresIn: '7d'
      });
      res.cookie('jwt', token, {
         maxAge: 7 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         sameSite: 'strict',
         secure: process.env.NODE_ENV === 'production',
      })
      res.status(200).json({ success: true, message: 'User logged in successfully', user })
   } catch (error) {
      console.log("Error in login controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in login controller',
         error: error.message
      })
   }
   res.send('Login')
}

export function logout(req, res) {
   res.clearCookie('jwt')
   res.status(200).json({ success: true, message: 'User logged out successfully' })
}