const MemberDetails = ({ member, handleDeallocateBook, fetchData }) => {
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
                    {member.allocated_books.map(book => (
                        <li key={book.isbn} className="flex justify-between items-center">
                            <span>{book.name} (From: {book.from_date} To: {book.to_date})</span>
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

export { MemberDetails };