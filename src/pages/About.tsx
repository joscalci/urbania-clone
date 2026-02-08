// import React from 'react';
import { Target, Users, Shield, Award, Sparkles } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-vesta-primary text-white">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                        alt="Real Estate Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">REDEFINIENDO EL<br /><span className="text-vesta-accent">FUTURO INMOBILIARIO</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
                        Vesta es la evolución tecnológica de Arcon Inmobiliaria, diseñada para conectar personas con sus hogares ideales a través de IA y datos.
                    </p>
                </div>
            </section>

            {/* History & Vision */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-vesta-accent rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Sparkles className="h-4 w-4" /> La próxima generación
                        </div>
                        <h2 className="text-4xl font-black text-vesta-primary mb-8 tracking-tighter">De Arcon a Vesta</h2>
                        <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                            <p>
                                Con más de 10 años liderando el mercado inmobiliario peruano como **Arcon Inmobiliaria**, entendimos que el futuro requería algo más que solo anuncios: requería inteligencia.
                            </p>
                            <p>
                                **VESTA** nace como la plataforma tecnológica de Arcon para llevar la experiencia de búsqueda a un nivel nunca antes visto. No solo mostramos casas, utilizamos algoritmos avanzados para predecir donde serás más feliz.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <StatCard icon={<Target className="text-vesta-accent" />} title="Misión" desc="Democratizar el acceso a la mejor información inmobiliaria mediante tecnología de punta." />
                        <StatCard icon={<Users className="text-vesta-accent" />} title="Equipo" desc="Expertos en Real Estate, Data Scientists y Diseñadores unidos por una visión." />
                        <StatCard icon={<Shield className="text-vesta-accent" />} title="Seguridad" desc="Propiedades 100% verificadas por el equipo administrativo de Arcon." />
                        <StatCard icon={<Award className="text-vesta-accent" />} title="Calidad" desc="Estándares premium en cada una de nuestras publicaciones y servicios." />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-vesta-primary mb-16 tracking-tighter">Nuestros Pilares</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <ValueItem
                            title="Innovación Constante"
                            desc="Vesta Vision AI y Investor Edge son solo el comienzo de nuestra revolución tecnológica."
                        />
                        <ValueItem
                            title="Transparencia Total"
                            desc="Datos reales, precios actualizados y comunicación directa sin intermediarios ocultos."
                        />
                        <ValueItem
                            title="Enfoque en el Usuario"
                            desc="Diseñamos cada píxel pensando en hacer tu vida más fácil y tu inversión más segura."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const StatCard = ({ icon, title, desc }: any) => (
    <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4">{icon}</div>
        <h4 className="font-black text-vesta-primary mb-2 tracking-tight">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
    </div>
);

const ValueItem = ({ title, desc }: any) => (
    <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100">
        <h3 className="text-xl font-black text-vesta-primary mb-4 tracking-tight">{title}</h3>
        <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

export default About;
