import FriendRequest from "../models/FriendRequest";
import User from "../models/User";

export const getRecommendedUsers = async (req, res) => {
   try {
      const currentUserId = req.user.id;
      const currentUser = req.user;

      const recommendedUsers = await User.find({
         $and: [
            { _id: { $ne: currentUserId } },
            { _id: { $nin: currentUser.friends } },
            { isOnboarded: true },
         ]
      })
      res.status(200).json({
         success: true,
         message: 'Recommended users fetched successfully',
      })
   } catch (error) {
      console.error("Error in getRecommendedUsers controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in getRecommendedUsers controller',
         error: error.message
      })
   }
}

export async function getFriends(req, res) {
   try {
      const user = await User.findById(req.user.id).populate('friends', 'fullName profilePic nativeLanguage learningLanguage');
      res.status(200).json({
         success: true,
         message: 'Friends fetched successfully',
         friends: user.friends
      })
   } catch (error) {
      console.error("Error in getFriends controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in getFriends controller',
         error: error.message
      })
   }
}

export async function sendFriendRequest(req, res) {
   try {
      const myId = req.user.id;
      const { id: recipientIdParam } = req.params;
      if (myId === recipientIdParam) {
         return res.status(400).json({
            success: false,
            message: 'You cannot send a friend request to yourself'
         })
      }
      const recipientUser = await User.findById(recipientIdParam);
      if (!recipientUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found'
         })
      }
      if (recipientUser.friends.includes(myId)) {
         return res.status(400).json({
            success: false,
            message: 'You are already friends with this user'
         })
      }
      const existingRequest = await FriendRequest.findOne({
         $or: [
            { sender: myId, recipient: recipientIdParam },
            { sender: recipientIdParam, recipient: myId }
         ]
      });
      if (existingRequest) {
         return res.status(400).json({
            success: false,
            message: 'Friend request already sent'
         })
      }
      const friendRequest = await FriendRequest.create({
         sender: myId,
         recipient: recipientIdParam
      });

      res.status(201).json(friendRequest);
      // Send notification to recipient
   } catch (error) {
      console.error("Error in sendFriendRequest controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in sendFriendRequest controller',
         error: error.message
      })
   }
}

export async function acceptFriendRequest(req, res) {
   try {
      const { id: requestId } = req.params;
      const friendRequest = await FriendRequest.findById(requestId);
      if (!friendRequest) {
         return res.status(404).json({
            success: false,
            message: 'Friend request not found'
         })
      }
      if (friendRequest.recipient.toString() !== req.user.id) {
         return res.status(403).json({
            success: false,
            message: 'You are not authorized to accept this friend request'
         })
      }
      if (friendRequest.status === 'accepted')
         await friendRequest.save();

      await User.findByIdAndUpdate(friendRequest.sender, {
         $addToSet: { friends: req.user.id }
      });
      await User.findByIdAndUpdate(req.user.id, {
         $addToSet: { friends: friendRequest.sender }
      });
      res.status(200).json({
         success: true,
         message: 'Friend request accepted successfully',
         friendRequest
      })
   } catch (error) {

   }
}

export async function getFriendRequests(req, res) {
   try {
      const incomingReqs = await FriendRequest.find({
         recipient: req.user.id,
         status: 'pending',
      }).populate('sender', 'fullName profilePic nativeLanguage learningLanguage');
      const acceptedReqs = await FriendRequest.find({
         sender: req.user.id,
         status: 'pending',
      }).populate('recipient', 'fullName profilePic nativeLanguage learningLanguage');
      res.status(200).json({ incomingReqs, acceptedReqs })
   } catch (error) {
      console.error("Error in getFriendRequests controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in getFriendRequests controller',
         error: error.message
      })
   }
}


export async function getOutGoingFriendRequests(req, res) {
   try {
      const outgoingReqs = await FriendRequest.find({
         sender: req.user.id,
         status: 'pending',
      }).populate('recipient', 'fullName profilePic nativeLanguage learningLanguage');
      res.status(200).json(outgoingReqs);
   } catch (error) {
      console.error("Error in getOutGoingFriendRequests controller", error);
      res.status(500).json({
         success: false,
         message: 'Error in getOutGoingFriendRequests controller',
         error: error.message
      })
   }
}
