import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar navbar-light bg-white shadow-sm sticky-top border-bottom py-3">
            <div className="container d-flex justify-content-between align-items-center">
                
                {/* Left Side: Logo */}
                <Link className="navbar-brand fw-bold fs-3 text-primary m-0" to="/" style={{ letterSpacing: '-1px' }}>
                    SmartBank 🏦
                </Link>

                {/* Right Side: Navigation Links & Buttons */}
                <div className="d-flex align-items-center">
                    <ul className="d-flex align-items-center m-0 p-0" style={{ listStyle: 'none', gap: '20px' }}>
                        
                        {/* 1. Home Link */}
                        <li className="d-none d-md-block">
                            <Link className="text-decoration-none fw-semibold text-dark" to="/">
                                <span className="me-1">🏠</span> Home
                            </Link>
                        </li>

                        {/* 2. Features Link */}
                        <li className="d-none d-md-block">
                            <Link className="text-decoration-none fw-semibold text-dark" to="/features">
                                <span className="me-1">🚀</span> Features
                            </Link>
                        </li>

                        {!isLoggedIn ? (
                            <>
                                {/* 3. Login Link */}
                                <li>
                                    <Link className="text-decoration-none fw-semibold text-dark" to="/login">
                                        <span className="me-1">🔑</span> Login
                                    </Link>
                                </li>
                                {/* 4. Open Account Button */}
                                <li>
                                    <Link className="btn btn-primary px-4 rounded-pill fw-bold shadow-sm" to="/signup">
                                        Open Account ✨
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* 5. Dashboard Link */}
                                <li>
                                    <Link className="text-decoration-none fw-semibold text-dark" to="/dashboard">
                                        <span className="me-1">📊</span> Dashboard
                                    </Link>
                                </li>

                                {/* 6. Help & Support Link */}
                                <li>
                                    <Link to="/support" className="text-decoration-none fw-semibold text-dark">
                                        <span className="me-1">🎧</span> Support
                                    </Link>
                                </li>
                                
                                {/* 7. Logout Button */}
                                <li>
                                    <button className="btn btn-outline-danger px-4 rounded-pill fw-bold ms-2" onClick={onLogout}>
                                        Logout 🚪
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;