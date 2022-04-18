import db from "../models/base.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addUserSchema, loginUserSchema } from "../validator/validateSchema.js";

const User = db.users;
class UserController {
    static addUser = async (req, res) => {
        try {

            const newPassword = await bcrypt.hash(req.body.password, 10)

            const validate=await addUserSchema.validateAsync(req.body);

            const preRecord = await User.findOne({ where: { email: req.body.email } });
            if (preRecord) {
                res.status(409).json({ message: "User Already Registered With this Email Id" });
                return
            }

            // save the user to DB
            const doc = {
                id:Math.floor(new Date().getTime() / 1000).toString(16),
                name: req.body.name,
                email: req.body.email,
                password: newPassword
            };
            const result = await User.create(doc);

            //add a token 
            const token = jwt.sign({
                userId: req.body.name
            }, process.env.JWT_SECRET,
            )

            //set it in cookie
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
            })
            res.status(201).json(result);
        }
        catch (err) {
            if (err.isJoi === true){
                return res.status(422).json({ message: err.details[0].message });
            }
            console.log(err)
            res.status(403).json({ message: err.message });
        }
    }

    static getUserByEmail = async (req, res) => {
        try {

            // const { password, email} = req.body;
            // if (!password || !email ) {
            //     res.status(403).json({ message: "Please Fill all the Details" });
            //     return;
            // }

            const validate=await loginUserSchema.validateAsync(req.body);

            const result = await User.findOne({where:{ email: req.body.email }});

            if (!result) return res.status(404).json({ message: "Check Your Credentials" });

            const isPasswordValid = await bcrypt.compare(req.body.password, result.password);

            if (isPasswordValid) {
                const token = jwt.sign({
                    userId: req.body.email
                }, process.env.JWT_SECRET
                    // ,{expiresIn:"10000"}
                )

                //set it in cookie
                res.cookie("jwtToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                res.status(200).json({ message: "Valid User" })
                return
            }
            else {
                return res.status(403).json({ message: "Check Your Credentials" })
            }
        }
        catch (err) {
            if (err.isJoi === true) {
                return res.status(422).json({ message: err.details[0].message });
            }
            console.log(err)
            return res.status(404).json({ message: "Error occured" });
        }
    }
    static logout = async (req, res) => {
        try {
            res.cookie("jwtToken", "", {
                httpOnly: true,
                expires: new Date(0)
            })
            return res.status(200).json({ message: "Log Out Successfully" });
        }
        catch (err) {
            res.status(500).json({ message: "Cant Logout" })
        }
    }
}

export default UserController