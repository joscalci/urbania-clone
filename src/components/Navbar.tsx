import { Link } from 'react-router-dom';
import { User, Menu, ShieldAlert, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    return (
        <nav className="bg-white text-vesta-primary border-b border-gray-100 fixed w-full top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-40">
                    {/* Logo & Navigation */}
                    <div className="flex items-center space-x-12">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group relative">
                            <img
                                src="/logo.png"
                                alt="Vesta Logo"
                                className="h-32 md:h-40 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8 text-[15px] font-medium tracking-tight">
                            <Link to="/search" className="hover:text-vesta-trust transition-colors flex items-center gap-1">
                                Comprar
                            </Link>
                            <Link to="/search" className="hover:text-vesta-trust transition-colors">Alquilar</Link>
                            <Link to="/search" className="hover:text-vesta-trust transition-colors">Proyectos</Link>

                            {/* Servicios Dropdown */}
                            <div className="relative group/dropdown">
                                <button className="hover:text-vesta-trust transition-colors flex items-center gap-1 py-4">
                                    Servicios
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-xl border border-gray-100 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-2 group-hover/dropdown:translate-y-0 p-2">
                                    <Link to="/plans" className="block px-4 py-2 text-gray-600 hover:text-vesta-primary hover:bg-gray-50 rounded-lg transition-colors">
                                        Planes y Precios
                                    </Link>
                                    <Link to="#" className="block px-4 py-2 text-gray-600 hover:text-vesta-primary hover:bg-gray-50 rounded-lg transition-colors">
                                        Créditos Hipotecarios
                                    </Link>
                                    <Link to="#" className="block px-4 py-2 text-gray-600 hover:text-vesta-primary hover:bg-gray-50 rounded-lg transition-colors">
                                        Asesoría Legal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link to="#" className="text-[14px] font-medium hover:text-vesta-trust flex items-center gap-2">
                            Mis contactos
                        </Link>

                        {/* Admin Moderation Link - Only for Admins */}
                        {user?.role === 'admin' && (
                            <Link to="/moderation" className="relative p-2 text-gray-500 hover:text-vesta-trust transition-colors group">
                                <ShieldAlert className="h-5 w-5" />
                                <ModerationBadge />
                            </Link>
                        )}

                        <Link
                            to="/publish-landing"
                            className="vesta-btn"
                        >
                            Publicar
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400">Hola,</span>
                                    <span className="text-sm font-bold">{user.name}</span>
                                </div>
                                <button
                                    onClick={() => logout()}
                                    className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"
                                >
                                    <User className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 text-sm font-bold hover:text-vesta-trust transition-all border border-gray-200 px-5 py-2.5 rounded-full hover:border-vesta-trust"
                            >
                                <User className="h-5 w-5" />
                                <span>Ingresar</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-4">
                        {!user && (
                            <Link to="/login" className="text-vesta-primary">
                                <User className="h-6 w-6" />
                            </Link>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const ModerationBadge = () => {
    const { getPendingCount } = usePropertyStore();
    const count = getPendingCount();

    if (count === 0) return null;

    return (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            {count}
        </span>
    );
};

export default Navbar;
