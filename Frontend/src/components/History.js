import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function History({ accountNumber }) {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (accountNumber) {
            axios.get(`http://localhost:8080/api/bank/history/${accountNumber}`)
                .then(res => setTransactions(res.data))
                .catch(err => console.error("Error fetching history:", err));
        }
    }, [accountNumber]);

    // 1. 📥 PDF Export Logic
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("SMARTBANK - Account Statement", 14, 20);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Account Number: ${accountNumber}`, 14, 30);
        doc.text(`Date: ${new Date().toLocaleString()}`, 14, 35);
        
        const tableColumn = ["Date", "Description", "Type", "Amount"];
        const tableRows = [];

        transactions.forEach(t => {
            const transactionData = [
                new Date(t.timestamp).toLocaleDateString(),
                t.fromAccount === accountNumber ? `Sent to ${t.toAccount}` : `Received from ${t.fromAccount}`,
                t.type,
                `Rs. ${t.amount.toFixed(2)}`
            ];
            tableRows.push(transactionData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 45 });
        doc.save(`Statement_${accountNumber}.pdf`);
    };

    // 2. 🔍 Search Filter Logic
    const filteredTransactions = transactions.filter(t => 
        t.toAccount.includes(searchTerm) || 
        t.fromAccount.includes(searchTerm) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm)
    );

    return (
        <div className="mt-2">
            {/* Header with Download Button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 text-dark fw-bold">Recent Activity</h5>
                <button className="btn btn-outline-primary btn-sm shadow-sm" onClick={exportPDF}>
                    📥 Download PDF
                </button>
            </div>

            {/* Search Input Box */}
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control form-control-sm shadow-sm" 
                    placeholder="🔍 Search transactions..." 
                    style={{ borderRadius: '10px', padding: '10px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Transactions Table */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-hover align-middle">
                    <thead className="table-light sticky-top">
                        <tr>
                            <th>Date</th>
                            <th>Detail</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map(t => (
                                <tr key={t.id}>
                                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                                        {new Date(t.timestamp).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {t.fromAccount === accountNumber ? 
                                            `Sent to ${t.toAccount}` : 
                                            `Received from ${t.fromAccount}`}
                                    </td>
                                    <td>
                                        <span className={`badge ${t.type === 'DEBIT' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className={`fw-bold ${t.type === 'DEBIT' ? 'text-danger' : 'text-success'}`}>
                                        ₹{t.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted p-4">No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;