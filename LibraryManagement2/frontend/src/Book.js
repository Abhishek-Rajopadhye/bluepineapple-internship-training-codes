/**
 * Book component that shows the details of a book.
 * @module
 * @name Book
 * @requires react
 * @exports Book
 */

import { useState, useEffect } from "react";

/**
 * Description:
 * Component to display book details and allocated members.
 * Functionality:
 * Handles the retrieval of data and sets the appropriate variables with the retrieved data.
 * Handles the functionality of deallocating the specific book.
 * @component
 * @name Book
 * @param {Object} props - The component props.
 * @param {Object} props.book - The book object.
 * @param {Function} props.onClose - The function to call when closing the book details.
 * @property {Object[]} members - The list of members fetched from the server.
 * @property {Function} setMembers - Function to update the members state.
 * @property {Object[]} allocatedMembers - The list of allocated members fetched from the server.
 * @property {Function} setAllocatedMembers - Function to update the allocatedMembers state.
 * @returns {JSX.Element} The rendered component.
 */
function Book({ book, onClose }) {
    const [members, setMembers] = useState([]);
    const [allocatedMembers, setAllocatedMembers] = useState([]);

    useEffect(() => {

        /**
         * Fetches members data from the server and then stores it in members variable.
         * @function
         * @name fetchMembers
         * @returns {Promise<void>}
         * @async
         */
        async function fetchMembers() {
            await fetch("http://localhost:8000/members")
                .then((res) => res.json())
                .then((data) => {
                    setMembers(data);
                });
        }

        /**
         * Fetches allocations data from the server.
         * Then filters the resulting list based on book isbn.
         * Then sets the allocated members list from the filtered list.
         * @function
         * @name fetchAllocations
         * @returns {Promise<void>}
         * @async
         */
        async function fetchAllocations() {
            await fetch("http://localhost:8000/allocations")
                .then((res) => res.json())
                .then((data) => {
                    const allocatedMembersData = data.filter((allocation) => allocation.book_isbn === book.isbn);
                    const membersWithAllocations = allocatedMembersData.map((allocation) => {
                        const member = members.find((m) => m.id === allocation.user_id);
                        return { ...member, ...allocation };
                    });
                    setAllocatedMembers(membersWithAllocations);
                });
        }
        fetchMembers();
        fetchAllocations();
    }, [book, members]);

    /**
     * Deallocates a book from a member by calling the /DELETE method.
     * @function
     * @name handleDeallocate
     * @param {number} member_id - The ID of the member to deallocate the book from.
     * @returns {Promise<void>}
     * @async
     */
    const handleDeallocate = async (member_id) => {
        await fetch(`http://localhost:8000/allocations/${book.isbn}/${member_id}`, {
            method: "DELETE",
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
                        allocatedMembers.map((member) => (
                            <li key={member.id}>
                                {member.name} From: {member.from_date} - To: {member.to_date}
                                <button className="bg-red-500 text-white px-4 py-1" onClick={() => handleDeallocate(member.id)}>Deallocate</button>
                            </li>
                        ))
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