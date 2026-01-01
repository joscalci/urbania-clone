import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <Link to={`/property/${property.id}`} className="block group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-urbania-accent text-urbania-primary px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                        {property.type === 'sale' ? 'Venta' : 'Alquiler'}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-bold text-xl">
                            {property.currency === 'USD' ? '$' : 'S/'} {property.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-urbania-primary transition-colors">
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
