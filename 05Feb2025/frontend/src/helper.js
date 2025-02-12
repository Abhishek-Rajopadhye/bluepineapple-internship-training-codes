const API_URL = 'http://localhost:8000';

// Utility function for API calls
const fetchAPI = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
};

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                {children}
                <button
                    onClick={onClose}
                    className="w-full mt-4 bg-gray-500 text-white p-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export { Modal, fetchAPI };