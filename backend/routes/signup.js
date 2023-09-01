const express = require("express");
const router = express.Router();
const User = require("../models/user");
const schema = require("../schema");
const myConstants = require("../constants");

router.post("/", async (req, res) => {
    try {
        const validationResponse = schema.signUpSchema.validate(req.body);

        if (validationResponse.error) {
            res.status(400).json({
                error: "invalid",
                message: myConstants.SCHEMA_ERR,
            });
        } else {
            const response = await User.create(req.body);

            console.log("User created successfully:", response.email);

            res.send({
                status: "success",
                message: "User created successfully",
                data: response.email,
            });
        }
    } catch (error) {
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
