const BookDetails = ({ book, allocatedMembers, handleDeallocateBook }) => {

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">{book.name}</h3>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Total Copies:</strong> {book.total_copies}</p>
            <p><strong>Allocated Copies:</strong> {book.allocated_copies}</p>
            <h4 className="font-bold">Allocation Details:</h4>
            <ul>
                {allocatedMembers.map(member => {
                    const allocation = member.allocated_books.find(a => a.book_isbn === book.isbn);
                    return (
                        <li key={member.id} className="flex justify-between items-center">
                            <span>{member.name} (From: {allocation.from_date}, To: {allocation.to_date})</span>
                            <button
                                onClick={() => handleDeallocateBook(book.isbn, member.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Deallocate
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export { BookDetails };