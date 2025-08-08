import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    groupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Group", 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        default: "INR" 
    },
    category: { 
        type: String, 
        default: "General" 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    payers: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        amount: { 
            type: Number, 
            required: true 
        }
    }],
    splitBetween: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        share: { 
            type: Number, 
            required: true 
        }
    }],
    receiptUrl: String, 
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
