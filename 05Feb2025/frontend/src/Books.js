import { useState, useEffect } from "react";
import { Book } from "./Book";

function Books() {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [allocateMode, setAllocateMode] = useState(false);
    const [formData, setFormData] = useState({ isbn: "", name: "", author: "", total_copies: 0, allocated_copies:0 });
    const [allocationData, setAllocationData] = useState({ member_id: "", book_name:"", from_date: "", to_date: "" });
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        async function fetchData(){
            await fetch("http://localhost:8000/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
            await fetch("http://localhost:8000/members")
            .then((res) => res.json())
            .then((data) => setMembers(data.members));    
        }
        fetchData();
    }, []);

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

    const handleEdit = (book) => {
        setFormData(book);
        setEditMode(true);
        setShowModal(true);
    };

    const handleAllocate = (book) => {
        setSelectedBook(book);
        setAllocationData({ ...allocationData, book_name: book.name });
        setAllocateMode(true);
    };

    const allocateBook = async () => {
        await fetch(`http://localhost:8000/allocateBook/${selectedBook.isbn}/${allocationData.member_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_date: allocationData.from_date, to_date: allocationData.to_date, book_name: selectedBook.name })
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
        <br/>
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

export {Books};