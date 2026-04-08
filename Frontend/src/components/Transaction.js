import React, { useState } from 'react';
import axios from 'axios';

function Transaction({ onTransferSuccess }) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            // Spring Boot API call
            const response = await axios.post(
                `http://localhost:8080/api/bank/transfer?from=${from}&to=${to}&amount=${amount}`
            );
            
            setMessage(response.data); // "Success! ₹500 transferred..."
            
            // Transfer successful hone par list refresh karne ke liye
            if (onTransferSuccess) onTransferSuccess();
            
            // Form clear karein
            setFrom(""); setTo(""); setAmount("");
        } catch (error) {
            setMessage(error.response ? error.response.data : "Transfer Failed!");
        }
    };

    return (
        <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: '15px' }}>
            <h4 className="text-primary mb-3">💸 Transfer Money</h4>
            <form onSubmit={handleTransfer}>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <input type="text" className="form-control" placeholder="From Account" 
                               value={from} onChange={(e) => setFrom(e.target.value)} required />
                    </div>
                    <div className="col-md-4 mb-2">
                        <input type="text" className="form-control" placeholder="To Account" 
                               value={to} onChange={(e) => setTo(e.target.value)} required />
                    </div>
                    <div className="col-md-4 mb-2">
                        <input type="number" className="form-control" placeholder="Amount" 
                               value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100 mt-2">Send Money</button>
            </form>
            {message && <div className={`mt-3 alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                {message}
            </div>}
        </div>
    );
}

export default Transaction;