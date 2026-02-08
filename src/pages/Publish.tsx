import { useForm } from 'react-hook-form';
import { geocode } from '../utils/geocode';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { Property } from '../types';
import { Upload, DollarSign, Home, Layout } from 'lucide-react';

const Publish = () => {
    const { user } = useAuthStore();
    const { addProperty } = usePropertyStore();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Partial<Property>>();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Inicia sesión para publicar</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-vesta-accent text-white px-6 py-2 rounded-md hover:bg-vesta-secondary"
                >
                    Ir al Login
                </button>
            </div>
        );
    }

    const onSubmit = async (data: any) => {
        // Build full address string for geocoding
        const fullAddress = `${data.location.address}, ${data.location.district}, ${data.location.city}`;
        let lat = undefined;
        let lng = undefined;
        try {
            const coords = await geocode(fullAddress);
            lat = coords.lat;
            lng = coords.lng;
        } catch (e) {
            console.error('Geocoding failed:', e);
        }
        const newProperty: Property = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            price: Number(data.price),
            currency: data.currency,
            type: data.type,
            category: data.category,
            location: {
                address: data.location.address,
                city: data.location.city,
                district: data.location.district,
                lat,
                lng,
            },
            features: {
                bedrooms: Number(data.features.bedrooms),
                bathrooms: Number(data.features.bathrooms),
                area: Number(data.features.area),
                parking: Number(data.features.parking),
            },
            images: [
                'https://images.unsplash.com/photo-1600596542815-27b88e54e627?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
                ...data.imageUrls ? [data.imageUrls] : [],
            ],
            publisherId: user.id,
            createdAt: new Date().toISOString(),
            status: 'pending',
            plan: localStorage.getItem('selectedPlan') as any || 'free',
            isVerified: false
        };

        addProperty(newProperty);
        navigate('/dashboard');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Publicar Propiedad</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                        <Home className="h-5 w-5 text-vesta-accent" /> Información Básica
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Título del Anuncio</label>
                            <input
                                {...register('title', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                                placeholder="Ej: Lindo departamento en Miraflores"
                            />
                            {errors.title && <span className="text-red-500 text-xs">Requerido</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de Operación</label>
                            <select {...register('type')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border">
                                <option value="sale">Venta</option>
                                <option value="rent">Alquiler</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de Inmueble</label>
                            <select {...register('category')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border">
                                <option value="apartment">Departamento</option>
                                <option value="house">Casa</option>
                                <option value="office">Oficina</option>
                                <option value="land">Terreno</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                {...register('description', { required: true })}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>
                    </div>
                </div>

                {/* Price & Location */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                        <DollarSign className="h-5 w-5 text-vesta-accent" /> Precio y Ubicación
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Moneda</label>
                            <select {...register('currency')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border">
                                <option value="USD">Dólares (USD)</option>
                                <option value="PEN">Soles (PEN)</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Precio</label>
                            <input
                                type="number"
                                {...register('price', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>

                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                {...register('location.address', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Distrito</label>
                            <input
                                {...register('location.district', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                            <input
                                {...register('location.city', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                                defaultValue="Lima"
                            />
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                        <Layout className="h-5 w-5 text-vesta-accent" /> Características
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dormitorios</label>
                            <input
                                type="number"
                                {...register('features.bedrooms', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Baños</label>
                            <input
                                type="number"
                                {...register('features.bathrooms', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Área (m²)</label>
                            <input
                                type="number"
                                {...register('features.area', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estacionamientos</label>
                            <input
                                type="number"
                                {...register('features.parking')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vesta-accent focus:ring-vesta-accent p-2 border"
                            />
                        </div>
                    </div>
                </div>

                {/* Images (Simulated) */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                        <Upload className="h-5 w-5 text-vesta-accent" /> Imágenes
                    </h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-vesta-accent transition-colors cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            Arrastra tus fotos aquí o haz clic para seleccionar (Simulado)
                        </p>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-vesta-accent text-white font-bold py-4 rounded-lg hover:bg-vesta-secondary transition-colors shadow-lg"
                    >
                        Publicar Aviso
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Publish;
