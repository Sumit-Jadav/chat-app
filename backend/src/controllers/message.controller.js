import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(filterUsers);
  } catch (error) {
    console.log(`Error in getUserForSlidebar: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getting message ${error.message}`);
    return res.status(500).json({ message: "internal server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const responseUrl = await cloudinary.uploader.upload(image);
      imageUrl = responseUrl.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    // todo :- Realtime message service goes here

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(`Message sending error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
