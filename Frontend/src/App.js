import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IndexPage from './components/IndexPage';
import ExploreFeatures from './components/ExploreFeatures';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import MoneyTransfer from './components/MoneyTransfer';
import MobileRecharge from './components/MobileRecharge';
import HelpSupport from './components/HelpSupport';
import ChatBot from './components/ChatBot'; // 🟢 ChatBot Import kiya

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ username: "", accNo: "10019854" });
    
    // --- GLOBAL STATES ---
    const [balance, setBalance] = useState(45250);
    const [transactions, setTransactions] = useState([
        { id: 1, date: "2026-03-28", remark: "Spotify Premium", amount: "- ₹179", type: "debit", status: "Success" },
        { id: 2, date: "2026-03-25", remark: "Internship Stipend", amount: "+ ₹12,000", type: "credit", status: "Success" }
    ]);

    // Function to add a transaction from ANY page
    const addTransactionEntry = (remark, amount, type) => {
        const newEntry = { 
            id: Date.now(), 
            date: new Date().toISOString().split('T')[0], 
            remark, 
            amount: `${type === 'credit' ? '+' : '-'} ₹${amount}`, 
            type,
            status: "Success"
        };
        setTransactions(prev => [newEntry, ...prev]);
    };

    const handleLogin = (username) => {
        setUser({ username: username, accNo: "10019854" });
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({ username: "", accNo: "" });
    };

    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/features" element={<ExploreFeatures />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />

                        <Route path="/dashboard" element={
                            isLoggedIn ? 
                            <Dashboard 
                                user={user} 
                                balance={balance} 
                                setBalance={setBalance}
                                transactions={transactions} 
                                addTransactionEntry={addTransactionEntry}
                            /> : <Navigate to="/login" />
                        } />

                        <Route path="/recharge" element={
                            isLoggedIn ? 
                            <MobileRecharge 
                                balance={balance} 
                                setBalance={setBalance} 
                                addTransactionEntry={addTransactionEntry} 
                            /> : <Navigate to="/login" />
                        } />

                        <Route path="/transfer" element={isLoggedIn ? <MoneyTransfer /> : <Navigate to="/login" />} />
                        <Route path="/scan" element={isLoggedIn ? <Scanner /> : <Navigate to="/login" />} />
                        <Route path="/support" element={<HelpSupport />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>

                {/* 🤖 ChatBot yahan dala hai taaki ye har page par visible rahe */}
                <ChatBot />

                <Footer />
            </div>
        </Router>
    );
}

export default App;