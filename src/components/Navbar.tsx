import { Link } from 'react-router-dom';
import { Home, User, PlusCircle, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    return (
        <nav className="bg-urbania-primary text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Home className="h-8 w-8 text-urbania-accent" />
                        <span className="text-2xl font-bold tracking-tight">VESTA</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/search" className="hover:text-urbania-accent transition-colors">Comprar</Link>
                        <Link to="/search" className="hover:text-urbania-accent transition-colors">Alquilar</Link>
                        <Link to="/projects" className="hover:text-urbania-accent transition-colors">Proyectos</Link>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/publish"
                            className="flex items-center space-x-1 bg-urbania-accent text-urbania-primary px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                        >
                            <PlusCircle className="h-5 w-5" />
                            <span>Publicar</span>
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium">Hola, {user.name}</span>
                                <button
                                    onClick={() => logout()}
                                    className="text-sm hover:text-urbania-accent underline"
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-1 hover:text-urbania-accent transition-colors"
                            >
                                <User className="h-6 w-6" />
                                <span>Ingresar</span>
                            </Link>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <Link to="/" className="text-2xl font-bold text-urbania-primary tracking-tighter flex items-center gap-2">
                            <Home className="h-8 w-8" />
                            VESTA
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="p-2 hover:bg-urbania-secondary rounded-md">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
