import { useState, useMemo } from 'react';
import { Calculator, Percent, Calendar, ChevronRight } from 'lucide-react';

interface MortgageCalculatorProps {
    price: number;
    currency: string;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ price, currency }) => {
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(7.5);
    const [years, setYears] = useState(20);

    const calculation = useMemo(() => {
        const principal = price * (1 - downPaymentPercent / 100);
        const monthlyRate = (interestRate / 100) / 12;
        const numberOfPayments = years * 12;

        const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return {
            monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
            totalInterest: (monthlyPayment * numberOfPayments) - principal,
            loanAmount: principal
        };
    }, [price, downPaymentPercent, interestRate, years]);

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-vesta-accent/10 p-3 rounded-2xl text-vesta-accent">
                    <Calculator className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-vesta-primary tracking-tight">Cálculo de Cuota</h3>
                    <p className="text-sm text-gray-400 font-medium">Proyecta tu inversión mensual</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-black text-vesta-primary uppercase tracking-wider flex items-center gap-2">
                                <Percent className="h-3 w-3 text-vesta-accent" /> Cuota Inicial ({downPaymentPercent}%)
                            </label>
                            <span className="text-sm font-bold text-gray-400">{currency} {(price * downPaymentPercent / 100).toLocaleString()}</span>
                        </div>
                        <input
                            type="range" min="5" max="90" step="5"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-vesta-accent"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-black text-vesta-primary uppercase tracking-wider flex items-center gap-2">
                                <Percent className="h-3 w-3 text-vesta-accent" /> Tasa Efectiva Anual
                            </label>
                            <span className="text-sm font-bold text-vesta-accent">{interestRate}%</span>
                        </div>
                        <input
                            type="range" min="3" max="15" step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-vesta-accent"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-black text-vesta-primary uppercase tracking-wider flex items-center gap-2">
                                <Calendar className="h-3 w-3 text-vesta-accent" /> Plazo del préstamo
                            </label>
                            <span className="text-sm font-bold text-vesta-accent">{years} años</span>
                        </div>
                        <div className="flex gap-2">
                            {[10, 15, 20, 30].map(y => (
                                <button
                                    key={y}
                                    onClick={() => setYears(y)}
                                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${years === y ? 'bg-vesta-primary text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                        }`}
                                >
                                    {y} Años
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                <div className="bg-vesta-primary rounded-3xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-vesta-accent/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-vesta-accent/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Cuota mensual estimada</p>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-2xl font-black text-vesta-accent">{currency}</span>
                            <span className="text-5xl font-black tracking-tight">{calculation.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-400">Total a prestar</span>
                                <span className="text-sm font-black">{currency} {calculation.loanAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-400">Intereses totales</span>
                                <span className="text-sm font-black">{currency} {calculation.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 bg-vesta-accent hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                            Pre-calificar ahora <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                * Valores referenciales basados en tasas promedio del mercado. <br />
                Sujeto a evaluación crediticia por Arcon Inmobiliaria.
            </p>
        </div>
    );
};

export default MortgageCalculator;
