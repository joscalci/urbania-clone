import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, User, Home, ShieldCheck, Zap } from 'lucide-react';

const Help = () => {
    const [activeTab, setActiveTab] = useState('compradores');

    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Search Hero */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-black text-vesta-primary tracking-tighter mb-8 italic">¿Podemos ayudarte?</h1>
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Busca respuestas... (ej: ¿Cómo publicar?)"
                            className="w-full px-8 py-5 rounded-3xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-vesta-accent/20 focus:border-vesta-accent transition-all text-lg"
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="py-12 border-b border-gray-100">
                <div className="container mx-auto px-4 flex justify-center gap-8">
                    <HelpTab active={activeTab === 'compradores'} onClick={() => setActiveTab('compradores')} icon={<Home size={20} />} label="Compradores" />
                    <HelpTab active={activeTab === 'vendedores'} onClick={() => setActiveTab('vendedores')} icon={<User size={20} />} label="Vendedores" />
                    <HelpTab active={activeTab === 'seguridad'} onClick={() => setActiveTab('seguridad')} icon={<ShieldCheck size={20} />} label="Seguridad" />
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-20 container mx-auto px-4 max-w-3xl">
                <div className="space-y-6">
                    {activeTab === 'compradores' && (
                        <>
                            <FAQItem question="¿Cómo funciona el buscador por mapa?" answer="Nuestro mapa utiliza geolocalización en tiempo real. Puedes filtrar por distrito, precio o incluso por las propiedades que están cerca de tu ubicación actual usando el botón 'Cerca de mí'." />
                            <FAQItem question="¿Qué significa el sello 'Verificado'?" answer="Es nuestra garantía de Arcon. Significa que un administrador ha revisado los documentos y la veracidad de las fotos de la propiedad para tu total seguridad." />
                            <FAQItem question="¿Cómo utilizo Vesta Vision AI?" answer="Dentro de la ficha de cualquier propiedad disponible, busca la sección 'Vesta Vision AI'. Allí puedes aplicar diferentes estilos de muebles virtuales al espacio para visualizar tu futuro hogar." />
                        </>
                    )}
                    {activeTab === 'vendedores' && (
                        <>
                            <FAQItem question="¿Cuánto cuesta publicar en Vesta?" answer="Tenemos planes desde Gratuitos hasta Premium para mayor exposición. Consulta nuestra sección de Planes después de registrarte." />
                            <FAQItem question="¿Puedo editar mi anuncio después de publicado?" answer="Sí, desde tu panel de usuario ('Mis Avisos') puedes modificar fotos, descripción y precio en cualquier momento." />
                            <FAQItem question="¿Cómo recibo los contactos de interesados?" answer="Los leads llegarán directamente a tu Dashboard y también recibirás una notificación vía email con los datos de contacto del interesado." />
                        </>
                    )}
                    {activeTab === 'seguridad' && (
                        <>
                            <FAQItem question="¿Cómo reporto un anuncio sospechoso?" answer="En cada ficha de propiedad encontrarás un botón 'Reportar anuncio'. Esto alertará a nuestro equipo de moderación inmediatamente." />
                            <FAQItem question="¿Están mis datos protegidos?" answer="Cumplimos con todas las normativas de protección de datos personales. Tu información solo es compartida con el vendedor cuando tú decides enviar un contacto." />
                        </>
                    )}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-vesta-accent/5 text-center">
                <div className="container mx-auto px-4">
                    <Zap className="h-10 w-10 text-vesta-accent mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-vesta-primary mb-4 tracking-tighter">¿Aún tienes dudas?</h2>
                    <p className="text-gray-500 font-medium mb-8">Nuestro equipo de Arcon Inmobiliaria está listo para asesorarte personalmente.</p>
                    <button className="bg-vesta-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-vesta-accent transition-colors shadow-lg shadow-blue-100">
                        Contactar Soporte
                    </button>
                </div>
            </section>
        </div>
    );
};

const HelpTab = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all ${active ? 'bg-vesta-accent text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
    >
        {icon}
        {label}
    </button>
);

const FAQItem = ({ question, answer }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-100 rounded-3xl overflow-hidden hover:border-vesta-accent/30 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-vesta-primary italic">{question}</span>
                {isOpen ? <ChevronUp className="text-vesta-accent" /> : <ChevronDown className="text-gray-300" />}
            </button>
            {isOpen && (
                <div className="px-8 pb-8 text-gray-400 font-medium leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default Help;
