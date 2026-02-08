import { useState, useMemo, useEffect } from 'react';
import { usePropertyStore } from '../store/propertyStore';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Filter, Search as SearchIcon, Map as MapIcon, List as ListIcon, X, Navigation } from 'lucide-react';
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

const Search = () => {
    const { getApprovedProperties } = usePropertyStore();
    const approvedProperties = getApprovedProperties();
    const [searchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState('');
    const [userCoords, setUserCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [isNearbyActive, setIsNearbyActive] = useState(false);

    // Initialize filters from URL params
    const [filterType, setFilterType] = useState(searchParams.get('type') || 'all');
    const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || 'all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Sync state when URL params change
    useEffect(() => {
        const type = searchParams.get('type');
        const category = searchParams.get('category');
        const district = searchParams.get('district');

        if (type) setFilterType(type);
        if (category) setFilterCategory(category);
        if (district) setSearchTerm(district);
    }, [searchParams]);
    const [viewMode, setViewMode] = useState<'list' | 'split'>('list');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const filteredProperties = useMemo(() => {
        return approvedProperties.filter((property) => {
            const matchesSearch = property.location.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.title.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filterType === 'all' || property.type === filterType;
            const matchesCategory = filterCategory === 'all' || property.category === filterCategory;

            const price = property.price;
            const matchesMinPrice = minPrice === '' || price >= Number(minPrice);
            const matchesMaxPrice = maxPrice === '' || price <= Number(maxPrice);

            // Nearby Filter (within 5km of user)
            const matchesNearby = !isNearbyActive || !userCoords || (
                property.location.lat && property.location.lng &&
                calculateDistance(userCoords.lat, userCoords.lng, property.location.lat, property.location.lng) <= 5
            );

            return matchesSearch && matchesType && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesNearby;
        });
    }, [approvedProperties, searchTerm, filterType, filterCategory, minPrice, maxPrice, isNearbyActive, userCoords]);

    const handleNearby = () => {
        if (!isNearbyActive) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setUserCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
                    setIsNearbyActive(true);
                }, (error) => {
                    console.error("Error getting location:", error);
                    alert("No pudimos obtener tu ubicación.");
                });
            } else {
                alert("Tu navegador no soporta geolocalización.");
            }
        } else {
            setIsNearbyActive(false);
            setUserCoords(null);
        }
    };

    const center: [number, number] = [-12.1211, -77.0293]; // Lima Miraflores center

    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)] mt-20">
            {/* Search Header */}
            <div className="bg-white border-b border-gray-100 p-4 sticky top-20 z-40">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex-grow relative min-w-[300px]">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por distrito, ciudad..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent transition-all text-sm font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleNearby}
                            className={`py-3 px-6 flex items-center gap-2 rounded-2xl text-sm font-bold transition-all ${isNearbyActive ? 'bg-vesta-accent text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                        >
                            <Navigation className={`h-4 w-4 ${isNearbyActive ? 'animate-pulse' : ''}`} />
                            Cerca de mí
                        </button>

                        <select
                            className="py-3 px-6 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent text-sm font-bold appearance-none cursor-pointer"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">Operación</option>
                            <option value="sale">Venta</option>
                            <option value="rent">Alquiler</option>
                        </select>

                        <select
                            className="py-3 px-6 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-vesta-accent text-sm font-bold appearance-none cursor-pointer"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">Tipo de Inmueble</option>
                            <option value="apartment">Departamento</option>
                            <option value="house">Casa</option>
                            <option value="office">Oficina</option>
                            <option value="land">Terreno</option>
                        </select>

                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={`py-3 px-6 flex items-center gap-2 rounded-2xl text-sm font-bold transition-all ${showAdvanced ? 'bg-vesta-accent text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                        >
                            <Filter className="h-4 w-4" />
                            Filtros
                        </button>

                        <div className="hidden lg:flex items-center bg-gray-50 p-1 rounded-2xl ml-auto">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-vesta-accent' : 'text-gray-400'}`}
                            >
                                <ListIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('split')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'split' ? 'bg-white shadow-sm text-vesta-accent' : 'text-gray-400'}`}
                            >
                                <MapIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters Dropdown */}
                    {showAdvanced && (
                        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Precio Mínimo</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-vesta-accent text-sm font-medium"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Precio Máximo</label>
                                <input
                                    type="number"
                                    placeholder="Sin límite"
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-vesta-accent text-sm font-medium"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2 flex items-end">
                                <button
                                    onClick={() => {
                                        setMinPrice('');
                                        setMaxPrice('');
                                        setSearchTerm('');
                                        setFilterType('all');
                                        setFilterCategory('all');
                                    }}
                                    className="text-xs font-bold text-gray-400 hover:text-vesta-accent transition-colors flex items-center gap-1 mb-4"
                                >
                                    <X className="h-3 w-3" /> Limpiar todos los filtros
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`flex-grow flex ${viewMode === 'split' ? 'h-[calc(100vh-210px)] overflow-hidden' : ''}`}>
                {/* Results List */}
                <div className={`${viewMode === 'split' ? 'w-1/2 overflow-y-auto' : 'w-full'} p-6`}>
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-vesta-primary">
                                {filteredProperties.length} Propiedades encontradas
                            </h2>
                        </div>

                        <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        {filteredProperties.length === 0 && (
                            <div className="text-center py-24 bg-gray-50 rounded-3xl mt-8">
                                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Filter className="h-10 w-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-vesta-primary mb-2">Sin resultados</h3>
                                <p className="text-gray-500">Prueba ajustando tus filtros de búsqueda.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Integration */}
                {viewMode === 'split' && (
                    <div className="w-1/2 border-l border-gray-100">
                        <div className="h-full w-full grayscale-[20%]">
                            <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {filteredProperties.map((property) => (
                                    <Marker
                                        key={property.id}
                                        position={[property.location.lat || -12.1211, property.location.lng || -77.0293]}
                                    >
                                        <Popup>
                                            <div className="w-48 overflow-hidden rounded-xl">
                                                <img src={property.images[0]} alt={property.title} className="w-full h-24 object-cover" />
                                                <div className="p-2">
                                                    <div className="font-bold text-sm truncate">{property.title}</div>
                                                    <div className="text-vesta-accent font-black">{property.currency} {property.price.toLocaleString()}</div>
                                                    <Link
                                                        to={`/listing/${property.id}`}
                                                        className="text-[10px] font-black uppercase text-gray-400 mt-1 inline-block hover:text-vesta-accent"
                                                    >
                                                        Ver detalle
                                                    </Link>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Add Link import if missing (it's used in Popup)
import { Link } from 'react-router-dom';

export default Search;
