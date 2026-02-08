import { MapPin, Bed, Bath, Square, Scale, ShieldCheck, Zap } from 'lucide-react';
import { Property } from '../types';
import { useComparisonStore } from '../store/comparisonStore';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const { addToCompare, removeFromCompare, isComparing } = useComparisonStore();
    const comparing = isComparing(property.id);

    const toggleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (comparing) {
            removeFromCompare(property.id);
        } else {
            addToCompare(property);
        }
    };

    return (
        <Link to={`/listing/${property.id}`} className="block group">
            <div className={`bg-white rounded-[32px] shadow-sm overflow-hidden border transition-all duration-500 transform hover:-translate-y-2 premium-card ${property.plan === 'premium' ? 'border-vesta-accent ring-2 ring-vesta-accent/20' : 'border-gray-100'
                }`}>
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Status & Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-md text-vesta-primary px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm tracking-widest">
                            {property.type === 'sale' ? 'Venta' : 'Alquiler'}
                        </div>
                        {property.plan !== 'free' && (
                            <div className="bg-vesta-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm tracking-widest flex items-center gap-1">
                                <Zap className="h-3 w-3 fill-white" /> {property.plan === 'premium' ? 'Super Destacado' : 'Destacado'}
                            </div>
                        )}
                    </div>

                    {property.isVerified && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-vesta-trust text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg flex items-center gap-1 animate-pulse">
                            <ShieldCheck className="h-3 w-3" /> Verificado
                        </div>
                    )}
                    <button
                        onClick={toggleCompare}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg ${comparing ? 'bg-vesta-accent text-white' : 'bg-white/80 text-vesta-primary hover:bg-white'
                            }`}
                        title="Comparar"
                    >
                        <Scale className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-bold text-xl">
                            {property.currency === 'USD' ? '$' : 'S/'} {property.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-vesta-trust transition-colors">
                        {property.title}
                    </h3>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{property.location.district}, {property.location.city}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
                        <div className="flex items-center" title="Dormitorios">
                            <Bed className="h-4 w-4 mr-1" /> {property.features.bedrooms}
                        </div>
                        <div className="flex items-center" title="Baños">
                            <Bath className="h-4 w-4 mr-1" /> {property.features.bathrooms}
                        </div>
                        <div className="flex items-center" title="Área">
                            <Square className="h-4 w-4 mr-1" /> {property.features.area} m²
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
