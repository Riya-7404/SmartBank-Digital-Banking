import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';

function Scanner({ user }) {
    const [isMyQR, setIsMyQR] = useState(true);
    
    // 🟢 1. Dynamic User Name Check
    const activeName = user?.username || localStorage.getItem("userName") || "User";

    useEffect(() => {
        let scanner;
        if (!isMyQR) {
            // 🟢 2. Scanner Initialization
            scanner = new Html5QrcodeScanner('reader', {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                showTorchButtonIfSupported: true,
            });

            scanner.render((result) => {
                alert("Payment request for: " + result);
                scanner.clear();
            }, (error) => {
                // Scanning frame by frame
            });
        }

        return () => {
            if (scanner) scanner.clear().catch(err => console.error("Scanner error", err));
        };
    }, [isMyQR]);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const html5QrCode = new Html5Qrcode("reader-hidden");
        try {
            const result = await html5QrCode.scanFile(file, true);
            alert("QR Code Detected: " + result);
        } catch (err) {
            alert("Could not find a valid QR code in this image.");
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center animate__animated animate__fadeIn">
            <div className="card border-0 shadow-lg p-4 text-center" style={{ borderRadius: '30px', maxWidth: '450px', width: '100%', backgroundColor: '#fff' }}>
                <h4 className="fw-bold mb-4">Scan & Pay</h4>

                {/* Tabs */}
                <div className="bg-light p-1 rounded-pill d-flex mb-4" style={{ border: '1px solid #eee' }}>
                    <button className={`btn flex-grow-1 rounded-pill py-2 fw-bold transition-all ${isMyQR ? 'btn-primary shadow' : 'text-muted border-0'}`} onClick={() => setIsMyQR(true)}>My QR</button>
                    <button className={`btn flex-grow-1 rounded-pill py-2 fw-bold transition-all ${!isMyQR ? 'btn-primary shadow' : 'text-muted border-0'}`} onClick={() => setIsMyQR(false)}>Scan Any QR</button>
                </div>

                <div className="scanner-main-area p-3 border rounded-4 mb-4 bg-white d-flex align-items-center justify-content-center" style={{ minHeight: '420px' }}>
                    {isMyQR ? (
                        <div className="py-4 animate__animated animate__zoomIn w-100">
                            <div className="p-3 bg-light rounded-4 d-inline-block mb-3 border">
                                {/* 🟢 QR with Dynamic Data */}
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SmartBank-${activeName}`} alt="My QR" className="img-fluid" style={{ borderRadius: '10px' }} />
                            </div>
                            
                            {/* 🟢 Login user's name displayed here */}
                            <h5 className="fw-bold mb-1 text-dark">{activeName}</h5>
                            <p className="text-muted small">ID: {activeName.toLowerCase().replace(/\s/g, '')}@smartbank</p>
                            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mt-2">Verified Merchant</span>
                        </div>
                    ) : (
                        <div className="w-100 animate__animated animate__fadeIn">
                            {/* Camera Feed */}
                            <div id="reader" className="w-100 rounded-4 overflow-hidden border-0"></div>
                            
                            <div className="mt-4 pt-3 border-top">
                                <p className="small text-muted mb-3">Or choose from your device</p>
                                <label htmlFor="qr-upload" className="btn btn-outline-primary rounded-pill w-100 py-2 fw-bold transition-all">
                                    <span className="me-2">🖼️</span> Upload from Gallery
                                </label>
                                <input type="file" id="qr-upload" accept="image/*" className="d-none" onChange={handleFileSelect} />
                            </div>
                        </div>
                    )}
                </div>

                <div id="reader-hidden" style={{ display: 'none' }}></div>

                <div className="d-flex align-items-center justify-content-center gap-2 text-muted small py-2 bg-light rounded-pill mt-2">
                    <span className="text-success">●</span> Secure UPI Payment
                </div>
            </div>

            {/* 🟢 CSS: Faltu library buttons ko hide karne ke liye */}
            <style>{`
                #reader__dashboard_section_csr, 
                #reader__dashboard_section_fsit,
                #reader__camera_selection,
                #reader__status_span,
                #reader img,
                #reader span { 
                    display: none !important; 
                }
                #reader { border: none !important; }
                #reader video { border-radius: 15px !important; }
            `}</style>
        </div>
    );
}

export default Scanner;