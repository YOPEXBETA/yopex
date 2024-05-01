const mongoose = require("mongoose");
const CommentModel = require("./Comment.model");

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    description: {
      type: String,
      max: 500,
      required: false,
    },
    postPicturePath: {
      type: Array,
      required: true,
    },
    userPicturePath: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    BookMarks: {
      type: Map,
      of: Boolean,
      default: {},
    },
    BookMarksCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

PostSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    try {
      console.log("Middleware executed");

      const query = this;
      const postId = query._conditions._id;

      await CommentModel.deleteMany({ postId: postId }).exec();

      next();
    } catch (error) {
      console.log("Middleware error");
      next(error);
    }
  }
);

module.exports = mongoose.model("Post", PostSchema);
