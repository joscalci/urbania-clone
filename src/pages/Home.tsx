import { Search } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <div className="relative bg-urbania-primary h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>

                <div className="relative z-10 w-full max-w-4xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Encuentra tu lugar ideal
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        Miles de propiedades en venta y alquiler te están esperando.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <input
                                type="text"
                                placeholder="¿Dónde quieres vivir?"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-urbania-primary"
                            />
                        </div>
                        <button className="bg-urbania-accent text-urbania-primary font-bold py-3 px-8 rounded-md hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                            <Search className="h-5 w-5" />
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Section Placeholder */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Propiedades Destacadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
