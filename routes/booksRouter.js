import {
    createBook,
    deleteBook,
    getAllBooks,
    updateBook,
} from "../controllers/booksController.js";

import express from "express";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").patch(updateBook).delete(deleteBook);

export default router;
