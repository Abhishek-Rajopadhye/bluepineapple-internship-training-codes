/**
 * Members component that displays a list of members, allows adding and editing members,
 * and shows details of a selected member.
 * @module
 * @name Members
 * @requires react
 * @requires Member
 */

import { useState, useEffect } from "react";
import { Member } from "./Member";

/**
 * Members component that displays a list of members, allows adding and editing members,
 * and shows details of a selected member.
 *
 * @component
 * @name Members
 *
 * @property {Array} members - The list of members fetched from the server.
 * @property {Function} setMembers - Function to update the members state.
 * @property {boolean} showDetails - State to control the visibility of member details.
 * @property {Function} setShowDetails - Function to update the showDetails state.
 * @property {Object|null} selectedMember - The currently selected member for viewing details.
 * @property {Function} setSelectedMember - Function to update the selectedMember state.
 * @property {boolean} showModal - State to control the visibility of the modal for adding/editing members.
 * @property {Function} setShowModal - Function to update the showModal state.
 * @property {boolean} editMode - State to indicate whether the modal is in edit mode or add mode.
 * @property {Function} setEditMode - Function to update the editMode state.
 * @property {Object} formData - The form data for adding/editing a member.
 * @property {Function} setFormData - Function to update the formData state.
 * @property {Array} allocations - The list of allocations fetched from the server.
 * @property {Function} setAllocations - Function to update the allocations state.
 * 
 * @returns {JSX.Element} The rendered component.
 */
function Members() {
    const [members, setMembers] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: -1, name: "" });
    const [allocations, setAllocations] = useState([]);

    useEffect(() => {

        /**
         * Fetches members and allocations data from the server.
         * @function
         * @name fetchData
         * @returns {Promise<void>}
         * @async
         */
        async function fetchData() {
            await fetch("http://localhost:8000/members")
                .then((res) => res.json())
                .then((data) => setMembers(data.members));
            await fetch("http://localhost:8000/allocations")
                .then((res) => res.json())
                .then((data) => setAllocations(data));
        }
        fetchData();
    }, []);

    /**
     * Handles adding or editing a member.
     * @function
     * @name handleAddOrEditMember
     * @param {Object} e - The event object.
     * @returns {Promise<void>}
     * @async
     */
    const handleAddOrEditMember = async (e) => {
        const method = editMode ? "PUT" : "POST";
        const url = editMode ? `http://localhost:8000/members/${formData.id}` : "http://localhost:8000/members";
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ member_name: formData.name })
            });

            if (response.ok) {
                setShowModal(false);
                window.location.reload();
            } else {
                console.error("Failed to add or edit member:", response.statusText);
            }
        } catch (error) {
            console.error("Error occurred while adding or editing member:", error);
        }
    };

    /**
     * Shows the details of a member.
     * @function
     * @name handleShowDetails
     * @param {Object} member - The member object to show details for.
     * @returns {void}
     */
    const handleShowDetails = (member) => {
        setSelectedMember(member);
        setShowDetails(true);
    };

    /**
     * Handles editing a member.
     * @function
     * @name handleEdit
     * @param {Object} member - The member object to edit.
     * @returns {void}
     */
    const handleEdit = (member) => {
        setFormData(member);
        setEditMode(true);
        setShowModal(true);
    };

    /**
     * Gets the count of allocated books for a member.
     * @function
     * @name getAllocatedBooksCount
     * @param {number} memberId - The ID of the member.
     * @returns {number} The count of allocated books for the member.
     */
    const getAllocatedBooksCount = (memberId) => {
        return allocations.filter((allocation) => allocation.user_id === memberId).length;
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Members</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Allocated Books</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id} className="border">
                            <td className="p-2 text-blue-500 cursor-pointer" onClick={() => handleShowDetails(member)}>{member.name}</td>
                            <td className="p-2">{getAllocatedBooksCount(member.id)}</td>
                            <td className="p-2">
                                <button className="bg-yellow-500 text-white px-2 py-1 mr-2" onClick={() => handleEdit(member)}>Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="bg-green-500 text-white px-4 py-2 mb-4" onClick={() => { setEditMode(false); setShowModal(true); }}>Add Member</button>
            {showDetails && selectedMember && <Member member={selectedMember} onClose={() => {
                setSelectedMember(null);
                setShowDetails(false);
            }} />}
            {showModal && (
                <div className="fixed border inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white border p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">{editMode ? "Edit Member" : "Add Member"}</h2>
                        <input className="border p-2 w-full mb-2" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <div className="flex justify-end">
                            <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddOrEditMember}>{editMode ? "Update" : "Add"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { Members };
