const mongoose = require("mongoose");

const requestSchema =new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillOffered: {
        type: String,
    },
    skillWanted: {
        type: String,
    },
    status: {
        type: String, 
        enum: ["Pending", "Accepted", "Declined"],
        default: "Pending"
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Request", requestSchema);