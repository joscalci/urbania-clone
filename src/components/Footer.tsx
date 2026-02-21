import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-vesta-primary pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src="/logo.png"
                                alt="Vesta Logo"
                                className="h-40 w-auto object-contain bg-white rounded-md"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Vesta es la plataforma tecnológica de Arcon Inmobiliaria. Con más de 10 años de experiencia, ofrecemos los estándares más altos en el mercado inmobiliario peruano.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <a href="https://www.facebook.com/arconinmobiliara" target="_blank" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-vesta-trust hover:text-white transition-colors cursor-pointer">
                                <span className="font-bold">f</span>
                            </a>
                            <a href="https://www.instagram.com/arconinmobiliarialatam" target="_blank" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-vesta-trust hover:text-white transition-colors cursor-pointer">
                                <span className="font-bold">ig</span>
                            </a>
                            <a href="https://www.linkedin.com/company/arcon-ingenier%C3%ADa-y-construcci%C3%B3n/" target="_blank" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-vesta-trust hover:text-white transition-colors cursor-pointer">
                                <span className="font-bold">in</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Inmuebles</h4>
                        <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
                            <li><Link to="/search?category=apartment&type=sale" className="hover:text-vesta-trust transition-colors">Departamentos en venta</Link></li>
                            <li><Link to="/search?category=house&type=sale" className="hover:text-vesta-trust transition-colors">Casas en venta</Link></li>
                            <li><Link to="/search?category=apartment&type=rent" className="hover:text-vesta-trust transition-colors">Alquiler de departamentos</Link></li>
                            <li><Link to="/search?category=projects" className="hover:text-vesta-trust transition-colors">Proyectos nuevos</Link></li>
                            <li><Link to="/search?category=office" className="hover:text-vesta-trust transition-colors">Locales comerciales</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Empresa</h4>
                        <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
                            <li><Link to="/about" className="hover:text-vesta-trust transition-colors">Quiénes somos</Link></li>
                            <li><Link to="/help" className="hover:text-vesta-trust transition-colors">Ayuda y soporte</Link></li>
                            <li><Link to="/search?category=projects" className="hover:text-vesta-trust transition-colors">Blog de noticias</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">Legal</h4>
                        <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
                            <li><Link to="/legal" className="hover:text-vesta-trust transition-colors">Términos y condiciones</Link></li>
                            <li><Link to="/legal" className="hover:text-vesta-trust transition-colors">Política de privacidad</Link></li>
                            <li><Link to="/legal" className="hover:text-vesta-trust transition-colors">Libro de reclamaciones</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Sub-footer Links (Urbania style) */}
                <div className="border-t border-gray-100 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div>
                        <h5 className="text-[13px] font-bold mb-4">Ciudades Principales</h5>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-gray-400">
                            <a href="#" className="hover:text-vesta-trust">Lima</a>
                            <a href="#" className="hover:text-vesta-trust">Arequipa</a>
                            <a href="#" className="hover:text-vesta-trust">Trujillo</a>
                            <a href="#" className="hover:text-vesta-trust">Callao</a>
                            <a href="#" className="hover:text-vesta-trust">Cusco</a>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-[13px] font-bold mb-4">Búsquedas populares</h5>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-gray-400">
                            <Link to="/search?district=Miraflores" className="hover:text-vesta-trust">Departamentos en Miraflores</Link>
                            <Link to="/search?district=La Molina" className="hover:text-vesta-trust">Casas en La Molina</Link>
                            <Link to="/search?district=San Isidro" className="hover:text-vesta-trust">Alquiler en San Isidro</Link>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-[13px] font-bold mb-4">Ponte en contacto</h5>
                        <div className="text-[12px] text-gray-400 leading-relaxed">
                            <p>Ventas: +51 999 536 753</p>
                            <p>Oficina: Calle Madre de Dios 328, La Molina</p>
                            <p>Email: info@arconinmobiliaria.com</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 text-[12px] text-gray-400 font-medium">
                    <p>&copy; {new Date().getFullYear()} VESTA. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span>Hecho con ❤️ para el mercado inmobiliario</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
