import { useState } from "react";
import { BookAllocation } from "./BookAllocation";
import { Modal } from "./helper";

const MemberList = ({ members, setSelectedItem, handleDelete, fetchData }) => {
    const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const openAllocateModal = (member) => {
        setSelectedMember(member);
        setIsAllocateModalOpen(true);
    };

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left">Phone</th>
                        <th className="text-left">Books Allocated</th>
                        <th className="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id} className="border-b">
                            <td className="py-2">
                                <button
                                    onClick={() => setSelectedItem(member)}
                                    className="text-blue-500 hover:underline"
                                >
                                    {member.name}
                                </button>
                            </td>
                            <td className="py-2">{member.email}</td>
                            <td className="py-2">{member.phone}</td>
                            <td className="py-2">{member.books_allocated}</td>
                            <td>
                                <button
                                    onClick={() => openAllocateModal(member)}
                                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Allocate
                                </button>
                                <button
                                    onClick={() => setSelectedItem(member)}
                                    className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isAllocateModalOpen && (
                <Modal onClose={()=>{
                    setIsAllocateModalOpen(false);
                }}>
                    <BookAllocation
                        member={selectedMember}
                        onClose={() => setIsAllocateModalOpen(false)}
                        fetchData={fetchData}
                    />
                </Modal>
            )}
        </div>
    );
};

export { MemberList };
