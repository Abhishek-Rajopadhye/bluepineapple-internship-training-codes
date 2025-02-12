import { useState, useEffect } from "react";
import { fetchAPI, Modal } from "./helper";

const BookAllocation = ({ fetchData, book  }) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [members, setMembers] = useState([]);
    const [memberId, setMemberId] = useState("");

    async function getMembers(){
        const membersData = await fetchAPI('/members');
        return membersData.members;
    }

    useEffect(() => {
        async function fetchMembers() {
            const membersData = await getMembers();
            setMembers(membersData);
        }
        fetchMembers();
        console.log(members);
    }, [members]);

    const handleSubmit = async () => {
        if (!fromDate || !toDate) {
            alert("Both dates are required for allocation!");
            return;
        }

        await fetchAPI(`/allocateBook/${book.isbn}&${memberId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ from_date: fromDate, to_date: toDate }),
        });

        fetchData(); // Refresh data after allocation
    };

    return (
        <Modal>
            <div className="modal">
                <form className="modal-content">
                    <h2>Allocate Book</h2>
                    <label>Member:</label>
                    <select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                        <option value="">Select Member</option>
                        {
                            members.map((member) => {
                                return (`<option value=${member.id}>${member.name}</option>`);
                        }
                        )}
                    </select>
                    <br/>
                    <label>From Date:</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <br/>
                    <label>To Date:</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

                    <div className="modal-actions">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export { BookAllocation };
