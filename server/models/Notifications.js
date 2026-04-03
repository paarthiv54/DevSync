import mongoose from "mongoose";

const Notifications = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    type: { type: String, required: true },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    status: {
        type: String,
        default: "unread", // unread, read, accepted, rejected
    }
},
    { timestamps: true }
);

export default mongoose.model("Notifications", Notifications);