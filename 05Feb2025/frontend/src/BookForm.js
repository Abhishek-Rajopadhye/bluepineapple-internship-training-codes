import { useState } from 'react';
import { Modal } from './helper';

const BookForm = ({ book, onSubmit, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
        book || { isbn: '', name: '', author: '', total_copies: 0, allocated_copies: 0 }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'total_copies' ? parseInt(value) : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} className="w-full p-2 border rounded" disabled={!!book} />
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="number" name="total_copies" placeholder="Total Copies" value={formData.total_copies} onChange={handleChange} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{book ? 'Update' : 'Add'} Book</button>
            </form>
        </Modal>
    );
};

export { BookForm }