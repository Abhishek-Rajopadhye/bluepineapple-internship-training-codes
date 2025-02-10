import React, { useState } from "react";

const LibraryManagement = ({handleAllocateBook}) => {
    const [showAllocateForm, setShowAllocateForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState("");
    const [selectedMember, setSelectedMember] = useState("");

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Library Management</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ISBN</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Author</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.isbn} className="border">
                            <td className="border p-2">{book.isbn}</td>
                            <td className="border p-2">{book.name}</td>
                            <td className="border p-2">{book.author}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => setShowAllocateForm(true)}
                                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Allocate
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAllocateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Allocate Book</h3>
                        <select
                            value={selectedBook}
                            onChange={(e) => setSelectedBook(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        >
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book.isbn} value={book.isbn}>{book.name}</option>
                            ))}
                        </select>
                        <select
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">Select Member</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => {
                                if (selectedBook && selectedMember) {
                                    handleAllocateBook(selectedBook, selectedMember);
                                    setShowAllocateForm(false);
                                }
                            }}
                            className="w-full bg-blue-500 text-white p-2 rounded mb-2"
                        >
                            Allocate
                        </button>
                        <button
                            onClick={() => setShowAllocateForm(false)}
                            className="w-full bg-gray-500 text-white p-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

module.exports = LibraryManagement;
