import {Request, Response} from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const {auth0Id} = req.body;

        // 1. check if user exists
        const existingUser = await User.findOne({auth0Id});
        if (existingUser) {
            return res.status(200).send();
        }

        // 2. create the user if not exists
        const newUser = new User(req.body);
        await newUser.save();

        // 3. return the user object back to the calling function
        return res.status(201).json(newUser.toObject());

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error creating user"});
    }
};

const updateCurrentUser = async (req:Request, res:Response) => {
    try{
        const {name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        await user.save();
        res.send(user)

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error updating user"});
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
      const currentUser = await User.findOne({ _id: req.userId });
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(currentUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
};