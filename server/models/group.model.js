import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: String,
    type: { 
        type: String, 
        enum: ["roommates", "trip", "friends", "couple", "other"], 
        default: "other" 
    },  
    currency: { type: String, default: "INR" },
    members: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        role: { 
            type: String, 
            enum: ["admin", "member"], 
            default: "member" 
        },
        joinedAt: { 
            type: Date, 
            default: Date.now
        }
    }],
    settings: {
        simplifyDebts: { 
            type: Boolean, 
            default: true 
        }
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
}, { timestamps: true} );