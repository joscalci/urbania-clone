import { useState } from 'react';
import { usePropertyStore } from '../store/propertyStore';
import PropertyCard from '../components/PropertyCard';
import { Filter, Search as SearchIcon } from 'lucide-react';

const Search = () => {
    const { properties } = usePropertyStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    const filteredProperties = properties.filter((property) => {
        const matchesSearch = property.location.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || property.type === filterType;
        const matchesCategory = filterCategory === 'all' || property.category === filterCategory;

        return matchesSearch && matchesType && matchesCategory;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search Header */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por distrito, ciudad..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div>
                        <select
                            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="sale">Venta</option>
                            <option value="rent">Alquiler</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-urbania-primary focus:border-urbania-primary"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">Todas las categorías</option>
                            <option value="apartment">Departamento</option>
                            <option value="house">Casa</option>
                            <option value="office">Oficina</option>
                            <option value="land">Terreno</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    {filteredProperties.length} Propiedades encontradas
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                    <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No se encontraron propiedades con esos filtros.</p>
                </div>
            )}
        </div>
    );
};

export default Search;
