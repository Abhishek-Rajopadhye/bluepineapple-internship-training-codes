const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const BOOKS_FILE = "../storage/books.json";
const MEMBERS_FILE = "../storage/members.json";

// Helper functions
async function loadData(fileName) {
    try {
        const data = await fs.readFile(fileName, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return fileName === BOOKS_FILE ? 
                { books: [] } : 
                { members: [] };
        }
        throw error;
    }
}

async function saveData(fileName, data) {
    try {
        const formattedData = fileName === BOOKS_FILE ? 
            { books: Array.isArray(data.books) ? data.books : [] } :
            { members: Array.isArray(data.members) ? data.members : [] };
            
        await fs.writeFile(fileName, JSON.stringify(formattedData, null, 4));
    } catch (error) {
        console.error(`Error writing to ${fileName}:`, error);
        throw error;
    }
}

// Book routes
app.get('/books', async (req, res) => {
    try {
        const data = await loadData(BOOKS_FILE);
        res.json(data.books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load books' });
    }
});

app.get('/books/:isbn', async (req, res) => {
    try {
        const data = await loadData(BOOKS_FILE);
        const book = data.books.find(book => book.isbn === req.params.isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load book' });
    }
});

app.post('/books', async (req, res) => {
    try {
        const { isbn, name, author, total_copies, allocated_copies } = req.body;
        
        if (!isbn || !name || !author || total_copies === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data = await loadData(BOOKS_FILE);
        
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
        await saveData(BOOKS_FILE, data);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book' });
    }
});

app.put('/books/:isbn', async (req, res) => {
    try {
        const { name, author, total_copies, allocated_copies } = req.body;
        const data = await loadData(BOOKS_FILE);
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

        await saveData(BOOKS_FILE, data);
        res.json(data.books[bookIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
});

app.delete('/books/:isbn', async (req, res) => {
    try {
        const data = await loadData(BOOKS_FILE);
        const bookIndex = data.books.findIndex(book => book.isbn === req.params.isbn);
        
        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not found' });
        }

        data.books.splice(bookIndex, 1);
        await saveData(BOOKS_FILE, data);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

// Member routes
app.get('/members', async (req, res) => {
    try {
        const data = await loadData(MEMBERS_FILE);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load members' });
    }
});

app.get('/members/:id', async (req, res) => {
    try {
        const data = await loadData(MEMBERS_FILE);
        const member = data.members.find(member => member.id === parseInt(req.params.id));
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load member' });
    }
});

app.post('/member', async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const data = await loadData(MEMBERS_FILE);
        
        // Generate new ID
        const maxId = data.members.reduce((max, member) => Math.max(max, member.id), 0);
        const newMember = {
            id: maxId + 1,
            name,
            allocated_books: []
        };

        data.members.push(newMember);
        await saveData(MEMBERS_FILE, data);
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add member' });
    }
});

app.put('/members/:id', async (req, res) => {
    try {
        const { name, allocated_books } = req.body;
        const data = await loadData(MEMBERS_FILE);
        const memberIndex = data.members.findIndex(member => member.id === parseInt(req.params.id));
        
        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found' });
        }

        data.members[memberIndex] = {
            ...data.members[memberIndex],
            name: name || data.members[memberIndex].name,
            allocated_books: allocated_books || data.members[memberIndex].allocated_books
        };

        await saveData(MEMBERS_FILE, data);
        res.json(data.members[memberIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update member' });
    }
});

app.delete('/members/:id', async (req, res) => {
    try {
        const data = await loadData(MEMBERS_FILE);
        const memberIndex = data.members.findIndex(member => member.id === parseInt(req.params.id));
        
        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found' });
        }

        data.members.splice(memberIndex, 1);
        await saveData(MEMBERS_FILE, data);
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete member' });
    }
});

// Book allocation routes
app.put('/allocateBook/:isbn/:memberId', async (req, res) => {
    try {
        const { isbn, memberId } = req.params;
        const { from_date, to_date } = req.body;
        const membersData = await loadData(MEMBERS_FILE);
        const booksData = await loadData(BOOKS_FILE);

        const member = membersData.members.find(m => m.id === parseInt(memberId));
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const book = booksData.books.find(b => b.isbn === isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (book.allocated_copies >= book.total_copies) {
            return res.status(400).json({ error: 'No copies available for allocation' });
        }

        // Check if the book is already allocated to this member
        const existingAllocation = member.allocated_books.find(entry => entry.id === isbn);
        if (existingAllocation) {
            return res.status(400).json({ error: 'Book already allocated to this member' });
        }

        // Allocate book
        member.allocated_books.push({ id: isbn, from_date:from_date, to_date:to_date });
        book.allocated_copies += 1;

        await saveData(MEMBERS_FILE, membersData);
        await saveData(BOOKS_FILE, booksData);
        res.json({ message: 'Book allocated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to allocate book' });
    }
});


app.put('/deallocateBook/:isbn/:memberId', async (req, res) => {
    try {
        const { isbn, memberId } = req.params;
        const membersData = await loadData(MEMBERS_FILE);
        const booksData = await loadData(BOOKS_FILE);

        const member = membersData.members.find(m => m.id === parseInt(memberId));
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const book = booksData.books.find(b => b.isbn === isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Remove the book from allocated list
        const prevAllocatedLength = member.allocated_books.length;
        member.allocated_books = member.allocated_books.filter(entry => entry.id !== isbn);

        if (member.allocated_books.length === prevAllocatedLength) {
            return res.status(400).json({ error: 'Book not allocated to this member' });
        }

        // Reduce allocated copies count
        book.allocated_copies = Math.max(0, book.allocated_copies - 1);

        await saveData(MEMBERS_FILE, membersData);
        await saveData(BOOKS_FILE, booksData);
        res.json({ message: 'Book deallocated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to deallocate book' });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
