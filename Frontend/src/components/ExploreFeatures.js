import React from 'react';
import { Link } from 'react-router-dom';

function ExploreFeatures() {
    const features = [
        { title: "Instant Transfer", desc: "NEFT/IMPS transfers in seconds. No more waiting.", icon: "💸", color: "#e7f1ff" },
        { title: "Smart Analytics", desc: "AI-driven insights to track every penny automatically.", icon: "📊", color: "#fff4e5" },
        { title: "Ultra Secure", desc: "256-bit encryption and biometric login for peace of mind.", icon: "🛡️", color: "#e6fffa" },
        { title: "Zero Balance", desc: "No minimum balance requirements, specially for students.", icon: "💎", color: "#f3e8ff" },
        { title: "Virtual Cards", desc: "Generate instant virtual cards for safe online shopping.", icon: "💳", color: "#ffeaf2" },
        { title: "24/7 Support", icon: "🤝", desc: "Dedicated team available via chat and call anytime.", color: "#f0f0f0" }
    ];

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">Why Choose <span className="text-primary">SmartBank?</span></h1>
                <p className="text-muted fs-5">Everything you need for a faster, smarter financial life.</p>
            </div>

            {/* Features Grid */}
            <div className="row g-4 mb-5">
                {features.map((f, i) => (
                    <div className="col-md-4" key={i}>
                        <div className="card h-100 border-0 shadow-sm p-4 text-center" style={{ borderRadius: '20px' }}>
                            <div className="fs-1 mb-2 mx-auto" style={{ backgroundColor: f.color, borderRadius: '50%', width: '70px', height: '70px', lineHeight: '70px' }}>{f.icon}</div>
                            <h5 className="fw-bold mt-3">{f.title}</h5>
                            <p className="text-muted small">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed FAQ Section */}
            <div className="mt-5 pt-5 border-top">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Frequently Asked Questions</h2>
                    <p className="text-muted">Find answers to common questions about our services and security.</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden border" id="faqAccordion">
                            
                            {/* Category 1: Account Opening */}
                            <div className="bg-light p-2 fw-bold text-primary small ps-3">ACCOUNT & ONBOARDING</div>
                            
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button fw-bold" data-bs-toggle="collapse" data-bs-target="#q1">
                                        Who can open a SmartBank account?
                                    </button>
                                </h2>
                                <div id="q1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Any Indian resident aged 18 or above with a valid Aadhaar and PAN card can open an account. For students under 18, we offer a 'Junior Smart' account which requires guardian consent. The entire process is 100% digital and takes less than 5 minutes.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#q2">
                                        Is there a minimum balance requirement?
                                    </button>
                                </h2>
                                <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        No! SmartBank believes in financial freedom. We offer <strong>Zero Balance Savings Accounts</strong> especially for students and young professionals. There are no monthly maintenance fees or hidden charges for low balance.
                                    </div>
                                </div>
                            </div>

                            {/* Category 2: Security */}
                            <div className="bg-light p-2 fw-bold text-primary small ps-3">SECURITY & PRIVACY</div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#q3">
                                        How safe is my money with SmartBank?
                                    </button>
                                </h2>
                                <div id="q3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Your security is our top priority. We use <strong>AES 256-bit encryption</strong> to protect your data. Furthermore, all accounts are insured up to ₹5,00,000 by the DICGC (a subsidiary of RBI), just like any traditional bank. We also provide two-factor authentication (2FA) for every transaction.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#q4">
                                        What happens if I forget my PIN or lose my phone?
                                    </button>
                                </h2>
                                <div id="q4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        If you lose your phone, you can instantly block your account by logging into our web portal or calling our emergency helpline. To reset your PIN, you'll need to verify your identity through Aadhaar-based OTP and biometric verification (if supported).
                                    </div>
                                </div>
                            </div>

                            {/* Category 3: Transactions */}
                            <div className="bg-light p-2 fw-bold text-primary small ps-3">PAYMENTS & LIMITS</div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#q5">
                                        What are the daily transaction limits?
                                    </button>
                                </h2>
                                <div id="q5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        By default, UPI transactions are limited to ₹1,00,000 per day. For IMPS/NEFT, you can transfer up to ₹5,00,000 per day. These limits can be increased or decreased through your 'Security Settings' in the dashboard to prevent unauthorized usage.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#q6">
                                        Are there any charges for IMPS or NEFT?
                                    </button>
                                </h2>
                                <div id="q6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Absolutely not! All NEFT, RTGS, and IMPS transactions made through the SmartBank app are <strong>100% free of charge</strong>. We want to make digital payments accessible to everyone.
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-5 p-5 bg-primary rounded-5 text-center text-white shadow-lg">
                <h2 className="fw-bold">Ready to Experience the Future?</h2>
                <p className="mb-4 opacity-75">Join thousands of students managing their finances smarter.</p>
                <Link to="/signup" className="btn btn-light btn-lg px-5 rounded-pill fw-bold text-primary">Get Your Free Account 🚀</Link>
            </div>
        </div>
    );
}

export default ExploreFeatures;