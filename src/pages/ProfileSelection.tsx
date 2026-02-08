import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, Construction, ChevronLeft } from 'lucide-react';

const ProfileSelection = () => {
    return (
        <div className="bg-white min-h-screen pt-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/publish-landing" className="inline-flex items-center gap-2 text-gray-500 hover:text-vesta-primary mb-12 transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                    Atrás
                </Link>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-vesta-primary mb-4">
                        ¿Con qué perfil <span className="text-vesta-accent">te identificás?</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Seleccioná el que se ajusta a tus intereses.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProfileCard
                        icon={<User className="h-12 w-12 text-vesta-accent" />}
                        title="Particular"
                        subtitle="Dueño Directo"
                        to="/publish"
                    />
                    <ProfileCard
                        icon={<Building2 className="h-12 w-12 text-vesta-accent" />}
                        title="Inmobiliaria"
                        subtitle="Corredor"
                        to="/publish"
                    />
                    <ProfileCard
                        icon={<Construction className="h-12 w-12 text-vesta-accent" />}
                        title="Constructora"
                        subtitle="Desarrolladora"
                        to="/publish"
                    />
                </div>
            </div>
        </div>
    );
};

const ProfileCard = ({ icon, title, subtitle, to }: { icon: React.ReactNode, title: string, subtitle: string, to: string }) => (
    <Link to={to} className="group p-10 border-2 border-gray-100 rounded-3xl text-center hover:border-vesta-accent hover:shadow-2xl hover:shadow-blue-50 transition-all">
        <div className="bg-gray-50 p-6 rounded-2xl w-fit mx-auto mb-8 group-hover:bg-vesta-accent group-hover:text-white transition-all">
            {icon}
        </div>
        <h3 className="text-xl font-black text-vesta-primary mb-2">{title}</h3>
        <p className="text-gray-500 font-medium">{subtitle}</p>
    </Link>
);

export default ProfileSelection;
