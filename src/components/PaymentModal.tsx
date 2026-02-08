import { useState } from 'react';
import { Shield } from 'lucide-react';
import { usePlanStore } from '../store/planStore';
import { useNavigate } from 'react-router-dom';

type PaymentModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const { setPaid } = usePlanStore();
    const navigate = useNavigate();

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulación de pago exitoso
        setPaid(true);
        onClose();
        navigate('/publish');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
                <div className="text-center mb-6">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Pago Seguro</h2>
                    <p className="text-gray-500">Completa los datos de tu tarjeta para activar el plan.</p>
                </div>
                <form className="space-y-4" onSubmit={handlePay}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vesta-accent outline-none"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiración</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vesta-accent outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                            <input
                                type="text"
                                placeholder="123"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vesta-accent outline-none"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-vesta-accent text-white py-3 rounded-xl font-bold hover:bg-vesta-secondary transition-colors"
                    >
                        Pagar
                    </button>
                </form>
                <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" /> Pagos encriptados y seguros
                </p>
            </div>
        </div>
    );
};
