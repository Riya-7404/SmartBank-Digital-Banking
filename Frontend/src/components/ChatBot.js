import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your SmartBank AI Assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getBotResponse = (userInput) => {
        const query = userInput.toLowerCase();
        if (query.includes("balance")) return "You can view your current balance on the main Dashboard.";
        if (query.includes("recharge")) return "Please visit the Recharge section to top up your mobile or DTH.";
        if (query.includes("security") || query.includes("pin")) return "You can update your security settings and MPIN in the Security tab.";
        if (query.includes("statement") || query.includes("report")) return "Monthly statements are available for download in the Reports section.";
        if (query.includes("hi") || query.includes("hello")) return "Hi there! How can I assist with your banking needs today?";
        return "I'm sorry, I didn't quite get that. Could you please rephrase or visit our Help Center?";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        setTimeout(() => {
            const botMsg = { text: getBotResponse(input), isBot: true };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="chatbot-container">
            {/* The Floating Icon (Visible on all pages) */}
            {!showChat && (
                <div className="chat-icon shadow-lg animate__animated animate__bounceIn" onClick={() => setShowChat(true)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="bot" width="40" />
                </div>
            )}

            {/* The Chat Window */}
            {showChat && (
                <div className="chat-window shadow-2xl animate__animated animate__slideInUp">
                    <div className="chat-header d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="online-dot me-2"></div>
                            <span className="fw-bold">SmartBank Support</span>
                        </div>
                        <button className="btn-close btn-close-white" onClick={() => setShowChat(false)}></button>
                    </div>

                    <div className="chat-body">
                        {messages.map((msg, i) => (
                            <div key={i} className={`d-flex mb-3 ${msg.isBot ? 'justify-content-start' : 'justify-content-end'}`}>
                                <div className={`message-bubble ${msg.isBot ? 'bot-msg' : 'user-msg'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="chat-footer d-flex p-2">
                        <input 
                            type="text" 
                            className="form-control rounded-pill border-0 bg-light px-3" 
                            placeholder="Type a message..." 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                        />
                        <button type="submit" className="btn btn-primary rounded-circle ms-2">🚀</button>
                    </form>
                </div>
            )}

            <style>{`
                .chatbot-container { position: fixed; bottom: 30px; right: 30px; z-index: 9999; }
                .chat-icon { width: 65px; height: 65px; background: #0d6efd; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
                .chat-icon:hover { transform: scale(1.1); }
                .chat-window { width: 350px; background: white; border-radius: 20px; overflow: hidden; border: 1px solid #ddd; display: flex; flex-direction: column; }
                .chat-header { background: #0d6efd; color: white; padding: 15px; }
                .online-dot { width: 10px; height: 10px; background: #28a745; border-radius: 50%; border: 2px solid white; }
                .chat-body { height: 350px; overflow-y: auto; padding: 15px; background: #f8f9fa; }
                .message-bubble { padding: 10px 15px; border-radius: 15px; max-width: 80%; font-size: 14px; }
                .bot-msg { background: white; border: 1px solid #eee; color: #333; }
                .user-msg { background: #0d6efd; color: white; }
                .chat-footer { background: white; border-top: 1px solid #eee; }
            `}</style>
        </div>
    );
};

export default ChatBot;