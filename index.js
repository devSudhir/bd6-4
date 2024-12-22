const express = require("express");
const { resolve } = require("path");
const { getAllBooks, getBookById, addBook } = require("./book.js");

const app = express();
const port = 3010;

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.get("/api/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found!" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    const book = getBookById(parseInt(req.params.id));
    if (book) {
      res.json({ book: book });
    } else {
      // res.status(404).json({ error: 'Invalid id! book not found' });
      res.status(404).send("Invalid id! book not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/books", async (req, res) => {
  try {
    const book = addBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
