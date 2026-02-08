// import React from 'react';

const LogoOptions = () => {
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Candidatos para Logo VESTA</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* OPCIÓN 1: SERIF - ELEGANTE (WeWork-ish) */}
                <div className="bg-white p-12 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-4">
                    <div className="text-center">
                        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
                        <h2 className="text-6xl text-[#1e3a8a] mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
                            VESTA
                        </h2>
                        <p className="text-gray-500 font-serif italic text-sm mt-4">Opción 1: Serif Elegante (Estilo WeWork / Editorial)</p>
                        <p className="text-xs text-gray-400">Tipografía: Playfair Display</p>
                    </div>
                </div>

                {/* OPCIÓN 2: SANS - MODERNO & GEOMÉTRICO (Urbania-ish) */}
                <div className="bg-white p-12 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-4">
                    <div className="text-center">
                        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet" />
                        <h2 className="text-6xl text-[#4a90e2] mb-2 tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            vesta
                        </h2>
                        <div className="flex gap-1 justify-center mt-2">
                            <div className="w-8 h-1 bg-[#4a90e2] rounded-full"></div>
                            <div className="w-2 h-1 bg-orange-500 rounded-full"></div>
                        </div>
                        <p className="text-gray-500 font-sans text-sm mt-4">Opción 2: Sans Geométrico (Estilo Tech / Startup)</p>
                        <p className="text-xs text-gray-400">Tipografía: Montserrat ExtraBold (lowercase)</p>
                    </div>
                </div>

                {/* OPCIÓN 3: ROUNDED - AMIGABLE (Airbnb-ish) */}
                <div className="bg-white p-12 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-4">
                    <div className="text-center">
                        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap" rel="stylesheet" />
                        <h2 className="text-6xl text-[#2d3748] mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            VESTA
                        </h2>
                        <p className="text-gray-500 font-sans text-sm mt-4">Opción 3: Rounded Amigable (Estilo Airbnb / App)</p>
                        <p className="text-xs text-gray-400">Tipografía: Nunito Black</p>
                    </div>
                </div>

                {/* OPCIÓN 4: HYBRID - ICONO + TEXTO */}
                <div className="bg-white p-12 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-4">
                    <div className="text-center flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-tr from-[#1e3a8a] to-[#3b82f6] rounded-xl flex items-center justify-center text-white font-bold text-2xl rotate-3 shadow-lg">
                            V
                        </div>
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet" />
                        <h2 className="text-5xl text-[#1e3a8a] tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                            VESTA
                        </h2>
                    </div>
                    <p className="text-gray-500 font-sans text-sm mt-4">Opción 4: Híbrido (Icono App + Tipografía Inter)</p>
                    <p className="text-xs text-gray-400">Tipografía: Inter Bold</p>
                </div>

            </div>

            <div className="mt-12 text-center text-gray-500 max-w-2xl mx-auto">
                <p>Estas opciones están implementadas con código real (CSS y Google Fonts). La opción que elijas será muy fácil de implementar en toda la aplicación porque es texto, no una imagen plana, lo que garantiza nitidez perfecta en cualquier pantalla.</p>
            </div>
        </div>
    );
};

export default LogoOptions;
