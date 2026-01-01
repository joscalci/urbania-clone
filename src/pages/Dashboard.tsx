import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { PlusCircle, Trash2, Edit, MapPin, Bed, Bath, Square } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuthStore();
    const { getUserProperties, removeProperty } = usePropertyStore();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión para ver tus propiedades</h2>
                <Link to="/login" className="text-urbania-primary hover:underline">Ir al login</Link>
            </div>
        );
    }

    const myProperties = getUserProperties(user.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Mis Propiedades</h1>
                <Link
                    to="/publish"
                    className="flex items-center space-x-2 bg-urbania-primary text-white px-6 py-3 rounded-lg hover:bg-urbania-secondary transition-colors"
                >
                    <PlusCircle className="h-5 w-5" />
                    <span>Nueva Propiedad</span>
                </Link>
            </div>

            {myProperties.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-lg mb-4">Aún no has publicado ninguna propiedad.</p>
                    <Link to="/publish" className="text-urbania-primary font-semibold hover:underline">
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
                                <div className="absolute top-4 left-4 bg-urbania-accent text-urbania-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {property.type === 'sale' ? 'Venta' : 'Alquiler'}
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                                    <p className="text-lg font-bold text-urbania-primary">
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
                                    <button className="p-2 text-gray-500 hover:text-urbania-primary hover:bg-gray-100 rounded-full transition-colors">
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
