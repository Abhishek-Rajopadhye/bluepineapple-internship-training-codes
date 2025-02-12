const BookList = ({ books, setSelectedItem, handleDelete, setIsAllocateModalOpen }) => {

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Author</th>
                        <th className="text-left">Total Copies</th>
                        <th className="text-left">Allocated Copies</th>
                        <th className="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.isbn} className="border-b">
                            <td className="py-2">
                                <button
                                    onClick={() => setSelectedItem(book)}
                                    className="text-blue-500 hover:underline"
                                >
                                    {book.name}
                                </button>
                            </td>
                            <td className="py-2">{book.author}</td>
                            <td className="py-2">{book.total_copies}</td>
                            <td className="py-2">{book.allocated_copies}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setIsAllocateModalOpen(true);
                                        setSelectedItem(book);
                                    }}
                                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Allocate
                                </button>
                                <button
                                    onClick={() => setSelectedItem(book)}
                                    className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(book.isbn)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { BookList }