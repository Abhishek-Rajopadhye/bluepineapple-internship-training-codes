/**
 * Express router providing allocation related routes.
 * @module routes/allocations
 * @requires express.Router()
 * @requires file_handling
 */

const express = require('express');
const router = express.Router();
const { loadFile, saveFile, ALLOCATIONS_FILE, MEMBERS_FILE, BOOKS_FILE } = require('../file_handling');

/**
 * POST /allocations
 * Allocates a book to a member.
 * @name addAllocation
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/', async (req, res) => {
    try {
        const { user_id, book_isbn, book_name, from_date, to_date } = req.body;
        const membersData = await loadFile(MEMBERS_FILE);
        const booksData = await loadFile(BOOKS_FILE);
        const allocationsData = await loadFile(ALLOCATIONS_FILE);

        const member = membersData.members.find(m => m.id === parseInt(user_id));
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const book = booksData.books.find(b => b.isbn === book_isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (book.allocated_copies >= book.total_copies) {
            return res.status(400).json({ error: 'No copies available for allocation' });
        }

        // Check if the book is already allocated to this member
        const existingAllocation = allocationsData.allocations.find(entry => entry.book_isbn === book_isbn && entry.user_id === parseInt(user_id));
        if (existingAllocation) {
            return res.status(400).json({ error: 'Book already allocated to this member' });
        }

        // Allocate book
        allocationsData.allocations.push({ user_id: parseInt(user_id), book_isbn: book_isbn, book_name: book_name, from_date: from_date, to_date: to_date });
        book.allocated_copies += 1;

        await saveFile(ALLOCATIONS_FILE, allocationsData);
        await saveFile(BOOKS_FILE, booksData);
        res.json({ message: 'Book allocated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to allocate book' });
    }
});

/**
 * DELET /allocations/:isbn/:memberId
 * Deallocates a book from a member.
 * @name deleteAllocation
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/:isbn/:memberId', async (req, res) => {
    try {
        const { isbn, memberId } = req.params;
        const membersData = await loadFile(MEMBERS_FILE);
        const booksData = await loadFile(BOOKS_FILE);
        const allocationsData = await loadFile(ALLOCATIONS_FILE);

        const member = membersData.members.find(m => m.id === parseInt(memberId));
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const book = booksData.books.find(b => b.isbn === isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Remove the book from allocated list
        const prevAllocatedLength = allocationsData.allocations.length;
        allocationsData.allocations = allocationsData.allocations.filter(entry => entry.book_isbn !== isbn || entry.user_id !== parseInt(memberId));

        if (allocationsData.allocations.length === prevAllocatedLength) {
            return res.status(400).json({ error: 'Book not allocated to this member' });
        }

        // Reduce allocated copies count
        book.allocated_copies = Math.max(0, book.allocated_copies - 1);

        await saveFile(ALLOCATIONS_FILE, allocationsData);
        await saveFile(BOOKS_FILE, booksData);
        res.json({ message: 'Book deallocated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to deallocate book' });
    }
});

/**
 * GET /allocations
 * Retrieves all book allocations.
 * @name getAllocations
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/', async (req, res) => {
    try {
        const data = await loadFile(ALLOCATIONS_FILE);
        res.json(data.allocations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load allocations' });
    }
});

module.exports = router;
