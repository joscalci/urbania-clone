import { usePropertyStore } from '../store/propertyStore';
import PropertyCard from './PropertyCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartRecommendations = () => {
    const { properties } = usePropertyStore();

    // Simulated ML logic: Pick properties with 'premium' plan first, 
    // or those that are 'verified' as they are higher quality
    const recommended = properties
        .filter(p => p.plan === 'premium' || p.isVerified)
        .slice(0, 3);

    if (recommended.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-vesta-trust/10 rounded-full blur-3xl"></div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-vesta-trust animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vesta-trust">Inteligencia Vesta</span>
                        </div>
                        <h2 className="text-4xl font-black text-vesta-primary tracking-tighter">Recomendados para ti</h2>
                        <p className="text-gray-400 font-bold mt-2">Basado en tus preferencias y zonas de interés</p>
                    </div>
                    <Link to="/search" className="group flex items-center gap-2 text-sm font-black text-vesta-primary hover:text-vesta-trust transition-all">
                        Explorar más <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {recommended.map(property => (
                        <div key={property.id} className="relative">
                            {/* Score Tag */}
                            <div className="absolute -top-4 -right-4 z-10 bg-vesta-primary text-white p-4 rounded-3xl shadow-2xl border-4 border-white rotate-12 group-hover:rotate-0 transition-transform">
                                <div className="text-2xl font-black leading-none">98%</div>
                                <div className="text-[8px] font-black uppercase tracking-widest text-vesta-accent">Match</div>
                            </div>
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SmartRecommendations;
