import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-white border-top pt-5 pb-4 mt-5">
            <div className="container">
                <div className="row g-4">
                    
                    {/* 1. Brand & Description */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="fw-bold text-primary mb-3">SmartBank.</h4>
                        <p className="text-muted small">
                            SmartBank is a next-generation digital banking platform designed for students and young professionals in India. Experience seamless, paperless, and secure banking.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#!" className="text-primary fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#!" className="text-primary fs-5"><i className="bi bi-twitter-x"></i></a>
                            <a href="#!" className="text-primary fs-5"><i className="bi bi-instagram"></i></a>
                            <a href="#!" className="text-primary fs-5"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h6 className="fw-bold mb-3">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                            <li className="mb-2"><Link to="/features" className="text-decoration-none text-muted">Features</Link></li>
                            <li className="mb-2"><Link to="/login" className="text-decoration-none text-muted">Login</Link></li>
                            <li className="mb-2"><Link to="/signup" className="text-decoration-none text-muted">Open Account</Link></li>
                        </ul>
                    </div>

                    {/* 3. Support & Security */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold mb-3">Support</h6>
                        <ul className="list-unstyled small text-muted">
                            <li className="mb-2">📍 Pune Branch: Indapur Division</li>
                            <li className="mb-2">📞 Helpline: 1800-SMART-BANK</li>
                            <li className="mb-2">📧 Email: help@smartbank.com</li>
                            <li className="mb-2">🛡️ DICGC Insured up to ₹5 Lakh</li>
                        </ul>
                    </div>

                    {/* 4. Newsletter/Call to Action */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold mb-3">Secure Banking</h6>
                        <div className="p-3 bg-light rounded-3 border-start border-primary border-4">
                            <p className="x-small mb-1 text-dark fw-bold">🔒 256-bit SSL Encrypted</p>
                            <p className="text-muted" style={{ fontSize: '11px' }}>
                                All your transactions are protected with military-grade security.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="my-4 text-muted opacity-25" />

                {/* Bottom Footer */}
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="text-muted small mb-0">
                            © 2026 SmartBank. Made with ❤️ by Riya Bharat Gaikwad.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                        <span className="text-muted small me-3">Privacy Policy</span>
                        <span className="text-muted small">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;