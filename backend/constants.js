const myConstants = {
    SCHEMA_ERR: "Invalid request parameters",
    CONFLICT_ERR: "Email/Phone already exists",
    NOT_EXIST_ERR: "Email/Phone does not exist",
    PASS_ERR: "Wrong password",
    EXPIRY_DAYS: 7,
    SALT_ROUNDS: 3,
    JWT_KEY: "shreeyans",

    getExpiry: () => {
        const date = new Date();
        date.setDate(date.getDate() + myConstants.EXPIRY_DAYS);
        return date.toISOString();
    },
};

module.exports = myConstants;
