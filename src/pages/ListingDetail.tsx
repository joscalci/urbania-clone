import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import PropertyCard from '../components/PropertyCard';
import {
    Heart, Share2, MapPin, Bath, Bed, ChevronRight,
    Maximize2, Layers, Armchair, X, Download, Square, MessageCircle, Info, Sparkles, ShieldCheck,
    TrendingUp, BarChart3, ArrowUpRight, Camera
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import MortgageCalculator from '../components/MortgageCalculator';

const ListingDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { properties } = usePropertyStore();
    const property = properties.find((p) => p.id === id);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const similarProperties = useMemo(() => {
        if (!property) return [];
        return properties
            .filter(p => p.id !== property.id && (p.location.district === property.location.district || p.type === property.type))
            .slice(0, 3);
    }, [properties, property]);

    if (!property) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Propiedad no encontrada</h2>
                <Link to="/search" className="text-vesta-accent hover:underline">Volver a buscar</Link>
            </div>
        );
    }

    const position: [number, number] = [property.location.lat || -12.1211, property.location.lng || -77.0293];

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Lightbox Modal */}
            {selectedImg && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
                    <button
                        onClick={() => setSelectedImg(null)}
                        className="absolute top-6 right-6 text-white hover:text-vesta-accent transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <img
                        src={selectedImg}
                        alt="Property fullscreen"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full backdrop-blur-md text-sm font-bold flex items-center gap-2">
                            <Download className="h-4 w-4" /> Guardar imagen
                        </button>
                    </div>
                </div>
            )}

            {/* Top Bar / Breadcrumbs */}
            <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-vesta-accent font-medium">Inicio</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link to="/search" className="hover:text-vesta-accent font-medium">{property.type === 'sale' ? 'Venta' : 'Alquiler'}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-gray-600 font-bold truncate max-w-[200px]">{property.title}</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-vesta-accent transition-colors group"
                    >
                        <Heart className={`h-5 w-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'group-hover:scale-110'} `} />
                        {isFavorite ? 'En favoritos' : 'Favorito'}
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-vesta-accent transition-colors">
                        <Share2 className="h-5 w-5" />
                        Compartir
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Photo Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-8 group cursor-zoom-in">
                    <div
                        className="md:col-span-3 md:row-span-2 relative overflow-hidden"
                        onClick={() => setSelectedImg(property.images[0])}
                    >
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                    <div
                        className="hidden md:block relative overflow-hidden bg-gray-100"
                        onClick={() => setSelectedImg(property.images[1] || property.images[0])}
                    >
                        <img
                            src={property.images[1] || property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                    <div
                        className="hidden md:block relative overflow-hidden bg-gray-900 group"
                        onClick={() => setSelectedImg(property.images[2] || property.images[0])}
                    >
                        <img
                            src={property.images[2] || property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover opacity-80 backdrop-blur-sm transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-black text-xl">+ 12 fotos</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12 pb-12">
                        {/* Header Info */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-vesta-accent/10 text-vesta-accent px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                                    {property.type === 'sale' ? 'En Venta' : 'En Alquiler'}
                                </span>
                                <span className="text-sm font-bold text-gray-400">
                                    Publicado hace 3 días
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-5xl font-black text-vesta-primary mb-2 tracking-tighter flex items-center gap-4">
                                        {property.currency === 'USD' ? 'USD' : 'S/'} {property.price.toLocaleString()}
                                        {property.isVerified && (
                                            <span className="bg-blue-100 text-blue-600 p-2 rounded-xl" title="Propiedad Verificada">
                                                <ShieldCheck className="h-6 w-6" />
                                            </span>
                                        )}
                                    </h1>
                                    <div className="flex gap-4">
                                        <button className="text-vesta-accent text-sm font-bold hover:text-blue-700 transition-colors flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            Avisarme si baja de precio
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('¿Deseas reportar este aviso por información incorrecta o imágenes inapropiadas?')) {
                                                    alert('Gracias. Nuestro equipo de moderación revisará este aviso en breve.');
                                                }
                                            }}
                                            className="text-red-400 text-sm font-bold hover:text-red-600 transition-colors flex items-center gap-1"
                                        >
                                            <Info className="h-4 w-4" />
                                            Reportar aviso
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 gap-2 mb-8 bg-gray-50 p-4 rounded-2xl w-fit">
                                <MapPin className="h-5 w-5 text-vesta-accent" />
                                <span className="font-bold text-vesta-primary">{property.location.address}, {property.location.district}</span>
                            </div>

                            {/* Feature Grid Icons */}
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 py-10 border-t border-b border-gray-100">
                                <FeatureIcon icon={<Maximize2 className="h-6 w-6" />} value={`${property.features.area} m²`} label="totales" />
                                <FeatureIcon icon={<Square className="h-6 w-6" />} value={`${property.features.area} m²`} label="cubiertos" />
                                <FeatureIcon icon={<Layers className="h-6 w-6" />} value="1" label="ambiente" />
                                <FeatureIcon icon={<Bath className="h-6 w-6" />} value={property.features.bathrooms} label="baño" />
                                <FeatureIcon icon={<Bed className="h-6 w-6" />} value={property.features.bedrooms} label="dorm." />
                                <FeatureIcon icon={<Armchair className="h-6 w-6" />} value="1" label="cochera" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-black text-vesta-primary mb-6">Descripción</h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-4 whitespace-pre-wrap font-medium">
                                {property.description || `Venta de departamento de estreno en el corazón de ${property.location.district}. Excelente iluminación natural, acabados de primera calidad y ubicación estratégica cerca a parques y centros comerciales.`}
                            </p>
                        </div>

                        {/* Location / Map */}
                        <div className="pt-8">
                            <h2 className="text-2xl font-black text-vesta-primary mb-6">Ubicación</h2>
                            <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-sm border border-gray-100 grayscale-[20%]">
                                <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={position}>
                                        <Popup>{property.title}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>

                        {/* Investor Edge Analytics - Revolutionary Feature */}
                        <div className="pt-8">
                            <div className="bg-white border-2 border-vesta-accent/10 rounded-[32px] overflow-hidden shadow-xl">
                                <div className="bg-vesta-primary p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-vesta-accent p-2 rounded-xl">
                                            <TrendingUp className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black text-lg leading-tight">Investor Edge Analytics</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Datos para decisiones inteligentes</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] font-black text-white uppercase">Modo Inversionista Activo</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="text-3xl font-black text-vesta-primary mb-1">7.4%</div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ROI Anual Est.</div>
                                            <div className="mt-2 text-[10px] text-green-600 font-bold flex items-center justify-center gap-1">
                                                <ArrowUpRight className="h-3 w-3" /> Superior al promedio
                                            </div>
                                        </div>
                                        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="text-3xl font-black text-vesta-primary mb-1">12/mo</div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payback (Años)</div>
                                            <div className="mt-2 text-[10px] text-vesta-accent font-bold">Escenario Conservador</div>
                                        </div>
                                        <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="text-3xl font-black text-vesta-primary mb-1">+5.2%</div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plusvalía 12m</div>
                                            <div className="mt-2 text-[10px] text-blue-600 font-bold">Tendencia Alcista</div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black text-vesta-primary uppercase tracking-widest flex items-center gap-2">
                                            <BarChart3 className="h-4 w-4 text-vesta-accent" /> Histórico de Precios ({property.location.district})
                                        </h4>
                                        <div className="h-48 flex items-end justify-between gap-1 px-4">
                                            {[30, 45, 40, 55, 65, 60, 80, 75, 90, 85, 100].map((h, i) => (
                                                <div key={i} className="flex-1 group relative">
                                                    <div
                                                        className="bg-vesta-accent/20 group-hover:bg-vesta-accent transition-all duration-300 rounded-t-lg"
                                                        style={{ height: `${h}%` }}
                                                    ></div>
                                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-gray-300 uppercase">
                                                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov'][i]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
                                        <p className="text-xs text-gray-400 font-medium max-w-md">
                                            * Los cálculos se basan en datos históricos de VESTA Analytics y no garantizan rendimientos futuros.
                                        </p>
                                        <button className="bg-vesta-primary text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
                                            Descargar Auditoría de Valor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vesta Vision AI - Revolutionary Feature */}
                        <div className="pt-8">
                            <div className="bg-gradient-to-br from-vesta-accent to-pink-600 rounded-[32px] p-1 shadow-2xl overflow-hidden group">
                                <div className="bg-white rounded-[31px] p-8 md:p-12 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-vesta-accent/5 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-150 transition-transform duration-700"></div>

                                    <div className="flex flex-col md:flex-row gap-12 items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Camera className="h-4 w-4 text-vesta-accent" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vesta-accent">Vesta Vision AI</span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black text-vesta-primary tracking-tighter leading-none mb-6">
                                                Visualiza tu <span className="text-vestate-secondary">futuro hogar</span>
                                            </h2>
                                            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
                                                ¿Te cuesta imaginar cómo se verá sin muebles? Nuestra IA realiza un **Virtual Staging** instantáneo para que veas el potencial real de cada espacio.
                                            </p>
                                            <div className="flex flex-wrap gap-4">
                                                <button className="bg-vesta-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center gap-2 group/btn">
                                                    Probar Staging AI <Sparkles className="h-4 w-4 text-vesta-accent group-hover/btn:rotate-12 transition-transform" />
                                                </button>
                                                <button className="bg-gray-100 text-vesta-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
                                                    Ver estilos
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-1 relative">
                                            <div className="relative rounded-[24px] overflow-hidden shadow-2xl border-4 border-white">
                                                <img
                                                    src={property.images[0]}
                                                    className="w-full h-[300px] object-cover grayscale-[40%]"
                                                    alt="Original"
                                                />
                                                <div className="absolute inset-0 bg-vesta-accent/20 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="bg-white/90 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-vesta-accent rounded-full animate-ping"></div>
                                                        <span className="text-xs font-black uppercase tracking-widest text-vesta-primary">Reimaginando espacio...</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* AI Result Overlay Mock */}
                                            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl border-4 border-white shadow-2xl overflow-hidden hidden md:block group-hover:scale-110 transition-transform">
                                                <img
                                                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80"
                                                    className="w-full h-full object-cover"
                                                    alt="AI Result"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vesta Neighborhood AI - Differentiation Feature */}
                        <div className="pt-8 bg-gradient-to-br from-vesta-primary to-blue-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-vesta-accent/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-vesta-accent p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black tracking-tight">Vesta Neighborhood AI</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Análisis inteligente de zona</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                        <h4 className="text-vesta-accent font-black text-xs uppercase tracking-widest mb-4">¿Por qué vivir aquí?</h4>
                                        <p className="text-sm text-gray-200 leading-relaxed font-medium">
                                            {property.location.district} es una de las zonas con mayor revalorización proyectada (+12% anual).
                                            Ideal para perfiles jóvenes y familias por su alta densidad de áreas verdes y conectividad con ciclovías.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                        <h4 className="text-vesta-accent font-black text-xs uppercase tracking-widest mb-4">Puntaje Vesta</h4>
                                        <div className="flex gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-black">9.2</div>
                                                <div className="text-[8px] text-gray-400 uppercase font-black">Seguridad</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-black">8.5</div>
                                                <div className="text-[8px] text-gray-400 uppercase font-black">Walkscore</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-black">9.8</div>
                                                <div className="text-[8px] text-gray-400 uppercase font-black">Colegios</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-sm font-black text-vesta-accent hover:text-white transition-colors flex items-center gap-1 group">
                                    Descargar reporte completo de {property.location.district} <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Mortgage Calculator Integration */}
                        <div className="pt-8">
                            <MortgageCalculator price={property.price} currency={property.currency} />
                        </div>
                    </div>

                    {/* Sidebar / Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-[32px] shadow-2xl border border-gray-50 p-8">
                                <h3 className="text-xl font-black text-vesta-primary mb-6 text-center">Contactá al anunciante</h3>
                                <form className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent transition-all font-bold text-sm text-vesta-primary"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent transition-all font-bold text-sm text-vesta-primary"
                                    />
                                    <div className="grid grid-cols-3 gap-2">
                                        <select className="col-span-1 px-2 py-4 bg-gray-50 border-0 rounded-2xl font-black text-xs">
                                            <option>+51 🇵🇪</option>
                                        </select>
                                        <input
                                            type="tel"
                                            placeholder="Teléfono"
                                            className="col-span-2 px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent transition-all font-bold text-sm text-vesta-primary"
                                        />
                                    </div>
                                    <textarea
                                        rows={3}
                                        className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent transition-all font-bold text-sm text-vesta-primary"
                                        defaultValue={`¡Hola! Quiero que se comuniquen conmigo por esta propiedad en ${property.type === 'sale' ? 'venta' : 'alquiler'} que vi en Vesta.`}
                                    ></textarea>

                                    <div className="space-y-3 pt-4">
                                        <button className="w-full bg-vesta-accent text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transform active:scale-[0.98]">
                                            Contactar
                                        </button>
                                        <button className="w-full bg-[#25D366] text-white font-black py-4 rounded-2xl hover:bg-[#128C7E] transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 transform active:scale-[0.98]">
                                            <MessageCircle className="h-5 w-5" />
                                            WhatsApp
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-vesta-primary text-white rounded-2xl flex items-center justify-center font-black text-xl">
                                            A
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Inmobiliaria</div>
                                            <div className="font-black text-vesta-primary text-sm">ARCON INMOBILIARIA</div>
                                        </div>
                                    </div>
                                    <button className="text-vesta-accent font-black text-xs hover:underline">Ver ficha</button>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-3">
                                <Info className="h-5 w-5 text-vesta-accent shrink-0 mt-0.5" />
                                <p className="text-[11px] text-blue-800 font-bold leading-relaxed">
                                    Al contactar al anunciante, aceptas nuestros Términos y Condiciones y Política de Privacidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Properties Section */}
                {similarProperties.length > 0 && (
                    <div className="mt-20 border-t border-gray-100 pt-20 pb-20">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <span className="text-vesta-accent font-black text-xs tracking-widest uppercase">Relacionados</span>
                                <h2 className="text-4xl font-black text-vesta-primary mt-2">Propiedades Similares</h2>
                            </div>
                            <Link to="/search" className="text-sm font-black text-vesta-accent hover:underline flex items-center gap-1">
                                Ver más <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {similarProperties.map(p => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const FeatureIcon = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
    <div className="text-center group flex flex-col items-center">
        <div className="text-gray-300 group-hover:text-vesta-accent transition-colors mb-3">
            {icon}
        </div>
        <div className="font-black text-vesta-primary leading-none text-xl mb-1">{value}</div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{label}</div>
    </div>
);

export default ListingDetail;
