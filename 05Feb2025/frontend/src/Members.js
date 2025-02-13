import { useState, useEffect } from "react";

function Members() {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({id: -1, name: "" , allocated_books: []});

    useEffect(() => {
        fetch("http://localhost:8000/members")
        .then((res) => res.json())
        .then((data) => setMembers(data.members));
    }, []);

    const handleAddOrEditMember = async (e) => {
        const method = editMode ? "PUT" : "POST";
        const url = editMode ? `http://localhost:8000/members/${formData.id}` : "http://localhost:8000/members";
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({member_name: formData.name})
            });

            if (response.ok) {
                setShowModal(false);
                window.location.reload();
            } else {
                console.error("Failed to add or edit member:", response.statusText);
            }
            console.log(response);
        } catch (error) {
            console.error("Error occurred while adding or editing member:", error);
        }
        
    };

    const handleEdit = (member) => {
        setFormData(member);
        setEditMode(true);
        setShowModal(true);
      };

    return (
        <div>
        <h2 className="text-xl font-bold mb-4">Members</h2>
        <button className="bg-green-500 text-white px-4 py-2 mb-4" onClick={() => { setEditMode(false); setShowModal(true); }}>Add Member</button>
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
                <td className="p-2">{member.name}</td>
                <td className="p-2">{member.allocated_books.length}</td>
                <td className="p-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 mr-2" onClick={() => handleEdit(member)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1">Remove</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">{editMode ? "Edit Member" : "Add Member"}</h2>
                <input className="border p-2 w-full mb-2" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <div className="flex justify-end">
                <button className="bg-gray-400 text-white px-4 py-2 mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddOrEditMember}>{editMode ? "Update" : "Add"}</button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export {Members};
