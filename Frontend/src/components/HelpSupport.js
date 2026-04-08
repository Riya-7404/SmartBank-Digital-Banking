import React, { useState } from 'react';

function HelpSupport() {
    const userName = localStorage.getItem("userName") || "User";
    const [showChat, setShowChat] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    // Detailed Real-World Data
    const supportCategories = [
        { 
            id: 'trans', icon: "💳", title: "Transactions", 
            info: "Manage and track your financial footprint. View real-time status of pending settlements and cleared funds.",
            details: [
                "View last 30 days detailed statement with merchant names.",
                "Dispute a transaction: If you don't recognize a charge, raise a ticket immediately.",
                "Refund Status: Track automated refunds for failed UPI or Card payments.",
                "Filter by category (Food, Travel, Bills) to manage your budget."
            ],
            action: "View Mini Statement"
        },
        { 
            id: 'rech', icon: "📱", title: "Recharge & Bills", 
            info: "Instant utility payments and mobile top-ups with secure encryption.",
            details: [
                "Prepaid/Postpaid: Support for Jio, Airtel, Vi, and BSNL with latest plan discovery.",
                "FASTag Recharge: Link your vehicle and pay toll instantly.",
                "DTH & Electricity: Set up 'Auto-Pay' for monthly utility bills to avoid late fees.",
                "History: Access receipts for all past successful recharges."
            ],
            action: "Explore Plans"
        },
        { 
            id: 'sec', icon: "🔐", title: "Security Center", 
            info: "Your account safety is our priority. Configure multi-factor authentication and device locks.",
            details: [
                "Biometric Login: Enable Fingerprint or FaceID for faster, secure access.",
                "Card Management: Set daily transaction limits or 'Freeze' your card if lost.",
                "Change MPIN: Update your 6-digit secure PIN every 90 days for safety.",
                "Active Sessions: See which devices are currently logged into your SmartBank account."
            ],
            action: "Run Security Scan"
        },
        { 
            id: 'rep', icon: "📄", title: "Reports & Analytics", 
            info: "Get deep insights into your spending habits with AI-powered financial reports.",
            details: [
                "Annual Tax Statement: Download Form 26AS and interest certificates for ITR.",
                "Spending Trends: Monthly graph showing where your money goes.",
                "Credit Score: Check your latest CIBIL score for loan eligibility.",
                "Custom Exports: Download data in PDF, CSV, or Excel formats."
            ],
            action: "Download Annual Report"
        }
    ];

    return (
        <div className="support-wrapper py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-6">How can we help you, {userName}?</h2>
                    <p className="text-muted">Select a category below to manage your banking services.</p>
                    
                    <div className="search-bar mx-auto mt-4 shadow-sm">
                        <input type="text" className="form-control border-0 rounded-pill py-3 px-4" placeholder="Search for transactions, security, or bill payments..." />
                    </div>
                </div>

                {/* 4 Cards */}
                <div className="row g-4 mb-5">
                    {supportCategories.map((cat) => (
                        <div className="col-md-3" key={cat.id} onClick={() => setActiveTab(cat)}>
                            <div className={`card h-100 border-0 shadow-sm p-4 category-card rounded-4 ${activeTab?.id === cat.id ? 'active-card' : ''}`}>
                                <div className="icon-box mb-3">{cat.icon}</div>
                                <h5 className="fw-bold mb-2">{cat.title}</h5>
                                <p className="small text-muted mb-0">{cat.info}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- DYNAMIC DETAILED CONTENT --- */}
                <div className="content-container shadow-lg rounded-4 overflow-hidden border-0 bg-white animate__animated animate__fadeIn">
                    {activeTab ? (
                        <div className="row g-0">
                            <div className="col-md-4 bg-primary text-white p-5 d-flex flex-column justify-content-center">
                                <span className="display-4 mb-3">{activeTab.icon}</span>
                                <h3 className="fw-bold">{activeTab.title} Support</h3>
                                <p className="opacity-75">Quickly resolve issues related to {activeTab.title.toLowerCase()} and access related documents.</p>
                                <button className="btn btn-light text-primary fw-bold rounded-pill mt-3">{activeTab.action}</button>
                            </div>
                            <div className="col-md-8 p-5">
                                <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">Frequently Asked & Services</h4>
                                <ul className="list-unstyled">
                                    {activeTab.details.map((item, index) => (
                                        <li key={index} className="d-flex align-items-start mb-3">
                                            <span className="text-primary me-3 mt-1">●</span>
                                            <span className="text-secondary fs-5">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 d-flex gap-3">
                                    <button className="btn btn-outline-primary rounded-pill px-4">Contact Agent</button>
                                    <button className="btn btn-link text-decoration-none text-muted">View FAQ Documentation</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Default Dashboard View (Jab kuch click na ho) */
                        <div className="p-5 text-center">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-start">
                                    <h3 className="fw-bold text-primary">SmartBank Support Dashboard</h3>
                                    <p className="fs-5 text-muted">Aapne abhi tak koi category select nahi ki hai. Aap apne transactions track kar sakte hain, security settings badal sakte hain ya reports download kar sakte hain.</p>
                                    <div className="d-flex gap-2 mt-4">
                                        <div className="badge bg-light text-dark p-2 px-3 border">24/7 Monitoring</div>
                                        <div className="badge bg-light text-dark p-2 px-3 border">Secure SSL</div>
                                        <div className="badge bg-light text-dark p-2 px-3 border">AI Powered</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <img src="https://img.freepik.com/free-vector/customer-support-flat-design-illustration_23-2148889374.jpg" alt="Support" className="img-fluid rounded-4" style={{maxHeight: '250px'}} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Floating Chatbot Bubble */}
                <div className={`ai-chat-bubble shadow-lg ${showChat ? 'd-none' : 'd-flex'}`} onClick={() => setShowChat(true)}>🤖</div>
            </div>

            <style>{`
                .support-wrapper { background: #f3f6f9; min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                .search-bar { max-width: 700px; }
                .search-bar input { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .category-card { cursor: pointer; transition: all 0.3s ease; border: 1px solid transparent !important; }
                .category-card:hover { transform: translateY(-10px); background: #ffffff; border-color: #0d6efd !important; }
                .active-card { background: #ffffff; border: 2px solid #0d6efd !important; box-shadow: 0 10px 20px rgba(13, 110, 253, 0.1) !important; }
                .icon-box { width: 60px; height: 60px; background: #e7f0ff; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 30px; }
                .ai-chat-bubble { position: fixed; bottom: 30px; right: 30px; width: 65px; height: 65px; background: #0d6efd; border-radius: 50%; color: white; font-size: 30px; align-items: center; justify-content: center; cursor: pointer; z-index: 1000; transition: transform 0.2s; }
                .ai-chat-bubble:hover { transform: scale(1.1); }
                .content-container { min-height: 400px; border: 1px solid #e0e0e0; }
            `}</style>
        </div>
    );
}

export default HelpSupport;