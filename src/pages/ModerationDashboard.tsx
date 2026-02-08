import { usePropertyStore } from '../store/propertyStore';
import { ShieldCheck, X, Check, AlertTriangle, Eye } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ModerationDashboard = () => {
    const { user } = useAuthStore();
    const { properties, updatePropertyStatus, verifyProperty } = usePropertyStore();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const reportedProperties = properties.filter(p => p.status === 'reported');
    const pendingProperties = properties.filter(p => p.status === 'pending');

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-vesta-primary tracking-tighter">Panel de Moderación</h1>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Control de Calidad y Verificación de VESTA</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <span className="text-xs font-black text-gray-400 uppercase">Pendientes</span>
                            <span className="text-xl font-black text-vesta-primary">{pendingProperties.length}</span>
                        </div>
                        <div className="bg-red-50 border border-red-100 px-6 py-3 rounded-2xl flex items-center gap-3">
                            <span className="text-xs font-black text-red-400 uppercase italic">Reportados</span>
                            <span className="text-xl font-black text-red-600">{reportedProperties.length}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Reported Feed */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-vesta-primary flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" /> Avisos Reportados
                        </h2>
                        {reportedProperties.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold">No hay avisos con reportes pendientes.</p>
                            </div>
                        ) : (
                            reportedProperties.map(p => (
                                <ModerationCard
                                    key={p.id}
                                    property={p}
                                    onApprove={() => updatePropertyStatus(p.id, 'verified')}
                                    onReject={() => updatePropertyStatus(p.id, 'rejected')}
                                    isReported
                                />
                            ))
                        )}
                    </div>

                    {/* Pending Verification */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-vesta-primary flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-500" /> Pendientes de Verificación
                        </h2>
                        {pendingProperties.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold">No hay avisos pendientes de verificación.</p>
                            </div>
                        ) : (
                            pendingProperties.map(p => (
                                <ModerationCard
                                    key={p.id}
                                    property={p}
                                    onApprove={() => verifyProperty(p.id, true)}
                                    onReject={() => updatePropertyStatus(p.id, 'rejected')}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModerationCard = ({ property, onApprove, onReject, isReported }: { property: any, onApprove: () => void, onReject: () => void, isReported?: boolean }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-6 group hover:shadow-xl transition-all duration-500">
        <div className="relative shrink-0">
            <img src={property.images[0]} className="w-24 h-24 rounded-2xl object-cover" alt="" />
            {isReported && (
                <div className="absolute -top-2 -left-2 bg-red-500 text-white p-1.5 rounded-full">
                    <AlertTriangle className="h-3 w-3" />
                </div>
            )}
        </div>

        <div className="flex-grow">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h4 className="font-black text-vesta-primary text-sm leading-tight group-hover:text-vesta-accent transition-colors">{property.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PLAN: {property.plan}</p>
                </div>
                <Link to={`/listing/${property.id}`} className="p-2 text-gray-300 hover:text-vesta-accent transition-colors">
                    <Eye className="h-4 w-4" />
                </Link>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={onApprove}
                    className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-1"
                >
                    <Check className="h-3 w-3" /> {isReported ? 'Mantener' : 'Verificar'}
                </button>
                <button
                    onClick={onReject}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-1"
                >
                    <X className="h-3 w-3" /> {isReported ? 'Eliminar' : 'Rechazar'}
                </button>
            </div>
        </div>
    </div>
);

export default ModerationDashboard;
