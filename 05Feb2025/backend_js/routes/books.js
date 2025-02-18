/**
 * Express router providing book related routes.
 * @module routes/books
 * @requires express.Router()
 * @requires file_handling
 */

const express = require('express');
const router = express.Router();
const { loadFile, saveFile, BOOKS_FILE } = require('../file_handling');

/**
 * GET /books
 * Retrieves all books.
 * @function
 * @name getBooks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/', async (req, res) => {
    try {
        const data = await loadFile(BOOKS_FILE);
        res.json(data.books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load books' });
    }
});

/**
 * GET /books/:isbn
 * Retrieves a book by ISBN.
 * @function
 * @name getBookByISBN
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/:isbn', async (req, res) => {
    try {
        const data = await loadFile(BOOKS_FILE);
        const book = data.books.find(book => book.isbn === req.params.isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load book' });
    }
});

/**
 * POST /books
 * Adds a new book.
 * @function
 * @name addBook
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/', async (req, res) => {
    try {
        const { isbn, name, author, total_copies, allocated_copies } = req.body;
        
        if (!isbn || !name || !author || total_copies === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data = await loadFile(BOOKS_FILE);
        
        if (data.books.some(book => book.isbn === isbn)) {
            return res.status(409).json({ error: 'Book with this ISBN already exists' });
        }

        const newBook = {
            isbn,
            name,
            author,
            total_copies: parseInt(total_copies),
            allocated_copies: allocated_copies || 0
        };

        data.books.push(newBook);
        await saveFile(BOOKS_FILE, data);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book' });
    }
});

/**
 * PUT /books/:isbn
 * Updates a book by ISBN.
 * @function
 * @name updateBook
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.put('/:isbn', async (req, res) => {
    try {
        const { name, author, total_copies, allocated_copies } = req.body;
        const data = await loadFile(BOOKS_FILE);
        const bookIndex = data.books.findIndex(book => book.isbn === req.params.isbn);
        
        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not found' });
        }

        data.books[bookIndex] = {
            ...data.books[bookIndex],
            name: name || data.books[bookIndex].name,
            author: author || data.books[bookIndex].author,
            total_copies: total_copies !== undefined ? parseInt(total_copies) : data.books[bookIndex].total_copies,
            allocated_copies: allocated_copies !== undefined ? parseInt(allocated_copies) : data.books[bookIndex].allocated_copies
        };

        await saveFile(BOOKS_FILE, data);
        res.json(data.books[bookIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
});

/**
 * DELETE /books/:isbn
 * Deletes a book by ISBN.
 * @function
 * @name deleteBook
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/:isbn', async (req, res) => {
    try {
        const data = await loadFile(BOOKS_FILE);
        const bookIndex = data.books.findIndex(book => book.isbn === req.params.isbn);
        
        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not found' });
        }

        data.books.splice(bookIndex, 1);
        await saveFile(BOOKS_FILE, data);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

module.exports = router;