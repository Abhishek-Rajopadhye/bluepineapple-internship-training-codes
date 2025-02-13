import { useState, useEffect } from "react";

function Member({member_id}) {
    const [member, setMember] = useState({ "id": 0, "member_name": "", "allocated_books": [] });

    useEffect(() => {
        fetch("http://localhost:8000/members/"+member_id)
        .then((res) => res.json())
        .then((data) => setMember(data));
    }, [member_id]);

    const handleDeallocate = (isbn) => {
        fetch(`http://localhost:8000/deallocateBook/${isbn}/${member_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Member</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{member.member_name}</p>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Allocated Books</label>
                <ul>
                    {member.allocated_books.map((book) => (
                        <li key={book.isbn} className="flex justify-between items-center p-2 border-b">
                            <p>{book.name}</p>
                            <button onClick={() => handleDeallocate(book.isbn)} className="bg-red-500 text-white px-2 py-1">Deallocate</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export { Member };