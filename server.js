// Import express framework
const express = require("express");

// Create express application
const app = express();

// Middleware to read JSON data from request body
app.use(express.json());

// Temporary in-memory book data
// This acts like a simple database
let books = [
    {
        id: 1,
        title: "Java Programming",
        author: "James Gosling",
        price: 500
    },
    {
        id: 2,
        title: "Web Development",
        author: "Tim Berners-Lee",
        price: 700
    }
];

// Home route to check API status
app.get("/", (req, res) => {
    res.send("Library Management API is running successfully");
});

// GET API - Fetch all books
app.get("/books", (req, res) => {
    res.json(books);
});

// GET API - Fetch a single book by ID
app.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

// POST API - Add a new book
app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// PUT API - Update existing book
app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;

    res.json({
        message: "Book updated successfully",
        book: book
    });
});

// DELETE API - Delete book by ID
app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const bookExists = books.find(b => b.id === bookId);

    if (!bookExists) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books = books.filter(b => b.id !== bookId);

    res.json({
        message: "Book deleted successfully"
    });
});

// Define server port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});