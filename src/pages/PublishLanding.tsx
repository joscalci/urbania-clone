import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Camera, ClipboardList, CheckCircle2, ChevronRight } from 'lucide-react';

const PublishLanding = () => {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Hero Section */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-vesta-primary mb-6">
                        Vende tu propiedad <br /> de forma rápida y sencilla
                    </h1>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                        Te conectamos con las personas que buscan su próximo hogar en todo el Perú.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button className="bg-white text-vesta-accent border-2 border-vesta-accent font-bold py-4 px-10 rounded-xl hover:bg-gray-50 transition-all">
                            Valuar mi propiedad
                        </button>
                        <Link to="/profile-selection" className="bg-vesta-accent text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                            Publicar gratis <ChevronRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8">
                            <div className="text-5xl font-black text-vesta-accent mb-4">2 millones</div>
                            <div className="text-gray-500 font-medium">de personas ingresan por mes en busca de su hogar.</div>
                        </div>
                        <div className="p-8">
                            <div className="text-5xl font-black text-vesta-accent mb-4">850 mil</div>
                            <div className="text-gray-500 font-medium">consultas mensuales reciben nuestros avisos.</div>
                        </div>
                        <div className="p-8">
                            <div className="text-5xl font-black text-vesta-accent mb-4">+5 mil</div>
                            <div className="text-gray-500 font-medium">dueños alquilan y publican sus propiedades en nuestro portal.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Steps Section */}
            <div className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black text-center mb-16">Publica tu propiedad gratis y en simples pasos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <StepCard
                            number="1"
                            icon={<MapPin className="h-8 w-8 text-vesta-accent" />}
                            title="Ubica tu propiedad en el mapa"
                        />
                        <StepCard
                            number="2"
                            icon={<ClipboardList className="h-8 w-8 text-vesta-accent" />}
                            title="Cuéntanos cómo es"
                        />
                        <StepCard
                            number="3"
                            icon={<Camera className="h-8 w-8 text-vesta-accent" />}
                            title="Sube fotos y vídeos"
                        />
                        <StepCard
                            number="4"
                            icon={<CheckCircle2 className="h-8 w-8 text-vesta-accent" />}
                            title="Publica gratis o elige un plan"
                        />
                    </div>
                    <div className="mt-16 text-center">
                        <Link to="/profile-selection" className="bg-vesta-accent text-white font-bold py-4 px-16 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                            Publicar gratis
                        </Link>
                    </div>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-center mb-12">Preguntas frecuentes</h2>
                    <div className="space-y-6">
                        <FAQItem
                            question="¿Cómo creo mi aviso?"
                            answer="Simplemente haz clic en el botón 'Publicar' y sigue los pasos. Es fácil y guiado."
                        />
                        <FAQItem
                            question="¿Cómo hago para que mi aviso tenga mejor posición?"
                            answer="Contamos con planes Premium que destacan tu propiedad en los primeros resultados."
                        />
                        <FAQItem
                            question="¿Cómo respondo los mensajes?"
                            answer="Recibirás notificaciones en tu email y podrás gestionarlos desde tu panel de Vesta."
                        />
                        <FAQItem
                            question="¿Cómo paso mi aviso gratis a un plan pago?"
                            answer="Desde tu panel de control, selecciona el aviso y elige 'Mejorar exposición'."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
        <h4 className="font-bold text-lg mb-2 flex justify-between items-center cursor-pointer">
            {question}
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-vesta-accent transition-colors" />
        </h4>
        <p className="text-gray-500 text-sm leading-relaxed">{answer}</p>
    </div>
);

const StepCard = ({ number, icon, title }: { number: string, icon: React.ReactNode, title: string }) => (
    <div className="relative p-8 text-center bg-gray-50 rounded-2xl">
        <div className="absolute -top-4 -left-4 w-10 h-10 bg-vesta-primary text-white flex items-center justify-center rounded-full font-black text-lg">
            {number}
        </div>
        <div className="mb-6 flex justify-center">{icon}</div>
        <h4 className="font-bold text-gray-800 leading-tight">{title}</h4>
    </div>
);

export default PublishLanding;
