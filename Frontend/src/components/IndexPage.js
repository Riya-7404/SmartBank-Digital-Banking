import React from 'react';
import { Link } from 'react-router-dom';

function IndexPage() {
    return (
        <div className="landing-page overflow-hidden">
            {/* 1. Hero Section - Dynamic Gradient & Animation */}
            <section className="py-5 text-center" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)', 
                borderBottom: '1px solid #e9ecef' 
            }}>
                <div className="container py-5">
                    <span className="badge rounded-pill bg-primary-subtle text-primary mb-3 px-3 py-2 fw-bold shadow-sm">
                        ✨ DIGITAL BANKING REIMAGINED
                    </span>
                    <h1 className="display-2 fw-bold text-dark mb-4" style={{ letterSpacing: '-2px' }}>
                        The Future of <span className="text-primary">Banking</span> is Here.
                    </h1>
                    <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '750px', lineHeight: '1.8' }}>
                        Manage your accounts, transfer funds instantly, and access banking services from the comfort of your home. Secure, fast, and built for you.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/signup" className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg fw-bold transition-all">
                            Open Account 🚀
                        </Link>
                        <Link to="/features" className="btn btn-outline-dark btn-lg px-5 rounded-pill fw-bold hover-shadow">
                            Explore Features
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Stats Section - Clean & Minimal */}
            <section className="py-5 bg-white border-bottom">
                <div className="container py-3">
                    <div className="row text-center g-4">
                        <div className="col-md-4">
                            <h2 className="fw-bold text-primary display-5">50K+</h2>
                            <p className="text-secondary fw-semibold">Active Users Globally</p>
                        </div>
                        <div className="col-md-4 border-start border-end border-light">
                            <h2 className="fw-bold text-primary display-5">₹500Cr+</h2>
                            <p className="text-secondary fw-semibold">Monthly Transactions</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="fw-bold text-primary display-5">99.9%</h2>
                            <p className="text-secondary fw-semibold">Uptime Record</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Features Section - Glassmorphism Cards */}
            <section className="py-5" style={{ backgroundColor: '#f9fafb' }}>
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-6">Our Premium Services</h2>
                        <p className="text-muted">High-end solutions for your financial needs</p>
                    </div>
                    <div className="row g-4">
                        {[
                            { icon: "💸", title: "Instant Transfers", desc: "IMPS and NEFT support for transfers in under 10 seconds." },
                            { icon: "🛡️", title: "Military-Grade Security", desc: "Multi-layer encryption and 2FA to keep your funds safe." },
                            { icon: "📈", title: "Smart Insights", desc: "AI-powered tracking for your monthly spending habits." }
                        ].map((service, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center transition-up" style={{ borderRadius: '24px' }}>
                                    <div className="display-4 mb-3">{service.icon}</div>
                                    <h4 className="fw-bold mb-3">{service.title}</h4>
                                    <p className="text-muted mb-0">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Why Choose Us Section - Image & Benefits */}
            <section className="py-5 bg-white">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="position-relative">
                                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" 
                                     className="img-fluid rounded-5 shadow-2xl border" alt="Banking app" 
                                     style={{ transform: 'rotate(-2deg)' }} />
                                <div className="position-absolute bottom-0 start-0 bg-primary text-white p-3 rounded-4 m-3 shadow-lg d-none d-md-block">
                                    <span className="fw-bold">ISO 27001 Certified ✅</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 ps-lg-5">
                            <h2 className="fw-bold display-6 mb-4">Banking made for the <br/><span className="text-primary">Modern Student</span></h2>
                            <div className="space-y-4">
                                {[
                                    "No hidden charges or monthly fees",
                                    "Instant loan approvals for academic needs",
                                    "24/7 Priority support via WhatsApp",
                                    "High-interest savings for young savers"
                                ].map((item, i) => (
                                    <div key={i} className="d-flex align-items-center mb-3">
                                        <div className="bg-success-subtle p-2 rounded-circle me-3">
                                            <span className="text-success fw-bold">✓</span>
                                        </div>
                                        <span className="fw-medium text-dark">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/signup" className="btn btn-primary btn-lg px-5 py-3 mt-4 rounded-pill shadow fw-bold">
                                Get Started Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default IndexPage;