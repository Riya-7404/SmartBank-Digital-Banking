import React, { useState } from 'react';

function Loan() {
    const [amount, setAmount] = useState("");
    const [years, setYears] = useState(1);
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");

    // Simple Interest Logic: 10% Interest Rate
    const interest = (amount * 10 * years) / 100;
    const totalRepay = Number(amount) + interest;

    const handleApply = (e) => {
        e.preventDefault();
        // Backend API abhi nahi hai, toh hum "Pending" status dikhayenge
        setStatus("Your application for ₹" + amount + " is under review. Please wait 24-48 hours.");
        setAmount(""); setReason("");
    };

    return (
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '15px', backgroundColor: '#fff' }}>
            <h4 className="fw-bold text-dark mb-3">🏦 Apply for a Loan</h4>
            <p className="text-muted small">Instant approval at 10% annual interest rate.</p>
            
            <form onSubmit={handleApply}>
                <div className="mb-3">
                    <label className="form-label small fw-bold">Loan Amount (₹)</label>
                    <input type="number" className="form-control" placeholder="e.g. 50000" 
                           value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                
                <div className="mb-3">
                    <label className="form-label small fw-bold">Tenure (Years)</label>
                    <select className="form-select" value={years} onChange={(e) => setYears(e.target.value)}>
                        <option value="1">1 Year</option>
                        <option value="3">3 Years</option>
                        <option value="5">5 Years</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label small fw-bold">Reason for Loan</label>
                    <textarea className="form-control" rows="2" placeholder="Education, Business, etc."
                              value={reason} onChange={(e) => setReason(e.target.value)} required></textarea>
                </div>

                {amount > 0 && (
                    <div className="alert alert-light border mb-3">
                        <small className="d-block text-muted">Total Repayment Amount:</small>
                        <strong className="text-primary fs-5">₹{totalRepay.toLocaleString()}</strong>
                    </div>
                )}

                <button type="submit" className="btn btn-dark w-100 fw-bold">Submit Application</button>
            </form>

            {status && <div className="mt-3 alert alert-warning small">{status}</div>}
        </div>
    );
}

export default Loan;