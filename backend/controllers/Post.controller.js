import PostModel from "../models/Post.model.js";
import UserModel from "../models/User.model.js";

export async function getAllPosts(req,res) 
{
    let posts = await PostModel.find().populate("user");
    return res.status(200).json({
        message:"All posts",
        posts:posts
    });
}

export async function createPost(req,res) 
{
    let data = req.body;
    let post = await PostModel.create(data);
    let postAuthor = await UserModel.findById(post.user._id);
    postAuthor.posts.push(post._id);
    await postAuthor.save();
    return res.status(201).json({
        message:"Post created successfully",
        post:post
    });
}