import {useState, useEffect} from "react";

function Book({book_id}){
    const [book, setBook] = useState({"isbn": "", "name": "", "author": "", "total_copies": 0, "allocated_copies": 0});
    const [members, setMembers] = useState([]);
    const [allocatedMembers, setAllocatedMembers] = useState([]);
    

    
    useEffect(() => {
        fetch("http://localhost:8000/books/"+book_id)
        .then((res) => res.json())
        .then((data) => setBook(data));
        fetch("http://localhost:8000/members")
        .then((res) => res.json())
        .then((data) => setMembers(data.members));
        setAllocatedMembers(members.filter((member) => member.allocated_books.includes(book.isbn)));
    }, [book, book_id ,members])

    const handleDeallocate = (member_id) => {
        fetch(`http://localhost:8000/deallocateBook/${book.isbn}/${member_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        }).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Book</h2>
            <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">ISBN</label>
                        <p className="mt-1 text-sm text-gray-900">{book.isbn}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{book.name}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <p className="mt-1 text-sm text-gray-900">{book.author}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Total Copies</label>
                        <p className="mt-1 text-sm text-gray-900">{book.total_copies}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Allocated Copies</label>
                        <p className="mt-1 text-sm text-gray-900">{book.allocated_copies}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-4">Allocated Members</h3>
                    <ul>
                        {allocatedMembers.map((member) => (
                            <li key={member.id} className="flex justify-between items-center p-2 border-b">
                                <p>{member.member_name}</p>
                                <button className="bg-red-500 text-white px-4 py-1" onClick={() => handleDeallocate(member.id)}>Deallocate</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
    
export { Book };