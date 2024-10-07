const mongoose = require("mongoose");

// Function to validate email format
const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

// Function to validate MongoDB Object ID
const validateObjectId = (string) => {
	return mongoose.Types.ObjectId.isValid(string);
};

module.exports = {
	validateEmail,
	validateObjectId,
};
