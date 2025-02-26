/**
 * Member component to display member details and allocated books.
 * @component
 * @name Member
 * @requires react
 * @export Member
 */
import { useState, useEffect } from "react";

/**
 * Member component to display member details and allocated books.
 * Handles functionality to deallocate the specifief book from specified user.
 * @component
 * @name Member
 * @param {Object} props - The component props.
 * @param {Object} props.member - The member object.
 * @param {Function} props.onClose - The function to call when closing the member details.
 * @returns {JSX.Element} The rendered
 */
function Member({ member, onClose }) {
    const [allocatedBooks, setAllocatedBooks] = useState([]);

    useEffect(() => {

        /**
         * Fetches allocations data from the server and then sets the varaibles accordingly.
         * @function
         * @name fetchAllocations
         * @returns {Promise<void>}
         * @async
         */
        async function fetchAllocations() {
            await fetch("http://localhost:8000/allocations")
                .then((res) => res.json())
                .then((data) => {
                    const memberAllocations = data.filter((allocation) => allocation.user_id === member.id);
                    setAllocatedBooks(memberAllocations);
                });
        }

        fetchAllocations();
    }, [member]);

    /**
     * Handles deallocation of a book from a member.
     * Calls the DELETE method.
     * @function
     * @name handleDeallocate
     * @param {string} isbn - The ISBN of the book to deallocate.
     * @returns {Promise<void>}
     * @async
     */
    const handleDeallocate = async (isbn) => {
        await fetch(`http://localhost:8000/allocations/${isbn}/${member.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="fixed border inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Member Details</h2>
                <p><strong>Name:</strong> {member.name}</p>
                <h3 className="text-md font-bold mt-4">Allocated Books:</h3>
                <ul>
                    {allocatedBooks?.length > 0 ? (
                        allocatedBooks.map((book) => (
                            <li key={book.book_isbn} className="flex justify-between items-center border-b py-2">
                                {book.book_name} ({book.from_date} - {book.to_date})
                                <button className="bg-red-500 text-white px-2 py-1 ml-4" onClick={() => handleDeallocate(book.book_isbn)}>Deallocate</button>
                            </li>
                        ))
                    ) : (
                        <p>No books allocated.</p>
                    )}
                </ul>
                <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export { Member };