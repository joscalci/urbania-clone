import React, { useState } from 'react';
import { Search, BookOpen, HelpCircle, MapPin, Layout, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import SmartRecommendations from '../components/SmartRecommendations';
import { usePropertyStore } from '../store/propertyStore';

const Home = () => {
    const [searchTab, setSearchTab] = useState<'alquilar' | 'comprar' | 'proyectos'>('alquilar');
    const { getApprovedProperties } = usePropertyStore();
    const properties = getApprovedProperties();

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative pt-20 h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                        alt="Modern Mansion"
                        className="w-full h-full object-cover grayscale-[20%] opacity-90 brightness-[0.7]"
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Encuentra tu próximo hogar
                    </h1>

                    {/* Tabbed Search Bar */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="flex justify-center md:justify-start gap-1 mb-0 ml-4">
                            {(['alquilar', 'comprar', 'proyectos'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSearchTab(tab)}
                                    className={`px-6 py-3 text-sm font-bold transition-all rounded-t-xl ${searchTab === tab
                                        ? 'bg-white text-vesta-primary'
                                        : 'bg-black/30 text-white hover:bg-black/40 backdrop-blur-md'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
                            <div className="flex-grow flex items-center border border-gray-100 rounded-xl px-4 bg-gray-50/50">
                                <select className="bg-transparent py-4 font-bold text-sm text-vesta-primary outline-none border-r border-gray-200 mr-4 pr-2">
                                    <option>Departamento</option>
                                    <option>Casa</option>
                                    <option>Oficina</option>
                                    <option>Lote/Terreno</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="¿Dónde quieres vivir? (ej: Miraflores, Piscina...)"
                                    className="w-full bg-transparent py-4 text-sm font-medium outline-none"
                                />
                                <MapPin className="h-5 w-5 text-gray-400 hidden md:block" />
                            </div>
                            <button className="vesta-btn w-auto py-4 px-10 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                <Search className="h-5 w-5" />
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guides Section */}
            <div className="py-20 bg-gray-50/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <GuideCard
                            icon={<BookOpen className="h-6 w-6 text-vesta-accent" />}
                            title="Nuestro blog"
                            desc="Consejos, novedades y noticias del ámbito de la construcción."
                        />
                        <GuideCard
                            icon={<HelpCircle className="h-6 w-6 text-vesta-accent" />}
                            title="Guía para alquilar"
                            desc="Lo que necesitas saber a la hora de alquilar en un solo lugar."
                        />
                        <GuideCard
                            icon={<Layout className="h-6 w-6 text-vesta-accent" />}
                            title="Conoce Vesta"
                            desc="Toda la información sobre cómo usar nuestro portal ¡y mucho más!"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Listings */}
            <div className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <span className="text-vesta-accent font-bold text-xs tracking-widest uppercase">Explorar</span>
                            <h2 className="text-3xl md:text-4xl font-black text-vesta-primary mt-2">Propiedades Destacadas</h2>
                        </div>
                        <button className="text-sm font-bold text-vesta-trust flex items-center gap-1 hover:underline">
                            Ver todas <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.slice(0, 3).map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </div>

            <SmartRecommendations />

            {/* Value Pillars */}
            <div className="py-24 bg-vesta-primary text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Te acompañamos en cada paso</h2>
                        <p className="text-gray-400">Innovación y confianza para tu próxima inversión.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <Pillar
                            icon={<Search className="h-8 w-8 text-vesta-accent" />}
                            title="Búsqueda clara y rápida"
                            desc="Filtros inteligentes y mapas avanzados para simplificar tu experiencia."
                        />
                        <Pillar
                            icon={<ShieldCheck className="h-8 w-8 text-vesta-trust" />}
                            title="Seguridad garantizada"
                            desc="Validamos cada anuncio para que navegues con total tranquilidad."
                        />
                        <Pillar
                            icon={<Users className="h-8 w-8 text-vesta-accent" />}
                            title="Variedad de anunciantes"
                            desc="Inmobiliarias líderes y dueños directos en un solo lugar."
                        />
                        <Pillar
                            icon={<ShieldCheck className="h-8 w-8 text-vesta-trust" />}
                            title="¡Somos Vesta!"
                            desc="El portal tecnológico oficial de Arcon Inmobiliaria con más de 10 años de trayectoria."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const GuideCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
        <div className="bg-vesta-accent/10 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-vesta-primary mb-3">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const Pillar = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="text-center">
        <div className="text-vesta-accent mb-6 flex justify-center">{icon}</div>
        <h4 className="text-xl font-bold mb-4">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Home;
