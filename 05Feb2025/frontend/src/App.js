import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000';

// Utility function for API calls
const fetchApi = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
};

const App = () => {
    const [activeTab, setActiveTab] = useState('books'); // 'books' or 'members'
    const [selectedItem, setSelectedItem] = useState(null);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const booksData = await fetchApi('/books');
        const membersData = await fetchApi('/members');
        setBooks(booksData);
        setMembers(membersData.members);
    };

    const handleAdd = async (data) => {
        if (activeTab === 'books') {
        await fetchApi('/books', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        } else {
        await fetchApi('/member', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        }
        fetchData();
        setShowForm(false);
    };

    const handleUpdate = async (data) => {
        if (activeTab === 'books') {
        await fetchApi(`/books/${data.isbn}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        } else {
        await fetchApi(`/members/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        }
        fetchData();
        setIsEditing(false);
        setSelectedItem(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
        if (activeTab === 'books') {
            await fetchApi(`/books/${id}`, { method: 'DELETE' });
        } else {
            await fetchApi(`/members/${id}`, { method: 'DELETE' });
        }
        fetchData();
        setSelectedItem(null);
        }
    };

    const handleAllocateBook = async (bookIsbn, memberId) => {
        await fetchApi(`/allocateBook/${bookIsbn}&${memberId}`, { method: 'PUT' });
        fetchData();
    };

    const handleDeallocateBook = async (bookIsbn, memberId) => {
        await fetchApi(`/deallocateBook/${bookIsbn}&${memberId}`, { method: 'PUT' });
        fetchData();
    };

    const BookForm = ({ book, onSubmit }) => {
        const [formData, setFormData] = useState(
        book || { isbn: '', name: '', author: '', total_copies: 0, allocated_copies: 0 }
        );

        return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
        }} className="space-y-4">
            <input
            type="text"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="w-full p-2 border rounded"
            disabled={book}
            />
            <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            />
            <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-2 border rounded"
            />
            <input
            type="number"
            placeholder="Total Copies"
            value={formData.total_copies}
            onChange={(e) => setFormData({ ...formData, total_copies: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {book ? 'Update' : 'Add'} Book
            </button>
        </form>
        );
    };

    const MemberForm = ({ member, onSubmit }) => {
        const [formData, setFormData] = useState(
        member || { name: '', allocated_books: [] }
        );

        return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
        }} className="space-y-4">
            <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {member ? 'Update' : 'Add'} Member
            </button>
        </form>
        );
    };

    const BookDetails = ({ book }) => {
        const allocatedMembers = members.filter(member => 
        member.allocated_books.includes(book.isbn)
        );

        return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">{book.name}</h3>
            <div>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Total Copies:</strong> {book.total_copies}</p>
            <p><strong>Allocated Copies:</strong> {book.allocated_copies}</p>
            </div>
            <div>
            <h4 className="font-bold">Allocated Members:</h4>
            <ul className="space-y-2">
                {allocatedMembers.map(member => (
                <li key={member.id} className="flex justify-between items-center">
                    <span>{member.name}</span>
                    <button
                    onClick={() => {
                        handleDeallocateBook(book.isbn, member.id);
                        fetchData();
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                    Deallocate
                    </button>
                </li>
                ))}
            </ul>
            </div>
        </div>
        );
    };

    const MemberDetails = ({ member }) => {
        const allocatedBooks = books.filter(book => 
        member.allocated_books.includes(book.isbn)
        );

        return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <div>
            <p><strong>ID:</strong> {member.id}</p>
            <p><strong>Allocated Books:</strong> {member.allocated_books.length}</p>
            </div>
            <div>
            <h4 className="font-bold">Allocated Books:</h4>
            <ul className="space-y-2">
                {allocatedBooks.map(book => (
                <li key={book.isbn} className="flex justify-between items-center">
                    <span>{book.name}</span>
                    <button
                    onClick={() =>{ 
                        handleDeallocateBook(book.isbn, member.id);
                        fetchData();
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                    Deallocate
                    </button>
                </li>
                ))}
            </ul>
            </div>
        </div>
        );
    };

    const BookList = ({books}) => {
        return (
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Author</th>
                        <th className="text-left">Total Copies</th>
                        <th className="text-left">Allocated Copies</th>
                        <th className="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {books.map(book => (
                        <tr key={book.isbn} className="border-b">
                        <td className="py-2">
                            <button
                            onClick={() => setSelectedItem(book)}
                            className="text-blue-500 hover:underline"
                            >
                            {book.name}
                            </button>
                        </td>
                        <td className="py-2">{book.author}</td>
                        <td className="py-2">{book.total_copies}</td>
                        <td className="py-2">{book.allocated_copies}</td>
                        <td>
                            <button
                            onClick={() => {
                                const memberId = prompt('Enter Member ID to allocate this book:');
                                if (memberId) handleAllocateBook(book.isbn, memberId);
                                fetchData();
                            }}
                            className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                            >
                            Allocate
                            </button>
                            <button
                            onClick={() => {
                                setIsEditing(true);
                                setSelectedItem(book);
                            }}
                            className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => handleDelete(book.isbn)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>);
    };

    const MemberList = ({members}) => {
        return (
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {members.map(member => (
                    <tr key={member.id} className="border-b">
                    <td className="py-2">
                        <button
                        onClick={() => setSelectedItem(member)}
                        className="text-blue-500 hover:underline"
                        >
                        {member.name}
                        </button>
                    </td>
                    <td>
                        <button
                        onClick={() => {
                            setIsEditing(true);
                            setSelectedItem(member);
                            setIsEditing(true);
                            setSelectedItem(member);
                        }}
                        className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(member.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
        <div className="flex space-x-4 mb-4">
            <button
            onClick={() => {
                setActiveTab('books');
                setSelectedItem(null);
            }}
            className={`px-4 py-2 rounded ${activeTab === 'books' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
            Books
            </button>
            <button
            onClick={() => {
                setActiveTab('members');
                setSelectedItem(null);
            }}
            className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
            Members
            </button>
        </div>

        <div className="mb-4">
            <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
            >
            Add {activeTab === 'books' ? 'Book' : 'Member'}
            </button>
        </div>

        {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                {activeTab === 'books' ? (
                <BookForm onSubmit={handleAdd} />
                ) : (
                <MemberForm onSubmit={handleAdd} />
                )}
                <button
                onClick={() => setShowForm(false)}
                className="w-full mt-4 bg-gray-500 text-white p-2 rounded"
                >
                Cancel
                </button>
            </div>
            </div>
        )}

        {selectedItem ? (
            <div>
                <button
                    onClick={() => setSelectedItem(null)}
                    className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
                {activeTab === 'books' ? (
                    <BookDetails book={selectedItem} />
                ) : (
                    <MemberDetails member={selectedItem} />
                )}
            </div>
        ) : (
            <div>
                {activeTab === 'books' ? (
                    <BookList books={books}></BookList>
                ) : (
                    <MemberList members={members}></MemberList>
                )}
            </div>
        )}

        {isEditing && selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                {activeTab === 'books' ? (
                <BookForm book={selectedItem} onSubmit={handleUpdate} />
                ) : (
                <MemberForm member={selectedItem} onSubmit={handleUpdate} />
                )}
                <button
                onClick={() => {
                    setIsEditing(false);
                    setSelectedItem(null);
                }}
                className="w-full mt-4 bg-gray-500 text-white p-2 rounded"
                >
                Cancel
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default App;