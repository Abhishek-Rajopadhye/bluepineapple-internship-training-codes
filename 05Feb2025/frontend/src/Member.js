
function Member({member, onClose}) {

    const handleDeallocate = (isbn) => {
        fetch(`http://localhost:8000/deallocateBook/${isbn}/${member.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="fixed border inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Member Details</h2>
                <p><strong>Name:</strong> {member.name}</p>
                <h3 className="text-md font-bold mt-4">Allocated Books:</h3>
                <ul>
                    {member.allocated_books?.map((book) => (
                    <li key={book.id} className="flex justify-between items-center border-b py-2">
                        {book.book_name} ({book.from_date} - {book.to_date})
                        <button className="bg-red-500 text-white px-2 py-1 ml-4" onClick={()=>{handleDeallocate(book.id)}}>Deallocate</button>
                    </li>
                    ))}
                </ul>
                <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    );

}

export { Member };