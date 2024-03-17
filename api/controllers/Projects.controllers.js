const Post = require("../models/Projects.model");
const UserModel = require("../models/user.model");
const notificationModel = require("../models/notification.model");
const main = require("../server");

//create a post

const CreatePost = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = new Post({
      user: user._id,
      ...req.body,
    });

    const savedPost = await newPost.save();

    return res.status(201).json(savedPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//update a post

const updateAPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updates = req.body;

    const post = await Post.findOneAndUpdate({ _id: postId }, updates, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//getFeedPosts
const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "_id firstname lastname picturePath")
      .sort({ createdAt: "desc" });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//delete a post
const deletePost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).send("You are not authorized to delete this post");
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user._id.toString() === req.userId) {
      const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });

      return res.status(200).json(deletedPost);
    } else {
      return res.status(403).send("You are not authorized to delete this post");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//getUserPosts
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ user: userId }).populate("skills");

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//like/dislike post
const likePost = async (req, res) => {
  try {
    const { id } = req.params; //the id of the post
    const { userId } = req.body; //the user Id
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    let likesCount = post.likesCount;
    const user = await UserModel.findById(userId);

    if (isLiked) {
      post.likes.delete(userId);
      if (likesCount > 0) {
        likesCount -= 1;
      }
    } else {
      post.likes.set(userId, true);
      likesCount += 1;
      const notification = new notificationModel({
        type: "like",
        message: `${user.firstname + " " + user.lastname} liked your post`,
      });
      notification.save();
      main.sendNotification(post.userId, notification);
      const owner = await UserModel.findById(post.user._id);
      owner?.notifications?.push(notification._id);
      owner.save();
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes, likesCount },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const sharePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Find the post to share
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already shared the post
    const user = await UserModel.findById(userId);
    if (user.posts.includes(postId)) {
      return res.status(400).json({ message: "Post already shared" });
    }

    // Add the post to the user's shared posts
    user.posts.push(postId);
    await user.save();

    // Increment the share count of the post
    post.shareCount += 1;
    await post.save();

    return res.status(200).json({ message: "Post shared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const BookmarkPost = async (req, res) => {
  try {
    // Find the current user by ID
    const user = await UserModel.findById(req.params.userId);
    let owner;
    let Model;
    if (user) {
      owner = user;
      Model = UserModel;
    } else {
      throw new Error("User not found");
    }
    // Find the post to bookmark
    const postId = req.params.postId;
    const isbookmarked = owner.bookmarks.includes(postId);
    if (isbookmarked) {
      const indexOfPost = owner.bookmarks.indexOf(postId);
      owner.bookmarks.splice(indexOfPost, 1);
    } else {
      owner.bookmarks.push(postId);
    }
    console.log(owner.bookmarks);
    const data = await UserModel.findByIdAndUpdate(
      owner._id,
      { bookmarks: owner.bookmarks },
      { new: true }
    );

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId).populate("bookmarks");
    if (user) {
      const bookmarks = user.bookmarks;
      res.status(200).json(bookmarks);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getpostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
      .populate("skills")
      .populate("user", "_id firstname lastname picturePath");

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  CreatePost,
  updateAPost,
  getFeedPosts,
  deletePost,
  getUserPosts,
  likePost,
  sharePost,
  BookmarkPost,
  getBookmarks,
  getpostById,
};