const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const schema = require("../schema");
const myConstants = require("../constants");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const validationResponse = schema.signUpSchema.validate(req.body);

        if (validationResponse.error) {
            res.status(400).json({
                error: "invalid",
                message: myConstants.SCHEMA_ERR,
            });
        } else {
            const hashedPass = await bcrypt.hash(
                req.body.password,
                myConstants.SALT_ROUNDS
            );

            const response = await User.create({
                ...req.body,
                password: hashedPass,
            });

            console.log("User created successfully:", response.email);

            res.send({
                status: "success",
                message: "User created successfully",
                jwt: jwt.sign(
                    {
                        email: response.email,
                        expiry: myConstants.getExpiry(),
                    },
                    myConstants.JWT_KEY
                ),
            });
        }
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({
                error: "conflict",
                message: myConstants.CONFLICT_ERR,
            });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

module.exports = router;
