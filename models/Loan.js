const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
    },
    items: [
        {
            book_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        }
    ],
    borrowDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        default: null, 
    },
    status: {
        type: String,
        required: true,
        enum: ["Borrowing", "Overdue", "Returned"],
        default: "Borrowing",
    }
}, { timestamps: true });

const Loan = mongoose.model("Loan", LoanSchema);

module.exports = Loan;