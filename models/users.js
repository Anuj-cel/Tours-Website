
// const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose'); // Correct import
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true
//     },
// });

// // Apply the plugin
// userSchema.plugin(passportLocalMongoose); // automatically add username,password , hashing ,autheticate

// // Export the model
// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "username" });

module.exports = mongoose.model("User", userSchema);
