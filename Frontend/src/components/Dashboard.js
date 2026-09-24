import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Amount kisi bhi format mein ho (500, "500", "₹1,500", "- ₹499") to number bana do
const getAmount = (t) => {
    const raw = t.amount ?? t.amt ?? t.price ?? t.value ?? 0;
    if (typeof raw === 'number') return Math.abs(raw);
    const n = parseFloat(String(raw).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
};

// credit hai ya debit
const isCredit = (t) => String(t.type || '').toLowerCase() === 'credit';

function Dashboard({ user, balance, setBalance, transactions, addTransactionEntry }) {
    const navigate = useNavigate();
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [showPayBills, setShowPayBills] = useState(false);
    const [activeService, setActiveService] = useState(null);
    const [amountInput, setAmountInput] = useState("");

    // Dynamic User Name & Account Logic
    const displayName = user?.username || localStorage.getItem("userName") || "User";
    const maskedAcc = user?.accNo ? `XXXX XXXX ${user.accNo.slice(-4)}` : "6245 **** **** 8812";

    const handlePayBill = () => {
        const amt = Number(amountInput);
        if (!amt || amt <= 0) return alert("Please enter a valid amount");
        if (amt > balance) return alert("Insufficient Balance!");

        setBalance(prev => prev - amt);
        addTransactionEntry(`${activeService} Bill Payment`, amt, 'debit');
        alert(`${activeService} bill of ₹${amt} paid successfully!`);
        setAmountInput("");
        setActiveService(null);
    };

    const handleAddFunds = () => {
        const amt = Number(amountInput);
        if (!amt || amt <= 0) return alert("Please enter amount");

        setBalance(prev => prev + amt);
        addTransactionEntry("Funds Added to Wallet", amt, 'credit');
        alert(`₹${amt} added to your account!`);
        setAmountInput("");
        setShowAddFunds(false);
    };

    return (
        <div className="container py-5 animate__animated animate__fadeIn">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-0 text-dark">Welcome, {displayName}! 👋</h2>
                    <p className="text-muted small">
                        <span className="badge bg-light text-dark border me-2">Savings Account</span>
                        Branch: Indapur, Pune
                    </p>
                </div>
                <div className="d-none d-md-block text-end">
                    <p className="small text-muted mb-0">Last Login</p>
                    <p className="small fw-bold">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
            </div>

            <div className="row g-4">
                {/* Account Card */}
                <div className="col-md-5 col-lg-4">
                    <div className="card border-0 shadow-lg p-4 text-white h-100 position-relative overflow-hidden"
                         style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                            borderRadius: '30px',
                            minHeight: '220px'
                         }}>
                        <div className="position-absolute top-0 end-0 p-3 opacity-25" style={{ fontSize: '100px', transform: 'translate(30%, -30%)' }}>🏦</div>

                        <div className="d-flex justify-content-between align-items-start position-relative">
                            <div>
                                <p className="small mb-1 opacity-75 fw-semibold uppercase" style={{ letterSpacing: '1px' }}>Available Balance</p>
                                <h1 className="fw-bold mb-0">₹{Number(balance).toLocaleString('en-IN')}</h1>
                            </div>
                            {/* Visa badge: image ki jagah text, taaki kabhi toote nahi */}
                            <span
                                className="bg-white rounded px-2 py-1 fw-bold fst-italic"
                                style={{ color: '#1a1f71', fontSize: '18px', letterSpacing: '1px', lineHeight: 1 }}
                            >
                                VISA
                            </span>
                        </div>

                        <div className="mt-5 position-relative">
                            <p className="small mb-1 opacity-75">Account Number</p>
                            <h4 className="fw-semibold mb-0" style={{ letterSpacing: '3px' }}>
                                {maskedAcc}
                            </h4>
                        </div>

                        <div className="mt-4 d-flex justify-content-between align-items-end position-relative">
                            <div>
                                <p className="x-small mb-0 opacity-50 text-uppercase">Account Holder</p>
                                <p className="small fw-bold mb-0">{displayName}</p>
                            </div>
                            <div className="text-end">
                                <p className="x-small mb-0 opacity-50 text-uppercase">Status</p>
                                <span className="badge bg-success-subtle text-success border-0">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="col-md-7 col-lg-8">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '25px' }}>
                        <h5 className="fw-bold mb-4">Quick Actions</h5>
                        <div className="row g-3">
                            {[
                                { icon: '📸', label: 'Scan & Pay', path: '/scan', primary: true },
                                { icon: '💸', label: 'Send Money', path: '/transfer' },
                                { icon: '🧾', label: 'Pay Bills', action: () => {setShowPayBills(!showPayBills); setShowAddFunds(false);} },
                                { icon: '🏦', label: 'Add Funds', action: () => {setShowAddFunds(!showAddFunds); setShowPayBills(false);} }
                            ].map((btn, idx) => (
                                <div className="col-6 col-md-3" key={idx}>
                                    <button
                                        onClick={btn.action || (() => navigate(btn.path))}
                                        className={`btn ${btn.primary ? 'btn-primary shadow-sm border-0' : 'btn-light border'} w-100 py-3 rounded-4 fw-bold d-flex flex-column align-items-center transition-all`}
                                    >
                                        <span className="fs-3 mb-1">{btn.icon}</span>
                                        <span className="small">{btn.label}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bill Payment Section */}
            {showPayBills && (
                <div className="card border-0 shadow-sm p-4 mt-4 bg-white border-start border-primary border-5 animate__animated animate__fadeInUp" style={{ borderRadius: '15px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold text-primary mb-0">{activeService ? `${activeService.toUpperCase()} PAYMENT` : "SELECT BILLING SERVICE"}</h6>
                        {activeService && <button className="btn btn-sm btn-link text-decoration-none fw-bold" onClick={() => setActiveService(null)}>⬅️ Back</button>}
                    </div>

                    {!activeService ? (
                        <div className="row g-3 text-center">
                            {[{name:'Mobile',icon:'📱'},{name:'Electricity',icon:'💡'},{name:'DTH',icon:'📺'},{name:'Water',icon:'🚰'}].map((s,i) => (
                                <div className="col-3 col-md-2" key={i} onClick={() => s.name === 'Mobile' ? navigate('/recharge') : setActiveService(s.name)}>
                                    <div className="p-3 border rounded-4 bg-light-subtle cursor-pointer hover-shadow transition-all">
                                        <div className="fs-3 mb-1">{s.icon}</div>
                                        <div className="small fw-bold">{s.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="row g-3 align-items-end animate__animated animate__slideInRight">
                            <div className="col-md-5">
                                <label className="small fw-bold text-muted mb-1">CUSTOMER ID / NO</label>
                                <input type="text" className="form-control bg-light border-0 py-2" placeholder={`Enter ${activeService} ID`} />
                            </div>
                            <div className="col-md-4">
                                <label className="small fw-bold text-muted mb-1">AMOUNT (₹)</label>
                                <input type="number" className="form-control bg-light border-0 py-2" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} placeholder="0.00" />
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary w-100 py-2 fw-bold rounded-pill" onClick={handlePayBill}>Confirm & Pay</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Add Funds Section */}
            {showAddFunds && (
                <div className="card border-0 shadow-sm p-4 mt-4 bg-primary text-white animate__animated animate__fadeInUp" style={{ borderRadius: '15px' }}>
                    <h6 className="fw-bold mb-3 small">TOP UP YOUR SMARTBANK WALLET</h6>
                    <div className="d-flex gap-2">
                        <input type="number" className="form-control border-0 py-2" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} placeholder="Enter amount (₹)" />
                        <button className="btn btn-light fw-bold px-4 rounded-pill shadow" onClick={handleAddFunds}>Add Now</button>
                    </div>
                </div>
            )}

            {/* Recent Transactions Table */}
            <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Recent Transactions</h5>
                    <button className="btn btn-sm btn-outline-primary rounded-pill">View All</button>
                </div>
                <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '20px' }}>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4 py-3 border-0">Date</th>
                                    <th className="border-0">Description</th>
                                    <th className="border-0 text-center">Amount</th>
                                    <th className="pe-4 text-end border-0">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions && transactions.length > 0 ? transactions.slice(0, 5).map((t, i) => (
                                    <tr key={t.id ?? i}>
                                        <td className="ps-4 text-muted small">{t.date}</td>
                                        <td>
                                            <div className="fw-semibold">{t.remark}</div>
                                        </td>
                                        <td className={`text-center fw-bold ${isCredit(t) ? 'text-success' : 'text-danger'}`}>
                                            {isCredit(t) ? '+ ₹' : '- ₹'}{getAmount(t).toLocaleString('en-IN')}
                                        </td>
                                        <td className="pe-4 text-end">
                                            <span className={`badge rounded-pill ${t.status === 'Success' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-muted">No transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
                .hover-shadow:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.05); transform: translateY(-3px); }
                .transition-all { transition: all 0.3s ease; }
                .x-small { font-size: 11px; }
                .uppercase { text-transform: uppercase; }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </div>
    );
}

export default Dashboard;
