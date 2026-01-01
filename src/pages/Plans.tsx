import { useState } from 'react';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';

import { useNavigate } from 'react-router-dom';

const Plans = () => {
    const navigate = useNavigate();

    const [showPayment, setShowPayment] = useState(false);


    const plans = [
        {
            id: 'free',
            name: 'Básico',
            price: 'S/ 0',
            period: '/mes',
            icon: <Shield className="h-8 w-8 text-gray-400" />,
            features: ['1 Publicación', 'Fotos estándar', 'Soporte por email', 'Visibilidad básica'],
            buttonText: 'Empezar Gratis',
            recommended: false
        },
        {
            id: 'featured',
            name: 'Destacado',
            price: 'S/ 49',
            period: '/mes',
            icon: <Star className="h-8 w-8 text-yellow-400" />,
            features: ['5 Publicaciones', 'Fotos HD', 'Soporte prioritario', 'Etiqueta "Destacado"', 'Mayor visibilidad'],
            buttonText: 'Seleccionar Plan',
            recommended: true
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 'S/ 99',
            period: '/mes',
            icon: <Zap className="h-8 w-8 text-urbania-primary" />,
            features: ['Ilimitadas Publicaciones', 'Fotos 360° y Video', 'Asesor personal', 'Etiqueta "Premium"', 'Top de búsquedas', 'Estadísticas avanzadas'],
            buttonText: 'Ser Premium',
            recommended: false
        }
    ];


    const handleSelectPlan = (planId: string) => {
        // No need to store selected plan for now
        if (planId === 'free') {
            navigate('/publish');
        } else {
            setShowPayment(true);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Elige el plan perfecto para ti</h1>
                <p className="text-xl text-gray-600">Potencia tus ventas con nuestras herramientas exclusivas.</p>
                <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-transform hover:scale-105 ${plan.recommended ? 'border-urbania-primary' : 'border-transparent'}`}
                    >
                        {plan.recommended && (
                            <div className="absolute top-0 right-0 bg-urbania-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                MÁS POPULAR
                            </div>
                        )}
                        <div className="p-8">
                            <div className="flex justify-center mb-4">
                                {plan.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">{plan.name}</h3>
                            <div className="text-center mb-6">
                                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                <span className="text-gray-500">{plan.period}</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-600">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.recommended
                                    ? 'bg-urbania-primary text-white hover:bg-urbania-secondary'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Plans;
