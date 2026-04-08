import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';



function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        fullName: '',

        email: '',

        mobile: '',

        pin: '',

        password: '',

        confirmPassword: ''

    });



    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };



    const handleSignup = (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match!");

            return;

        }

        if (formData.pin.length !== 4) {

            alert("Transaction PIN must be 4 digits!");

            return;

        }

       

        // 💾 Saving User Data Dynamically

        localStorage.setItem("userName", formData.fullName);

        localStorage.setItem("userMobile", formData.mobile);

        localStorage.setItem("userPin", formData.pin);



        alert(`Account Created Successfully! Welcome ${formData.fullName} 🎉`);

        navigate('/login');

    };



    return (

        <div className="signup-wrapper d-flex align-items-center justify-content-center py-5">

            <div className="container">

                <div className="card signup-card border-0 shadow-lg mx-auto overflow-hidden">

                    <div className="row g-0">

                        <div className="col-lg-5 d-none d-lg-flex bg-primary text-white align-items-center justify-content-center flex-column p-5 signup-branding">

                            <div className="brand-logo mb-4">SB</div>

                            <h2 className="fw-bold">SmartBank</h2>

                            <p className="text-center opacity-75">Join India's most secure and fastest digital banking experience.</p>

                            <div className="mt-4 badge bg-white text-primary px-3 py-2 rounded-pill shadow">🔒 PCI-DSS Secure</div>

                        </div>



                        <div className="col-lg-7 bg-white p-4 p-md-5">

                            <div className="text-center mb-4">

                                <h3 className="fw-bold text-dark">Create Account</h3>

                                <p className="text-muted">Fill in your details to get started</p>

                            </div>



                            <form onSubmit={handleSignup}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label small fw-bold">Full Name</label>

                                        <input name="fullName" type="text" className="form-control custom-input" placeholder="👤 e.g. Riya Gaikwad" required onChange={handleChange} />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label small fw-bold">Mobile Number</label>

                                        <input name="mobile" type="text" className="form-control custom-input" placeholder="📱 10-digit number" maxLength="10" required onChange={handleChange} />

                                    </div>

                                </div>



                                <div className="mb-3">

                                    <label className="form-label small fw-bold">Email Address</label>

                                    <input name="email" type="email" className="form-control custom-input" placeholder="📧 name@example.com" required onChange={handleChange} />

                                </div>



                                <div className="mb-3">

                                    <label className="form-label small fw-bold">Set 4-Digit Transaction PIN</label>

                                    <input name="pin" type="password" className="form-control custom-input" placeholder="🔐 Enter 4-digit secret PIN" maxLength="4" required onChange={handleChange} style={{ letterSpacing: '2px' }} />

                                    <div className="form-text mt-1" style={{fontSize: '11px'}}>This PIN will be used for all your payments.</div>

                                </div>



                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label small fw-bold">Password</label>

                                        <input name="password" type="password" className="form-control custom-input" placeholder="🔑 Create password" required onChange={handleChange} />

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <label className="form-label small fw-bold">Confirm Password</label>

                                        <input name="confirmPassword" type="password" className="form-control custom-input" placeholder="🔄 Re-type password" required onChange={handleChange} />

                                    </div>

                                </div>



                                <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow signup-btn">Create My Account 🚀</button>

                                <div className="text-center mt-4">

                                    <p className="text-muted small">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login Here</Link></p>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>



            <style>{`

                .signup-wrapper { background: #f0f2f5; min-height: 100vh; }

                .signup-card { max-width: 900px; border-radius: 40px; }

                .signup-branding { background: linear-gradient(135deg, #0d6efd 0%, #003399 100%); }

                .brand-logo { width: 80px; height: 80px; background: white; color: #0d6efd; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }

                .custom-input { border-radius: 12px; padding: 12px 15px; border: 1px solid #e0e0e0; background: #f9f9f9; transition: 0.3s; }

                .custom-input:focus { background: #fff; border-color: #0d6efd; box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1); }

                .signup-btn { transition: 0.4s; }

                .signup-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(13, 110, 253, 0.3) !important; }

            `}</style>

        </div>

    );

}



export default Signup;