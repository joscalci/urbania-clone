import { useNavigate } from 'react-router-dom';
import { useComparisonStore } from '../store/comparisonStore';
import { ChevronLeft, X, Minus, MapPin, Bed, Bath, Square } from 'lucide-react';

const Compare = () => {
    const { compareList, removeFromCompare, clearCompare } = useComparisonStore();
    const navigate = useNavigate();

    if (compareList.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h2 className="text-3xl font-black text-vesta-primary mb-6">No hay propiedades para comparar</h2>
                <button
                    onClick={() => navigate('/search')}
                    className="bg-vesta-accent text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all"
                >
                    Ir a buscar propiedades
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-black text-gray-500 hover:text-vesta-accent transition-colors w-fit"
                    >
                        <ChevronLeft className="h-4 w-4" /> Volver
                    </button>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black text-vesta-primary tracking-tighter">Comparador de Propiedades</h1>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Analiza tus opciones favoritas lado a lado</p>
                    </div>
                    <button
                        onClick={clearCompare}
                        className="text-red-500 hover:text-red-700 text-xs font-black uppercase tracking-widest transition-colors"
                    >
                        Limpiar todo
                    </button>
                </div>

                <div className="overflow-x-auto pb-8 no-scrollbar">
                    <div className="min-w-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="p-8 w-1/4 bg-gray-50/50"></th>
                                    {compareList.map(p => (
                                        <th key={p.id} className="p-8 w-1/4 border-l border-gray-50 relative group">
                                            <button
                                                onClick={() => removeFromCompare(p.id)}
                                                className="absolute top-4 right-4 bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="space-y-4">
                                                <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover rounded-2xl shadow-sm" />
                                                <div>
                                                    <h3 className="font-black text-vesta-primary leading-tight line-clamp-2 min-h-[3rem]">{p.title}</h3>
                                                    <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                                                        <MapPin className="h-3 w-3 mr-1 text-vesta-accent" /> {p.location.district}
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                    {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
                                        <th key={`empty-${i}`} className="p-8 w-1/4 border-l border-gray-50 bg-gray-50/10">
                                            <div className="border-2 border-dashed border-gray-100 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-300">
                                                <button
                                                    onClick={() => navigate('/search')}
                                                    className="p-4 bg-white rounded-full shadow-sm hover:scale-110 transition-transform mb-4"
                                                >
                                                    <X className="h-6 w-6 rotate-45" />
                                                </button>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Agregar otra</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm font-bold text-vesta-primary">
                                <ComparisonRow label="Precio" values={compareList.map(p => `${p.currency === 'USD' ? '$' : 'S/'} ${p.price.toLocaleString()}`)} isHighlight />
                                <ComparisonRow label="Tipo" values={compareList.map(p => p.category === 'apartment' ? 'Departamento' : 'Casa')} />
                                <ComparisonRow label="Operación" values={compareList.map(p => p.type === 'sale' ? 'Venta' : 'Alquiler')} />
                                <ComparisonRow label="Dormitorios" values={compareList.map(p => `${p.features.bedrooms}`)} icon={<Bed className="h-4 w-4" />} />
                                <ComparisonRow label="Baños" values={compareList.map(p => `${p.features.bathrooms}`)} icon={<Bath className="h-4 w-4" />} />
                                <ComparisonRow label="Área" values={compareList.map(p => `${p.features.area} m²`)} icon={<Square className="h-4 w-4" />} />
                                <ComparisonRow label="Estacionamiento" values={compareList.map(p => p.features.parking ? `${p.features.parking}` : 'No')} />
                                <tr>
                                    <td className="p-8 bg-gray-50/50"></td>
                                    {compareList.map(p => (
                                        <td key={`cta-${p.id}`} className="p-8 border-l border-gray-50">
                                            <button
                                                onClick={() => navigate(`/listing/${p.id}`)}
                                                className="w-full bg-vesta-accent text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                            >
                                                Ver Detalle
                                            </button>
                                        </td>
                                    ))}
                                    {compareList.length < 3 && <td colSpan={3 - compareList.length}></td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ComparisonRow = ({ label, values, isHighlight, icon }: { label: string, values: string[], isHighlight?: boolean, icon?: React.ReactNode }) => (
    <tr className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
        <td className="p-8 bg-gray-50/50">
            <div className="flex items-center gap-2">
                {icon && <span className="text-gray-300">{icon}</span>}
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
            </div>
        </td>
        {values.map((v, i) => (
            <td key={i} className={`p-8 border-l border-gray-50 ${isHighlight ? 'text-xl font-black text-vesta-accent' : ''}`}>
                {v}
            </td>
        ))}
        {values.length < 3 && Array.from({ length: 3 - values.length }).map((_, i) => (
            <td key={`empty-${i}`} className="p-8 border-l border-gray-50 text-gray-200">
                <Minus className="h-4 w-4" />
            </td>
        ))}
    </tr>
);

export default Compare;
