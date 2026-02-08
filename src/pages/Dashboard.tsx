import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { PlusCircle, Trash2, Edit, MapPin, Bed, Bath, Square, Eye, Users, MousePointerClick, BarChart3 } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuthStore();
    const { getUserProperties, removeProperty } = usePropertyStore();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión para ver tus propiedades</h2>
                <Link to="/login" className="text-vesta-accent hover:underline">Ir al login</Link>
            </div>
        );
    }

    const myProperties = getUserProperties(user.id);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Publisher Analytics - Revolutionary Feature */}
            <div className="mb-12 bg-vesta-primary rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-vesta-accent/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 w-4 text-vesta-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vesta-accent">Vesta Publisher Insights</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter">Rendimiento de tus Avisos</h2>
                        <p className="text-gray-400 font-bold mt-1">Últimos 30 días de actividad</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Eye className="h-4 w-4 text-gray-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vistas</span>
                            </div>
                            <div className="text-3xl font-black">1,248</div>
                            <div className="mt-1 text-[10px] text-green-500 font-bold">+12% vs. mes anterior</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-2">
                                <MousePointerClick className="h-4 w-4 text-gray-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Interés (Clics)</span>
                            </div>
                            <div className="text-3xl font-black">84</div>
                            <div className="mt-1 text-[10px] text-vesta-accent font-bold">+5% tasa de conversión</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md hidden lg:block">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Potenciales</span>
                            </div>
                            <div className="text-3xl font-black">12</div>
                            <div className="mt-1 text-[10px] text-blue-500 font-bold WhatsApp Clicks">Vía WhatsApp</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Mis Propiedades</h1>
                <Link
                    to="/publish"
                    className="flex items-center space-x-2 bg-vesta-accent text-white px-6 py-3 rounded-lg hover:bg-vesta-secondary transition-colors"
                >
                    <PlusCircle className="h-5 w-5" />
                    <span>Nueva Propiedad</span>
                </Link>
            </div>

            {myProperties.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-lg mb-4">Aún no has publicado ninguna propiedad.</p>
                    <Link to="/publish" className="text-vesta-accent font-semibold hover:underline">
                        ¡Publica la primera!
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProperties.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="relative h-48">
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-vestate-highlight text-vesta-accent px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {property.type === 'sale' ? 'Venta' : 'Alquiler'}
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                                    <p className="text-lg font-bold text-vesta-accent">
                                        {property.currency === 'USD' ? '$' : 'S/'} {property.price.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {property.location.district}, {property.location.city}
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 border-t pt-4 mb-4">
                                    <div className="flex items-center">
                                        <Bed className="h-4 w-4 mr-1" /> {property.features.bedrooms}
                                    </div>
                                    <div className="flex items-center">
                                        <Bath className="h-4 w-4 mr-1" /> {property.features.bathrooms}
                                    </div>
                                    <div className="flex items-center">
                                        <Square className="h-4 w-4 mr-1" /> {property.features.area} m²
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button className="p-2 text-gray-500 hover:text-vesta-accent hover:bg-gray-100 rounded-full transition-colors">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => removeProperty(property.id)}
                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
