const Comment = require("../models/Comment.model");
const SocialPost = require("../models/SocialMediaPost.model");
const notificationModel = require("../models/notification.model");
const userModel = require("../models/user.model");
const main = require("../server");

const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.userId });
    const savedComment = await newComment.save();

    const postId = req.body.postId;
    const post = await SocialPost.findById(postId);
    post.comments.push(savedComment._id);
    post.commentCount += 1; // increment comment count
    await post.save();
    const owner = await userModel.findById(post.userId);
    const notification = new notificationModel({
      type: "comment",
      message: `${owner.firstname + " " + owner.lastname} comment your post`,
    });
    await notification.save();
    main.sendNotification(post.userId, notification);
    
    owner.notifications.push(notification._id);
    await owner.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);

   
      await Comment.findByIdAndDelete(req.params.id);
      await SocialPost.findByIdAndUpdate( req.body.postId,
        { $pull: { comments: req.params.id } });
        await SocialPost.findByIdAndUpdate(
          req.body.postId,
          { $inc: { commentCount: -1 } }
        );  
      res.status(200).json("The comment has been deleted.");
 
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate(
      {
        path: "userId",
        model: "User",
      },
    );
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
