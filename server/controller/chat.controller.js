import { generateStreamToken } from "../lib/stream";

export async function getStreamToken(req, res) {
   try {
      const token = generateStreamToken(req.user.id);
      res.status(200).json({
         success: true,
         message: 'Stream token generated successfully',
         token
      })
   } catch (error) {
      console.log("Error in getStreamToken controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in getStreamToken controller',
         error: error.message
      })
   }
}