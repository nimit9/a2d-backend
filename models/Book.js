import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
    },
    author: {
        type: String,
        required: [true, "Please provide password"],
    },
    isbn: {
        type: String,
        required: [true, "Please provide isbn number"],
        minlength: 10,
    },
    price: {
        type: Number,
        required: [true, "Please provide price"],
    },
    numOfTimesIssued: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        default: "Book",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
});

export default mongoose.model("Book", BookSchema);
