import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function MobileRecharge({ balance, setBalance, addTransactionEntry }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [mobileNumber, setMobileNumber] = useState("");
    
    // 🟢 FIX 1: Filter ko "All" set kiya taaki default mein plans dikhein
    const [filter, setFilter] = useState('All'); 

    const [showPinModal, setShowPinModal] = useState(false);
    const [enteredPin, setEnteredPin] = useState("");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const USER_PIN = "1234"; 

    const operators = [
        { id: 1, name: 'Jio', short: 'J', grad: 'linear-gradient(135deg, #0056b3 0%, #002d5e 100%)' },
        { id: 2, name: 'Airtel', short: 'A', grad: 'linear-gradient(135deg, #e40000 0%, #a00000 100%)' },
        { id: 3, name: 'Vi', short: 'V', grad: 'linear-gradient(135deg, #ffb300 0%, #ff8c00 100%)' },
        { id: 4, name: 'BSNL', short: 'B', grad: 'linear-gradient(135deg, #0055aa 0%, #003366 100%)' }
    ];

    const allPlans = useMemo(() => {
        const categories = ["Unlimited", "Data", "Annual", "Talktime"];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            price: 10 + ((i + 1) * 25),
            category: categories[i % categories.length],
            details: "Unlimited Calls + High Speed Data Pack",
            validity: i > 40 ? "365 Days" : "28 Days",
            tag: i % 10 === 0 ? "Best Seller" : ""
        }));
    }, []);

    // 🟢 FIX 2: Filter logic ko improve kiya
    const filteredPlans = filter === "All" || filter === "" 
        ? allPlans 
        : allPlans.filter(p => p.category === filter);

    const initiateRecharge = (plan) => {
        if (plan.price > balance) return alert("Insufficient Balance!");
        setSelectedPlan(plan);
        setShowPinModal(true);
    };

    const handleVerifyAndPay = () => {
        if (enteredPin === USER_PIN) {
            setBalance(prev => prev - selectedPlan.price);
            addTransactionEntry(`${selectedOperator.name} Recharge`, selectedPlan.price, 'debit');
            alert("Success! 🚀");
            setShowPinModal(false);
            navigate('/dashboard');
        } else {
            alert("Incorrect PIN!");
            setEnteredPin("");
        }
    };

    return (
        <div className="recharge-wrapper py-5 px-3">
            <div className="container">
                <div className="card border-0 shadow-lg main-recharge-card mx-auto overflow-hidden">
                    
                    <div className="p-4 text-white header-gradient d-flex align-items-center">
                        {step > 1 && <button className="btn text-white me-3 fs-4" onClick={() => setStep(step - 1)}>←</button>}
                        <h4 className="fw-bold mb-0">Mobile Recharge</h4>
                        <div className="ms-auto"><span className="badge bg-white text-primary px-3 py-2 rounded-pill shadow-sm">Balance: ₹{balance}</span></div>
                    </div>

                    <div className="p-4 p-md-5 bg-white" style={{ minHeight: '500px' }}>
                        {step === 1 && (
                            <div className="animate__animated animate__fadeIn">
                                <h5 className="fw-bold text-center mb-5 text-muted">Select Provider</h5>
                                <div className="row g-4 justify-content-center">
                                    {operators.map(op => (
                                        <div className="col-6 col-md-3" key={op.id} onClick={() => { setSelectedOperator(op); setStep(2); }}>
                                            <div className="premium-op-card p-4 text-center cursor-pointer h-100 shadow-sm" style={{ background: op.grad }}>
                                                <div className="op-initial-logo">{op.short}</div>
                                                <div className="text-white fw-bold mt-3 fs-5">{op.name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="text-center animate__animated animate__fadeIn">
                                <div className="mb-4 d-inline-block p-4 rounded-circle shadow-sm" style={{ background: selectedOperator.grad, color: '#fff', fontSize: '40px', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                    {selectedOperator.short}
                                </div>
                                <h3 className="fw-bold mb-4">Recharge {selectedOperator.name}</h3>
                                <div style={{maxWidth: '400px', margin: '0 auto'}}>
                                    <input type="text" className="form-control form-control-lg text-center mb-4 rounded-4 shadow-sm fs-2 py-3" placeholder="98XXXXXXXX" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g,''))} maxLength="10" />
                                    <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-lg" disabled={mobileNumber.length !== 10} onClick={() => setStep(3)}>Proceed to Plans 🚀</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate__animated animate__fadeIn">
                                <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-4">
                                    <div className="fw-bold fs-5">📱 +91 {mobileNumber} | {selectedOperator.name}</div>
                                    <button className="btn btn-sm btn-link" onClick={() => setStep(2)}>Edit</button>
                                </div>
                                
                                {/* 🟢 Category Filters (Taaki user change kar sake) */}
                                <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
                                    {["All", "Unlimited", "Data", "Annual", "Talktime"].map(cat => (
                                        <button key={cat} onClick={() => setFilter(cat)} className={`btn rounded-pill px-3 ${filter === cat ? 'btn-primary' : 'btn-outline-primary'}`}>{cat}</button>
                                    ))}
                                </div>

                                <div className="row g-3 plan-scroll" style={{maxHeight: '450px', overflowY: 'auto'}}>
                                    {filteredPlans.map(plan => (
                                        <div className="col-md-6" key={plan.id} onClick={() => initiateRecharge(plan)}>
                                            <div className="plan-card p-4 border rounded-4 bg-white shadow-sm cursor-pointer border-start border-4 border-primary position-relative">
                                                <h2 className="fw-bold">₹{plan.price}</h2>
                                                <p className="small text-secondary mb-0">{plan.details}</p>
                                                <div className="mt-2 small fw-bold text-primary">{plan.validity}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal remains the same... */}
            {showPinModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center">
                    <div className="modal-content p-5 bg-white shadow-lg text-center" style={{maxWidth: '380px', borderRadius: '40px'}}>
                        <h4 className="fw-bold mb-4">Enter PIN</h4>
                        <input type="password" className="form-control form-control-lg text-center mb-4 rounded-4" style={{letterSpacing: '15px', fontSize: '28px'}} maxLength="4" value={enteredPin} onChange={(e) => setEnteredPin(e.target.value)} placeholder="****" autoFocus />
                        <button className="btn btn-primary py-3 w-100 rounded-pill shadow" onClick={handleVerifyAndPay}>Confirm Pay</button>
                        <button className="btn btn-link mt-2 text-muted text-decoration-none" onClick={() => setShowPinModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <style>{`
                .recharge-wrapper { background: #f0f2f5; min-height: 100vh; }
                .main-recharge-card { border-radius: 40px; max-width: 900px; width: 100%; }
                .header-gradient { background: #0062ff; }
                .premium-op-card { border-radius: 25px; transition: 0.3s; }
                .op-initial-logo { background: white; width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 24px; font-weight: 800; color: #333; }
                .plan-card:hover { transform: translateY(-5px); border-color: #0062ff !important; }
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 2000; backdrop-filter: blur(5px); }
                .plan-scroll::-webkit-scrollbar { width: 5px; }
                .plan-scroll::-webkit-scrollbar-thumb { background: #0062ff; border-radius: 10px; }
            `}</style>
        </div>
    );
}

export default MobileRecharge;