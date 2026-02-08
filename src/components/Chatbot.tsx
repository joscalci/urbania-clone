import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';
import { Link } from 'react-router-dom';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    type?: 'text' | 'listings';
    data?: any[];
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '¡Hola! Soy Vesta AI 🤖. Tu asistente virtual inteligente. ¿Buscas visitar una propiedad o ver opciones en 3D? Pregúntame: "Busco departamento en Miraflores".',
            sender: 'bot',
            type: 'text'
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { properties } = usePropertyStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            processBotResponse(userMessage.text);
        }, 1000);
    };

    const processBotResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        let responseText = '';
        let foundProperties: any[] = [];

        // Basic NLP logic (Simulated)
        if (lowerText.includes('hola') || lowerText.includes('buenos')) {
            responseText = '¡Hola! ¿Estás buscando comprar o alquilar una propiedad?';
        } else if (lowerText.includes('precio') || lowerText.includes('costo')) {
            responseText = 'Los precios varían según la zona. ¿Tienes un presupuesto en mente?';
        } else if (lowerText.includes('contacto') || lowerText.includes('llamar')) {
            responseText = 'Puedes contactar a los anunciantes directamente desde la página de detalle de cada propiedad.';
        } else {
            // Search logic
            foundProperties = properties.filter(p => {
                const matchType = lowerText.includes('venta') ? p.type === 'sale' :
                    lowerText.includes('alquiler') ? p.type === 'rent' : true;

                const matchCategory = lowerText.includes('casa') ? p.category === 'house' :
                    lowerText.includes('depa') ? p.category === 'apartment' :
                        lowerText.includes('oficina') ? p.category === 'office' : true;

                const matchLocation = p.location.city.toLowerCase().includes(lowerText) ||
                    p.location.district.toLowerCase().includes(lowerText) ||
                    lowerText.includes(p.location.city.toLowerCase()) ||
                    lowerText.includes(p.location.district.toLowerCase());

                return matchType && matchCategory && matchLocation;
            });

            if (foundProperties.length > 0) {
                responseText = `He encontrado ${foundProperties.length} propiedades que podrían interesarte:`;
            } else {
                responseText = 'Lo siento, no encontré propiedades con esas características específicas. Intenta buscar por distrito (ej: "Miraflores") o tipo (ej: "Departamento").';
            }
        }

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: 'bot',
            type: foundProperties.length > 0 ? 'listings' : 'text',
            data: foundProperties.slice(0, 3) // Limit to 3 results in chat
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 bg-vesta-accent text-white p-4 rounded-full shadow-lg hover:bg-vesta-secondary transition-all duration-300 z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare className="h-6 w-6" />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>

                {/* Header */}
                <div className="bg-vesta-accent text-white p-4 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-1.5 rounded-full">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div>
                            <div>
                                <h3 className="font-bold text-sm">Vesta AI</h3>
                                <span className="text-xs text-vestate-highlight flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> En línea
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 ${msg.sender === 'user' ? 'bg-vesta-accent text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'}`}>
                                <p className="text-sm">{msg.text}</p>

                                {/* Property Listings in Chat */}
                                {msg.type === 'listings' && msg.data && (
                                    <div className="mt-3 space-y-2">
                                        {msg.data.map((item: any) => (
                                            <Link to={`/property/${item.id}`} key={item.id} className="block bg-gray-50 hover:bg-gray-100 p-2 rounded border border-gray-200 transition-colors">
                                                <div className="flex gap-2">
                                                    <img src={item.images[0]} alt="" className="w-12 h-12 object-cover rounded" />
                                                    <div className="overflow-hidden">
                                                        <p className="text-xs font-bold truncate text-gray-900">{item.title}</p>
                                                        <p className="text-xs text-vesta-accent font-bold">
                                                            {item.currency === 'USD' ? '$' : 'S/'} {item.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        {msg.data.length > 0 && (
                                            <Link to="/search" className="block text-center text-xs text-vesta-accent font-bold mt-2 hover:underline">
                                                Ver todos los resultados
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl p-3 rounded-bl-none shadow-sm border border-gray-100">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t bg-white rounded-b-2xl">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-vesta-accent focus:bg-white transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-vesta-accent text-white p-2 rounded-full hover:bg-vesta-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
