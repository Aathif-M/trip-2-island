import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const QA_DATABASE = [
    {
        keywords: ['booking', 'book', 'reserve', 'reservation'],
        reply: "You can book any of our standard itineraries directly from the 'Itineraries' page! For custom bookings, please reach out via our Contact page."
    },
    {
        keywords: ['hi', 'hello', 'hey'],
        reply: "Ayubowan! 👋 Welcome to Trip2Island. How can I help you plan your journey today?"
    },
    {
        keywords: ['price', 'cost', 'expensive', 'cheap', 'budget'],
        reply: "Our packages vary depending on the duration and style of your trip. Typical 7-day itineraries start around $1200 per person."
    },
    {
        keywords: ['visa', 'passport', 'entry'],
        reply: "Most travelers require an Electronic Travel Authorization (ETA) to visit Sri Lanka, which you can easily apply for online before your trip."
    },
    {
        keywords: ['weather', 'best time', 'when to visit', 'rain', 'season'],
        reply: "Sri Lanka is a year-round destination! The south/west is best from December to March and the east coast is perfect from April to September."
    },
    {
        keywords: ['contact', 'email', 'phone', 'call', 'talk', 'whatsapp'],
        reply: "You can reach our dedicated support team 24/7 via WhatsApp at +94 76 882 2188 or email us at info@trip2island.com."
    },
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Ayubowan! 👋 Welcome to Trip2Island. How can I help you plan your journey today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const chatRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && chatRef.current && !chatRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        // User message
        setMessages(prev => [...prev, { sender: 'user', text: trimmedInput }]);
        setInput('');
        setIsTyping(true);

        // Simulate network delay / "live" feeling
        setTimeout(() => {
            const botReply = generateResponse(trimmedInput.toLowerCase());
            setIsTyping(false);
            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 1500 + Math.random() * 1000); // 1.5s to 2.5s delay
    };

    const generateResponse = (message) => {
        // Simple NLP alternative
        for (const qa of QA_DATABASE) {
            if (qa.keywords.some(kw => message.includes(kw))) {
                return qa.reply;
            }
        }
        return "I'm still learning! While I might not have the answer right now, our expert travel consultants do. Please check our Contact or FAQ page for more formal assistance.";
    };

    return (
        <div ref={chatRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Interface */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-sand border border-primary/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col origin-bottom-right transition-all duration-300 transform scale-100 opacity-100 h-[500px] max-h-[80vh]">
                    {/* Header */}
                    <div className="bg-primary text-sand p-4 flex justify-between items-center shadow-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center p-1 relative">
                                <Bot size={24} className="text-sand" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"></span>
                            </div>
                            <div>
                                <h3 className="font-serif font-medium text-lg leading-tight">Island Expert</h3>
                                <p className="text-xs text-sand/70">Online typically replies instantly</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-sand/70 hover:text-sand transition-colors"
                            aria-label="Close Chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f8f6f2]">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} transition-opacity duration-300`}>
                                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-auto ${msg.sender === 'user' ? 'bg-ocean text-sand' : 'bg-primary text-sand'}`}>
                                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user'
                                        ? 'bg-ocean text-sand rounded-br-sm'
                                        : 'bg-white text-primary border border-primary/10 shadow-sm rounded-bl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-2 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-primary text-sand flex items-center justify-center flex-shrink-0 mt-auto">
                                        <Bot size={16} />
                                    </div>
                                    <div className="px-4 py-3 bg-white border border-primary/10 shadow-sm rounded-2xl rounded-bl-sm flex items-center gap-1">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-1" />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-primary/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full pl-4 pr-12 py-3 rounded-xl bg-sand/50 border border-transparent text-primary placeholder:text-primary/40 focus:outline-none focus:ring-1 focus:ring-accent focus:bg-white text-sm transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent text-sand rounded-lg disabled:opacity-50 disabled:bg-primary/20 hover:bg-accent/90 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Action Button */}
            {!isOpen && (
                <div
                    className="relative focus:outline-none z-50"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Tooltip */}
                    <div className={`absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-primary text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-primary/10 transition-all duration-300 origin-right ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                        Chat with us!
                        <div className="absolute top-1/2 -right-1 w-2 h-2 -translate-y-1/2 rotate-45 bg-white border-r border-t border-primary/10"></div>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 bg-accent hover:bg-accent/90 text-sand rounded-full flex items-center justify-center shadow-xl shadow-accent/30 hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 relative group"
                        aria-label="Open Chat"
                    >
                        <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-sand"></span>
                    </button>
                </div>
            )}
        </div>
    );
}
