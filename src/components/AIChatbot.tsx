import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([
        { role: 'ai', content: '¡Hola! Soy Vesta AI, tu asistente inmobiliario inteligente. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        setIsTyping(true);

        // Simulated AI response logic
        setTimeout(() => {
            let aiResponse = "";
            const msg = userMessage.toLowerCase();

            if (msg.includes('precio') || msg.includes('cuanto') || msg.includes('costo')) {
                aiResponse = "Los precios varían según el distrito. En Vesta puedes filtrar por rango de precio en nuestra página de búsqueda. ¿Buscas en algún distrito en particular?";
            } else if (msg.includes('publicar') || msg.includes('vender')) {
                aiResponse = "¡Excelente! Puedes publicar tu propiedad haciendo clic en el botón 'Publicar' en la parte superior. Ofrecemos planes Gratuitos, Destacados y Premium.";
            } else if (msg.includes('contacto') || msg.includes('llamar')) {
                aiResponse = "Puedes contactar al anunciante directamente desde la ficha de cada propiedad, ya sea por formulario o vía WhatsApp.";
            } else if (msg.includes('vesta') || msg.includes('quienes')) {
                aiResponse = "Vesta es la plataforma tecnológica de Arcon Inmobiliaria. Combinamos inteligencia artificial con el mercado inmobiliario para que encuentres tu hogar ideal más rápido.";
            } else {
                aiResponse = "Interesante. Como experto en el mercado inmobiliario peruano, te recomiendo explorar nuestros filtros avanzados. ¿Deseas que te ayude a buscar algún tipo de propiedad específica?";
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[60]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-[380px] h-[550px] flex flex-col mb-6 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-vesta-primary p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-vesta-accent p-2 rounded-xl">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm tracking-tight flex items-center gap-1">
                                        Vesta AI <Sparkles className="h-3 w-3 text-vesta-accent fill-vesta-accent" />
                                    </h3>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">En línea</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${m.role === 'ai'
                                        ? 'bg-white text-vesta-primary shadow-sm border border-gray-100 rounded-tl-none'
                                        : 'bg-vesta-accent text-white shadow-lg shadow-blue-100 rounded-tr-none'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Escribe un mensaje..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-vesta-accent text-sm font-medium"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-vesta-accent hover:bg-white rounded-lg transition-colors"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-vesta-primary rotate-90' : 'bg-vesta-accent hover:bg-blue-700'
                    }`}
            >
                {isOpen ? (
                    <X className="h-8 w-8 text-white" />
                ) : (
                    <MessageSquare className="h-8 w-8 text-white" />
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default AIChatbot;
