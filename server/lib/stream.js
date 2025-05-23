import { StreamChat } from 'stream-chat';
import "dotenv/config";

const apiKey = process.env.CHITCHAT_API;
const apiSecret = process.env.CHITCHAT_API_SECRET;

if (!apiKey || !apiSecret) {
   console.error("STREAM_API_KEY and CHITCHAT_API_SECRET must be set");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);
export const upsertStreamUser = async (userData) => {
   try {
      await streamClient.upsertUsers([userData])
      return userData
   } catch (error) {
      console.error("Error upserting stream user", error);
   }
}

export const generateStreamToken = (userId) => {
   try {
      const userIdStr = userId.toString();
      return streamClient.createToken(userIdStr);
   } catch (error) {
      console.error("Error generating stream token", error);
   }
 };