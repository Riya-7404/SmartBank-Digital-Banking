import React, { useState } from 'react';

function MoneyTransfer() {
    const [recipient, setRecipient] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [amount, setAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTransfer = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulation for transfer
        setTimeout(() => {
            alert(`₹${amount} successfully transferred to ${recipient}!`);
            setIsProcessing(false);
            setRecipient("");
            setAccountNo("");
            setAmount("");
        }, 2000);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 shadow-lg p-4" style={{ borderRadius: '25px' }}>
                        <div className="text-center mb-4">
                            <div className="display-6 mb-2">💸</div>
                            <h3 className="fw-bold">Transfer Money</h3>
                            <p className="text-muted small">Send funds instantly via IMPS/NEFT</p>
                        </div>

                        <form onSubmit={handleTransfer}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">RECIPIENT NAME</label>
                                <input 
                                    type="text" 
                                    className="form-control bg-light border-0 py-2" 
                                    placeholder="Enter full name" 
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">ACCOUNT NUMBER / UPI ID</label>
                                <input 
                                    type="text" 
                                    className="form-control bg-light border-0 py-2" 
                                    placeholder="e.g. 987654321012 or riya@okaxis" 
                                    value={accountNo}
                                    onChange={(e) => setAccountNo(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary">AMOUNT (₹)</label>
                                <div className="input-group bg-light rounded-3 overflow-hidden">
                                    <span className="input-group-text border-0 bg-light fw-bold text-primary">₹</span>
                                    <input 
                                        type="number" 
                                        className="form-control bg-light border-0 py-2" 
                                        placeholder="0.00" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required 
                                    />
                                </div>
                                <p className="text-end text-muted x-small mt-1" style={{ fontSize: '11px' }}>
                                    Daily Limit: ₹1,00,000
                                </p>
                            </div>

                            <button 
                                type="submit" 
                                className={`btn btn-primary w-100 py-3 rounded-pill fw-bold shadow ${isProcessing ? 'disabled' : ''}`}
                            >
                                {isProcessing ? (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                ) : "Confirm Transfer 🚀"}
                            </button>
                        </form>
                    </div>

                    {/* Security Tip */}
                    <div className="mt-4 p-3 bg-info-subtle rounded-4 d-flex align-items-center">
                        <span className="me-2">🛡️</span>
                        <p className="small mb-0 text-info-emphasis">
                            <strong>Security Tip:</strong> Always double-check the account number before confirming.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoneyTransfer;