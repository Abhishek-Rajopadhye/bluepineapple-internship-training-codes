/**
 * Backend server for managing books, members, and book allocations.
 * @module server
 * @requires express
 * @requires cors
 * @requires ./routes/books
 * @requires ./routes/members
 * @requires ./routes/allocations
 */

const express = require('express');
const cors = require('cors');
const app = express();
const booksRouter = require('./routes/books');
const membersRouter = require('./routes/members');
const allocationsRouter = require('./routes/allocations');

const PORT = 8000;

/**
 * Middleware for parsing request body.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/books', booksRouter);
app.use('/members', membersRouter);
app.use('/allocations', allocationsRouter);


/**
 * Default route.
 */
app.get('/', (req, res) => {
    res.send('Library Management System API');
});

/**
 * Start the server.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});