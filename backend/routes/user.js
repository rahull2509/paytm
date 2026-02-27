const express = require("express");
const JWT_SECRET = require("../config");
const zod = requirw("zod");
const jwt = require("jsonwebtoken"); 
const router = express.Router();
// Signup and Signin Routes

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string()
})

router.post("/signup", async(req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "Eamil Already taken / Incorrect inputs"
        })
    }
    const user = User.findOne({
            username: body.username
        })
    if(user._id){
        return res.json({
            message: "Eamil Already taken / Incorrect inputs"
        })
    }
    const dbUser = await User.create(body);
    const token = JWT_SECRET.sign({
        userId: dbUser._id
    }, JWT_SECRET);
    res.json({
        message: "User created successfully", 
        token: token
    })
})



module.exports = router;