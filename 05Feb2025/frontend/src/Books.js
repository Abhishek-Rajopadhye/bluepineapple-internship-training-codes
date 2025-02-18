/**
 * Books component that manages the functionality of the books.
 * @module
 * @name Books
 * @requires react
 * @requires Book
 * @exports Books
 */

import { useState, useEffect } from "react";
import { Book } from "./Book";

/**
 * Books component that manages the display, addition, editing, and allocation of books.
 * 
 * @component
 * @name Books
 * @property {Object} props - The props.
 * @property {Array} books - The list of books fetched from the server.
 * @property {Function} setBooks - Function to update the books state.
 * @property {Array} members - The list of members fetched from the server.
 * @property {Function} setMembers - Function to update the members state.
 * @property {boolean} showModal - State to control the visibility of the modal for adding/editing books.
 * @property {Function} setShowModal - Function to update the showModal state.
 * @property {boolean} showDetails - State to control the visibility of book details.
 * @property {Function} setShowDetails - Function to update the showDetails state.
 * @property {boolean} editMode - State to indicate whether the modal is in edit mode or add mode.
 * @property {Function} setEditMode - Function to update the editMode state.
 * @property {boolean} allocateMode - State to indicate whether the book is being allocated.
 * @property {Function} setAllocateMode - Function to update the allocateMode state.
 * @property {Object} formData - The form data for adding/editing a book.
 * @property {Function} setFormData - Function to update the formData state.
 * @property {Object} allocationData - The data for allocating a book.
 * @property {Function} setAllocationData - Function to update the allocationData state.
 * @property {Object} selectedBook - The currently selected book.
 * @property {Function} setSelectedBook - Function to update the selectedBook state.
 * 
 * @returns {JSX.Element} The Books component. * 
 */
function Books() {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [allocateMode, setAllocateMode] = useState(false);
    const [formData, setFormData] = useState({ isbn: "", name: "", author: "", total_copies: 0, allocated_copies: 0 });
    const [allocationData, setAllocationData] = useState({ member_id: "", book_name: "", from_date: "", to_date: "" });
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        
        /**
         * Fetches books and members data from the server.
         * @function
         * @name fetchData
         * @returns {Promise<void>}
         */
        async function fetchData() {
            await fetch("http://localhost:8000/books")
                .then((res) => res.json())
                .then((data) => setBooks(data));
            await fetch("http://localhost:8000/members")
                .then((res) => res.json())
                .then((data) => setMembers(data));
        }
        fetchData();
    }, []);

    /**
     * Handles the addition or editing of a book.
     * @function
     * @name handleAddOrEditBook
     * @returns {void}
     */
    const handleAddOrEditBook = () => {
        const method = editMode ? "PUT" : "POST";
        const url = editMode ? `http://localhost:8000/books/${formData.isbn}` : "http://localhost:8000/books";
        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(() => {
            setShowModal(false);
            window.location.reload();
        });
    };

    /**
     * Sets the form data for editing a book.
     * @function
     * @name handleEdit
     * @param {Object} book - The book to be edited.
     * @returns {void}
     */
    const handleEdit = (book) => {
        setFormData(book);
        setEditMode(true);
        setShowModal(true);
    };
    /**
     * Sets the allocation data for a book.
     * @function
     * @name handleAllocate
     * @param {Object} book - The book to be allocated.
     * @returns {void}
     */
    const handleAllocate = (book) => {
        setSelectedBook(book);
        setAllocationData({ ...allocationData, book_name: book.name });
        setAllocateMode(true);
    };

    /**
     * Allocates a book to a member.
     * @function
     * @name allocateBook
     * @returns {Promise<void>}
     */
    const allocateBook = async () => {
        await fetch(`http://localhost:8000/allocations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user_id: allocationData.member_id, book_isbn:selectedBook.isbn, from_date: allocationData.from_date, to_date: allocationData.to_date, book_name: selectedBook.name })
        }).then(() => {
            setAllocateMode(false);
            window.location.reload();
        });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Books</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Author</th>
                        <th className="border p-2">Allocated Copies</th>
                        <th className="border p-2">Total Copies</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.isbn} className="border">
                            <td className="p-2 text-blue-500 cursor-pointer" onClick={() => {
                                setSelectedBook(book);
                                setShowDetails(true);
                            }}>{book.name}</td>
                            <td className="p-2">{book.author}</td>
                            <td className="p-2">{book.allocated_copies}</td>
                            <td className="p-2">{book.total_copies}</td>
                            <td className="p-2">
                                <button className="bg-yellow-500 text-white px-2 py-1 mr-2" onClick={() => handleEdit(book)}>Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 mr-2">Delete</button>
                                <button className="bg-blue-500 text-white px-2 py-1" onClick={() => handleAllocate(book)}>Allocate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="bg-green-500 text-white px-4 py-2 mb-4" onClick={() => { setEditMode(false); setShowModal(true); }}>Add Book</button>

            {showDetails && selectedBook && <Book book={selectedBook} onClose={() => {
                setSelectedBook(null);
                setShowDetails(false);
            }} />}

            {allocateMode && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white border p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Allocate Book</h2>
                        <select className="border p-2 w-full mb-2" onChange={(e) => setAllocationData({ ...allocationData, member_id: e.target.value })}>
                            <option value="">Select Member</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
                        </select>
                        <input className="border p-2 w-full mb-2" type="date" onChange={(e) => setAllocationData({ ...allocationData, from_date: e.target.value })} />
                        <input className="border p-2 w-full mb-2" type="date" onChange={(e) => setAllocationData({ ...allocationData, to_date: e.target.value })} />
                        <div className="flex justify-end">
                            <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={() => setAllocateMode(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={allocateBook}>Allocate</button>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="fixed border inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white border p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">{editMode ? "Edit Book" : "Add Book"}</h2>
                        <input className="border p-2 w-full mb-2" placeholder="ISBN" value={formData.isbn} readOnly={editMode} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
                        <input className="border p-2 w-full mb-2" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <input className="border p-2 w-full mb-2" placeholder="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                        <input className="border p-2 w-full mb-2" type="number" placeholder="Total Copies" value={formData.total_copies} onChange={(e) => setFormData({ ...formData, total_copies: e.target.value })} />
                        <div className="flex justify-end">
                            <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddOrEditBook}>{editMode ? "Update" : "Add"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { Books };