import { useState, useEffect } from 'react';
import { BookList } from "./BookList"
import { MemberList } from './MemberList';
import { BookDetails } from './BookDetails';
import { MemberDetails } from './MemberDetails';
import { BookForm } from './BookForm';
import { MemberForm } from './MemberForm';
import { fetchAPI } from './helper';
import { BookAllocation } from './BookAllocation';

const App = () => {
    const [activeTab, setActiveTab] = useState('books');
    const [selectedItem, setSelectedItem] = useState(null);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAllocating, setIsAllocating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const booksData = await fetchAPI('/books');
        const membersData = await fetchAPI('/members');
        setBooks(booksData);
        setMembers(membersData.members);
    };

    const handleAdd = async (data) => {
        const endpoint = activeTab === 'books' ? '/books' : '/members';
        await fetchAPI(endpoint, { method: 'POST', body: JSON.stringify(data) });
        fetchData();
        setShowForm(false);
    };

    const handleUpdate = async (data) => {
        const endpoint = activeTab === 'books' ? `/books/${data.isbn}` : `/members/${data.id}`;
        await fetchAPI(endpoint, { method: 'PUT', body: JSON.stringify(data) });
        fetchData();
        setIsEditing(false);
        setSelectedItem(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const endpoint = activeTab === 'books' ? `/books/${id}` : `/members/${id}`;
            await fetchAPI(endpoint, { method: 'DELETE' });
            fetchData();
            setSelectedItem(null);
        }
    };

    const handleDeallocateBook = async (bookIsbn, memberId) => {
        await fetchAPI(`/deallocateBook/${bookIsbn}&${memberId}`, { method: 'PUT' });
        fetchData();
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex space-x-4 mb-4">
                <button onClick={() => { setActiveTab('books'); setSelectedItem(null); }}
                    className={`px-4 py-2 rounded ${activeTab === 'books' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Books</button>
                <button onClick={() => { setActiveTab('members'); setSelectedItem(null); }}
                    className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Members</button>
            </div>
            <button onClick={() => setShowForm(true)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                Add {activeTab === 'books' ? 'Book' : 'Member'}
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        {activeTab === 'books' ? (
                            <BookForm onSubmit={handleAdd} />
                        ) : (
                            <MemberForm onSubmit={handleAdd} />
                        )}
                        <button onClick={() => setShowForm(false)} className="w-full mt-4 bg-gray-500 text-white p-2 rounded">Cancel</button>
                    </div>
                </div>
            )}

            {selectedItem ? (
                <div>
                    <button onClick={() => setSelectedItem(null)} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                    {activeTab === 'books' ? (
                        <BookDetails book={selectedItem} members={members} fetchData={fetchData} handleDeallocateBook={handleDeallocateBook} />
                    ) : (
                        <MemberDetails member={selectedItem} fetchData={fetchData} handleDeallocateBook={handleDeallocateBook} />
                    )}
                </div>
            ) : (
                activeTab === 'books' ? (
                    <BookList books={books} setSelectedItem={setSelectedItem} setIsEditing={setIsEditing} handleDelete={handleDelete} setIsAllocateModalOpen={setIsAllocating}/>
                ) : (
                    <MemberList members={members} setSelectedItem={setSelectedItem} setIsEditing={setIsEditing} setIsAllocating={setIsAllocating} handleDelete={handleDelete} />
                )
            )}

            {isEditing && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        {activeTab === 'books' ? (
                            <BookForm book={selectedItem} onSubmit={handleUpdate} />
                        ) : (
                            <MemberForm member={selectedItem} onSubmit={handleUpdate} />
                        )}
                        <button onClick={() => { setIsEditing(false); setSelectedItem(null); }} className="w-full mt-4 bg-gray-500 text-white p-2 rounded">Cancel</button>
                    </div>
                </div>
            )}

            {isAllocating && (
                <BookAllocation book={selectedItem}
                onClose={() => setIsAllocating(false)}
                fetchData={fetchData}/>
            )}
        </div>
    );
};

export default App;
