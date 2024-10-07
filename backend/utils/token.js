const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (payload) => {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET);
};

module.exports = {
	createAccessToken,
};

/* JWT Creation:

The function createAccessToken takes a payload as an argument and creates a signed JWT using the jsonwebtoken library.
The payload contains data (e.g., user ID) that will be embedded in the token.
Signing with the Secret:

The token is signed using the ACCESS_TOKEN_SECRET, which is stored in your environment variables (process.env).
This secret ensures that the token is secure and cannot be tampered with.
Return Value:

The function returns the JWT, which will later be sent to the client after successful login or other operations.*/
