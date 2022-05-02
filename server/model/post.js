import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  url: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  authorId: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      author: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  wholiked: [{ type: String }],
  rewardCount: { type: Number },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
