const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-white tracking-tighter">VESTA</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            La plataforma inmobiliaria del futuro. Encuentra tu hogar ideal con tecnología de punta.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Inmuebles</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Departamentos en venta</a></li>
                            <li><a href="#" className="hover:text-white">Casas en venta</a></li>
                            <li><a href="#" className="hover:text-white">Alquiler de departamentos</a></li>
                            <li><a href="#" className="hover:text-white">Proyectos nuevos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Empresa</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Quiénes somos</a></li>
                            <li><a href="#" className="hover:text-white">Trabaja con nosotros</a></li>
                            <li><a href="#" className="hover:text-white">Términos y condiciones</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contáctanos</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Ayuda y soporte</li>
                            <li>publicidad@urbaniaclone.com</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} VESTA. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
