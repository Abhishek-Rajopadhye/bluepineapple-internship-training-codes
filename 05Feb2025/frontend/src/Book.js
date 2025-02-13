import {useState, useEffect} from "react";

function Book({ book, onClose }) {
    const [members, setMembers] = useState([]);
    const [allocatedMembers, setAllocatedMembers] = useState([]);
    
    useEffect(() => {
        async function fetchMembers()
        {
            await fetch("http://localhost:8000/members")
            .then((res) => res.json())
            .then((data) => {
                setMembers(data.members);
            });
            setAllocatedMembers(members.filter((member) => member.allocated_books.some((allocated_book) => allocated_book.id === book.isbn)));
        }
        if(allocatedMembers.length <= 0){
            fetchMembers();            
        }
    }, [book ,members, allocatedMembers])

    const handleDeallocate = async (member_id) => {
        await fetch(`http://localhost:8000/deallocateBook/${book.isbn}/${member_id}`, {
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
          <ol>
            {allocatedMembers?.length > 0 ? (
              allocatedMembers.map((member) => {
                const allocatedBook = member.allocated_books.find((allocated_book) => allocated_book.id === book.isbn);
                return (
                  <li key={member.id}>
                    {member.name} From: {allocatedBook.from_date} - To: {allocatedBook.to_date}
                    <button className="bg-red-500 text-white px-4 py-1" onClick={() => handleDeallocate(member.id)}>Deallocate</button>
                  </li>
                );
              })
            ) : (
              <p>No members allocated.</p>
            )}
          </ol>
          <div className="flex justify-end mt-4">
            <button className="bg-red-500 text-white px-4 py-2" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
    
export { Book };