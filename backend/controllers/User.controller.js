import UserModel from "../models/User.model.js";
import "dotenv/config";


export async function register(req,res) 
{
    let data = req.body;
    let user = await UserModel.findOne({email:data.email});
    if(user)
    {
        res.status(400).json({message:"User already exists"});
        return;
    }
    
    try {
        user = await UserModel.create(data);
        return res.status(201).json({
            message:"User created successfully",
            userData:user,
            token:user.generateAuthToken()
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error"});
    }

}

export async function login(req,res) 
{
    let data = req.body;
    let user = await UserModel.findOne({email:data.email});
    if(!user)
    {
        res.status(400).json({message:"User does not exist"});
        return;
    }
    if(!await user.comparePassword(data.password))
    {
        res.status(400).json({message:"Incorrect password"});
        return;
    }
    return res.status(200).json({
        message:"Login successful",
        userData:user,
        token:user.generateAuthToken()
    });
}

export async function getUserData(req,res) 
{
    let id = req.params.id;
    let user = await UserModel.findById(id).populate("posts");
    if(!user)
    {
        res.status(400).json({message:"User does not exist"});
        return;
    }
    return res.status(200).json({
        message:"User data",
        userData:user
    });
}