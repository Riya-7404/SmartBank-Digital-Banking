import React, { useState } from 'react';

import { Link } from 'react-router-dom';



function Login({ onLogin }) {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false); // Password dikhane ke liye



    const handleSubmit = (e) => {

        e.preventDefault();

        onLogin(username, password);

    };



    return (

        <div style={{ background: '#f0f2f5', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-4">

                        <div className="card border-0 shadow-lg p-4" style={{ borderRadius: '24px' }}>

                            <div className="text-center mb-4">

                                <div className="display-6 mb-2">🔐</div>

                                <h3 className="fw-bold text-dark">Welcome Back</h3>

                                <p className="text-muted small">Enter your credentials to access SmartBank</p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label small fw-bold text-secondary">Gmail</label>

                                    <input

                                        type="text"

                                        className="form-control bg-light border-0 py-2"

                                        placeholder="riya_gk"

                                        style={{ borderRadius: '10px' }}

                                        onChange={(e) => setUsername(e.target.value)}

                                        required

                                    />

                                </div>

                                <div className="mb-4 position-relative">

                                    <label className="form-label small fw-bold text-secondary">PASSWORD</label>

                                    <input

                                        type={showPassword ? "text" : "password"}

                                        className="form-control bg-light border-0 py-2"

                                        placeholder="••••••••"

                                        style={{ borderRadius: '10px' }}

                                        onChange={(e) => setPassword(e.target.value)}

                                        required

                                    />

                                    <button

                                        type="button"

                                        className="position-absolute end-0 top-50 mt-2 me-3 border-0 bg-transparent text-muted"

                                        onClick={() => setShowPassword(!showPassword)}

                                    >

                                        {showPassword ? "🙈" : "👁️"}

                                    </button>

                                </div>

                                <button className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow transition-all hover-up">

                                    Sign In

                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <p className="small text-muted mb-0">

                                    New to our bank? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Create Account</Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}



export default Login;