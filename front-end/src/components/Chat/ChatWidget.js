import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiMaximize2, FiMinimize2, FiClock, FiTrash2, FiPlus } from 'react-icons/fi';
import '../../assets/css/ChatWidget.css';

const mockSessions = [
    {
        id: '1',
        created: new Date().toISOString(),
        messages: [
            { text: 'Hello!', sender: 'user', time: new Date().toISOString() },
            { text: 'Hi, how can I help you?', sender: 'bot', time: new Date().toISOString() }
        ]
    }
];

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [canvas, setCanvas] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [sessions, setSessions] = useState(mockSessions);
    const [currentSessionId, setCurrentSessionId] = useState('1');
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const currentSession = sessions.find(s => s.id === currentSessionId);

    useEffect(() => {
        if ((open || canvas) && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentSession, open, canvas]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { text: input, sender: 'user', time: new Date().toISOString() };
        setSessions(sessions =>
            sessions.map(s =>
                s.id === currentSessionId
                    ? { ...s, messages: [...s.messages, newMsg] }
                    : s
            )
        );
        setInput('');
    };

    const handleNewSession = () => {
        const newId = Date.now().toString();
        const newSession = {
            id: newId,
            created: new Date().toISOString(),
            messages: []
        };
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(newId);
        setShowHistory(false);
    };

    const handleDeleteSession = (id) => {
        const filtered = sessions.filter(s => s.id !== id);
        setSessions(filtered);
        if (currentSessionId === id && filtered.length > 0) {
            setCurrentSessionId(filtered[0].id);
        }
        if (filtered.length === 0) {
            setCurrentSessionId(null);
        }
    };

    // UI for history popover
    const HistoryPopover = ({ large }) => (
        <div className={`chat-history-popover${large ? ' large' : ''}`}>
            <div className="chat-history-header">
                <span>Chat History</span>
                <button onClick={handleNewSession} title="New chat"><FiPlus /></button>
            </div>
            <ul className="chat-history-list">
                {sessions.length === 0 && (
                    <li className="chat-history-empty">No previous chats</li>
                )}
                {sessions.map(session => (
                    <li key={session.id} className={session.id === currentSessionId ? 'active' : ''}>
                        <button className="chat-history-btn" onClick={() => { setCurrentSessionId(session.id); setShowHistory(false); }}>
                            <div className="chat-history-avatar" style={{ background: '#2563eb' }}>
                                <FiMessageCircle size={16} color="#fff" />
                            </div>
                            <div className="chat-history-info">
                                <span className="chat-history-title">Chat {session.id.slice(-4)}</span>
                                <span className="chat-history-time">{new Date(session.created).toLocaleString()}</span>
                            </div>
                        </button>
                        <button className="chat-history-delete" onClick={() => handleDeleteSession(session.id)} title="Delete">
                            <FiTrash2 size={14} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    // UI for chat area
    const ChatArea = ({ large }) => (
        <div className={`chat-messages-area${large ? ' large' : ''}`}>
            <div className="chat-messages-list">
                {(!currentSession || currentSession.messages.length === 0) && (
                    <div className="chat-empty">No messages yet.</div>
                )}
                {currentSession && currentSession.messages.map((msg, idx) => (
                    <div key={idx} className={`chat-message-bubble-row ${msg.sender}`}>
                        <div className="chat-message-avatar">
                            <FiMessageCircle size={18} color={msg.sender === 'user' ? '#2563eb' : '#10b981'} />
                        </div>
                        <div className={`chat-message-bubble ${msg.sender}`}>
                            {msg.text}
                            <div className="chat-message-time">{new Date(msg.time).toLocaleTimeString()}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={`chat-input-row${large ? ' large' : ''}`}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    disabled={!currentSessionId}
                    className="chat-input"
                    autoFocus
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || !currentSessionId}
                    className="chat-send-btn"
                    aria-label="Send"
                >
                    <FiMessageCircle />
                </button>
            </div>
        </div>
    );

    // Floating button
    if (!open) {
        return (
            <button className="chat-fab" onClick={() => setOpen(true)}>
                <FiMessageCircle size={28} />
            </button>
        );
    }

    // Canvas mode (mở rộng, căn giữa, nền mờ)
    if (canvas) {
        return (
            <div className="chat-canvas-modal">
                <div className="chat-canvas-centerbox">
                    <div className="chat-header large">
                        <span className="chat-logo">💡</span>
                        <span className="chat-title">SmartChat</span>
                        <span className="chat-slogan">Your AI Assistant</span>
                        <div className="chat-header-actions">
                            <button onClick={() => setShowHistory(s => !s)} title="Chat history"><FiClock /></button>
                            <button onClick={() => setCanvas(false)} title="Minimize"><FiMinimize2 /></button>
                            <button onClick={() => setOpen(false)} title="Close"><FiX /></button>
                        </div>
                    </div>
                    {showHistory && <HistoryPopover large />}
                    <ChatArea large />
                </div>
            </div>
        );
    }

    // Widget nhỏ (góc phải)
    return (
        <div className="chat-widget">
            <div className="chat-header">
                <span className="chat-logo">💡</span>
                <span className="chat-title">SmartChat</span>
                <div className="chat-header-actions">
                    <button onClick={() => setShowHistory(s => !s)} title="Chat history"><FiClock /></button>
                    <button onClick={() => setCanvas(true)} title="Expand"><FiMaximize2 /></button>
                    <button onClick={() => setOpen(false)} title="Close"><FiX /></button>
                </div>
            </div>
            {showHistory && <HistoryPopover />}
            <ChatArea />
        </div>
    );
};

export default ChatWidget;