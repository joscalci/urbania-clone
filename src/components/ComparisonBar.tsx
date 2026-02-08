import { motion } from 'framer-motion';
import { Scale, X, ChevronRight, LayoutList } from 'lucide-react';
import { useComparisonStore } from '../store/comparisonStore';
import { useNavigate } from 'react-router-dom';

const ComparisonBar = () => {
    const { compareList, removeFromCompare, clearCompare } = useComparisonStore();
    const navigate = useNavigate();

    if (compareList.length === 0) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[55] w-full max-w-4xl px-4">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-vesta-primary rounded-[32px] shadow-2xl border border-white/10 p-4 md:p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
                    <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10">
                        <Scale className="h-6 w-6 text-vesta-accent mb-1" />
                        <span className="text-[10px] text-white font-black uppercase tracking-tighter">Comparar</span>
                        <span className="text-xs text-vesta-accent font-black">{compareList.length}/3</span>
                    </div>

                    <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>

                    {compareList.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative group shrink-0"
                        >
                            <img
                                src={p.images[0]}
                                alt={p.title}
                                className="w-16 h-16 rounded-xl object-cover border-2 border-white/20 group-hover:border-vesta-accent transition-all"
                            />
                            <button
                                onClick={() => removeFromCompare(p.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            <div className="absolute -bottom-1 left-1 bg-white/90 text-vesta-primary text-[8px] font-black px-1 rounded truncate max-w-[50px]">
                                {p.currency === 'USD' ? '$' : 'S/'}{p.price.toLocaleString()}
                            </div>
                        </motion.div>
                    ))}

                    {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
                        <div key={i} className="w-16 h-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/10">
                            <LayoutList className="h-6 w-6" />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={clearCompare}
                        className="text-gray-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors hidden md:block"
                    >
                        Limpiar
                    </button>
                    <button
                        onClick={() => navigate('/compare')}
                        disabled={compareList.length < 2}
                        className={`flex-grow md:flex-none px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${compareList.length >= 2
                            ? 'bg-vesta-accent text-white hover:bg-blue-700'
                            : 'bg-white/5 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {compareList.length < 2 ? 'Agrega otra' : 'Comparar ahora'}
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ComparisonBar;
