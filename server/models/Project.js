import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    desc: {
        type: String,
        required: true,
        unique: false,
    },
    img: {
        type: String,
        default: "",
        unique: false,
    },
    tags: {
        type: [String],
        default: [],
    },
    githubRepo: {
        type: String,
        default: "",
    },
    stages: {
        type: [{
            name: { type: String, required: true },
            color: { type: String, default: "#3B82F6" },
            position: { type: Number, default: 0 },
            type: { type: String, default: "active", enum: ["active", "completed", "cancelled"] }
        }],
        default: [
            { name: "Working", color: "#3B82F6", position: 0, type: "active" },
            { name: "Completed", color: "#10B981", position: 1, type: "completed" },
            { name: "Cancelled", color: "#EF4444", position: 2, type: "cancelled" }
        ]
    },
    status: {
        type: String,
        required: true,
        default: "Working",
    },
    works: {
        type: [String],
        default: []
    },
    ideas: {
        type: [String],
        default: []
    },
    tools: {
        type: [{
            _id: false,
            link: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                require: true,
            }
        }],
        default: [],
    },
    members: {
        type: [{
            _id: false,
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            access: {
                type: String,
                require: true,
                default: "View Only",
                unique: false,
            }
        }],
        required: true,
        default: [],
    },
    documents: {
        type: [{
            name: { type: String, required: true },
            format: { type: String, default: "Link" },
            link: { type: String, required: true },
            dateAdded: { type: Date, default: Date.now }
        }],
        default: [],
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },
    meetingLink: {
        type: String,
        default: "",
    }
},
    { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);