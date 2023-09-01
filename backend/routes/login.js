const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const schema = require("../schema");
const myConstants = require("../constants");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        console.log("Received Login Request");
        const validationResponse = schema.loginSchema.validate(req.body);

        if (validationResponse.error) {
            res.status(400).json({
                error: "invalid",
                message: myConstants.SCHEMA_ERR,
            });
        } else {
            console.log("Checking");

            const { email, phone, password } = req.body;

            const response = email
                ? await User.findOne({
                      email,
                  })
                : await User.findOne({
                      phone,
                  });

            if (response === null) {
                res.status(400).json({
                    error: "notexist",
                    message: myConstants.NOT_EXIST_ERR,
                });
            } else {
                console.log(response);

                const result = await bcrypt.compare(
                    password,
                    response.password
                );

                if (result) {
                    res.send({
                        status: "success",
                        message: "User authenticated",
                        jwt: jwt.sign(
                            {
                                email: response.email,
                                expiry: myConstants.getExpiry(),
                            },
                            myConstants.JWT_KEY
                        ),
                    });
                } else {
                    res.status(400).json({
                        error: "wrongpass",
                        message: myConstants.PASS_ERR,
                    });
                }
            }
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
