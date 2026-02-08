// import React from 'react';
import { Shield, Lock, FileText, Scale } from 'lucide-react';

const Legal = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-3xl mb-6">
                        <Shield className="h-8 w-8 text-vesta-accent" />
                    </div>
                    <h1 className="text-4xl font-black text-vesta-primary tracking-tighter mb-4">Información Legal</h1>
                    <p className="text-gray-400 font-medium">Términos, condiciones y privacidad de la plataforma VESTA por Arcon Inmobiliaria.</p>
                </header>

                <div className="space-y-16">
                    <div id="terms">
                        <LegalSection
                            icon={<FileText className="text-vesta-accent" />}
                            title="Términos y Condiciones de Uso"
                            content={[
                                "El acceso y uso de la plataforma VESTA implica la aceptación de estas condiciones.",
                                "VESTA es un portal publicitario y tecnológico. La responsabilidad de la veracidad de la información de los avisos recae en los anunciantes, aunque Arcon realiza auditorías de verificación.",
                                "Queda prohibida la reproducción total o parcial del contenido sin autorización expresa.",
                                "El servicio de Vision AI es una representación artística y no constituye una garantía estructural de la propiedad."
                            ]}
                        />
                    </div>

                    <div id="privacy">
                        <LegalSection
                            icon={<Lock className="text-vesta-accent" />}
                            title="Política de Privacidad"
                            content={[
                                "Tratamos tus datos con el fin de facilitar la conexión entre interesados y vendedores.",
                                "Puedes ejercer tus derechos de acceso, rectificación y cancelación en cualquier momento desde tu perfil o contactando a nuestro equipo.",
                                "Utilizamos cookies para mejorar tu experiencia de búsqueda y ofrecerte recomendaciones inteligentes basadas en tus gustos."
                            ]}
                        />
                    </div>

                    <div id="claims">
                        <LegalSection
                            icon={<Scale className="text-vesta-accent" />}
                            title="Libro de Reclamaciones"
                            content={[
                                "Cumpliendo con la normativa vigente, ponemos a tu disposición nuestro Libro de Reclamaciones virtual.",
                                "Cualquier queja o reclamo será atendido por el área legal de Arcon Inmobiliaria en un plazo máximo de 15 días hábiles."
                            ]}
                        />
                    </div>
                </div>

                <footer className="mt-20 pt-10 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-sm font-medium">Última actualización: Enero 2026</p>
                </footer>
            </div>
        </div>
    );
};

const LegalSection = ({ icon, title, content }: any) => (
    <section className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                {icon}
            </div>
            <h2 className="text-2xl font-black text-vesta-primary tracking-tight italic">{title}</h2>
        </div>
        <div className="space-y-4">
            {content.map((item: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start">
                    <div className="min-w-[6px] h-[6px] bg-vesta-accent rounded-full mt-2"></div>
                    <p className="text-gray-500 font-medium leading-relaxed">{item}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Legal;
