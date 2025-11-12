import {Router} from "express";
import {getAllPosts,getFeedPosts,getUserPosts,createPost} from "../controllers/Post.controller.js";

const router = Router();

router.get("/",getAllPosts);
router.get("/feed",getFeedPosts);
router.get("/myPosts",getUserPosts);
router.post("/",createPost);


export default router;