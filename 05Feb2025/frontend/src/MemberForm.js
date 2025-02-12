
import { useState } from 'react';
import { Modal } from './helper';

const MemberForm = ({ member, onSubmit, isOpen, onClose }) => {
    const [formData, setFormData] = useState(member || { name: '', allocated_books: [] });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, name: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{member ? 'Update' : 'Add'} Member</button>
            </form>
        </Modal>
    );
};

export { MemberForm };
