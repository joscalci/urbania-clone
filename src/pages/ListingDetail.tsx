import { useParams, Link } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import { MapPin, Bed, Bath, Square, Phone, Mail, ArrowLeft } from 'lucide-react';
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

const ListingDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { properties } = usePropertyStore();
    const property = properties.find((p) => p.id === id);

    if (!property) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Propiedad no encontrada</h2>
                <Link to="/search" className="text-urbania-primary hover:underline">Volver a buscar</Link>
            </div>
        );
    }

    // Mock coordinates if not present (Lima center)
    const position: [number, number] = [property.location.lat || -12.1211, property.location.lng || -77.0293];

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Image Header */}
            <div className="h-[400px] md:h-[500px] w-full relative">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                    <Link to="/search" className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors flex items-center gap-2 px-4 shadow-md">
                        <ArrowLeft className="h-5 w-5 text-gray-700" />
                        <span className="font-medium text-gray-700">Volver</span>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                    <div className="flex items-center text-gray-500">
                                        <MapPin className="h-5 w-5 mr-1" />
                                        <span className="text-lg">{property.location.address}, {property.location.district}, {property.location.city}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-urbania-primary">
                                        {property.currency === 'USD' ? '$' : 'S/'} {property.price.toLocaleString()}
                                    </p>
                                    <span className="inline-block bg-urbania-accent text-urbania-primary px-3 py-1 rounded-full text-sm font-bold uppercase mt-2">
                                        {property.type === 'sale' ? 'En Venta' : 'En Alquiler'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6 my-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center text-gray-400 mb-1">
                                        <Bed className="h-6 w-6" />
                                    </div>
                                    <span className="block font-bold text-xl text-gray-900">{property.features.bedrooms}</span>
                                    <span className="text-sm text-gray-500">Dormitorios</span>
                                </div>
                                <div className="text-center border-l border-r border-gray-100">
                                    <div className="flex items-center justify-center text-gray-400 mb-1">
                                        <Bath className="h-6 w-6" />
                                    </div>
                                    <span className="block font-bold text-xl text-gray-900">{property.features.bathrooms}</span>
                                    <span className="text-sm text-gray-500">Baños</span>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center text-gray-400 mb-1">
                                        <Square className="h-6 w-6" />
                                    </div>
                                    <span className="block font-bold text-xl text-gray-900">{property.features.area}</span>
                                    <span className="text-sm text-gray-500">m² Totales</span>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 overflow-hidden">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
                            <div className="h-[300px] w-full rounded-lg overflow-hidden z-0">
                                <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={position}>
                                        <Popup>
                                            {property.title}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contactar al Anunciante</h3>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary" defaultValue={`Hola, estoy interesado en ${property.title}...`}></textarea>
                                </div>

                                <button type="button" className="w-full bg-urbania-primary text-white font-bold py-3 rounded-md hover:bg-urbania-secondary transition-colors flex items-center justify-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Enviar Mensaje
                                </button>

                                <button type="button" className="w-full border-2 border-urbania-primary text-urbania-primary font-bold py-3 rounded-md hover:bg-urbania-gray transition-colors flex items-center justify-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Ver Teléfono
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ListingDetail;
