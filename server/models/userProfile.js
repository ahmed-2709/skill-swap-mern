const mongoose = require("mongoose");
const User = require("../models/User");

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    offeredSkills: {
        type: [String],
        default: []
    },
    desiredSkills: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
      default: ""
    },
    createdAt: {
         type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model("UserProfile", userProfileSchema);