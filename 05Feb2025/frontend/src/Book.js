import {useState, useEffect} from "react";

function Book({ book, onClose }) {
    const [members, setMembers] = useState([]);
    const [allocatedMembers, setAllocatedMembers] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8000/members")
        .then((res) => res.json())
        .then((data) => setMembers(data.members));
        setAllocatedMembers(members.filter((member) => member.allocated_books.includes(book.isbn)));
    }, [book ,members])

    const handleDeallocate = (member_id) => {
        fetch(`http://localhost:8000/deallocateBook/${book.isbn}/${member_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        }).then(() => {
            window.location.reload();
        });
    };

    return (
      <div className="fixed border inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white border p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">{book.name} - Details</h2>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Total Copies:</strong> {book.total_copies}</p>
          <p><strong>Allocated Copies:</strong> {book.allocated_copies}</p>
          <h3 className="text-md font-bold mt-4">Allocated Members:</h3>
          <ul>
            {allocatedMembers?.length > 0 ? (
              book.allocated_members.map((member, index) => (
                <li key={index}>
                    {member.name} (From: {member.from_date} - To: {member.to_date})<br/><button className="bg-red-500 text-white px-4 py-1" onClick={() => handleDeallocate(member.id)}>Deallocate</button>
                </li>
              ))
            ) : (
              <p>No members allocated.</p>
            )}
          </ul>
          <div className="flex justify-end mt-4">
            <button className="bg-red-500 text-white px-4 py-2" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
    
export { Book };