/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { } from 'react';


export default function App() {
  const features = [
    { title: "Rutas Curadas", description: "Módulos organizados por expertos en cine, edición y guion." },
    { title: "Pregúntale a ÉPICA", description: "Tutor inteligente asistido por Gemini para resolver dudas en tiempo real." },
    { title: "Quizzes Automáticos", description: "Pon a prueba tus conocimientos con tests generados por IA." },
    { title: "Laboratorio de Guion", description: "Escribe y formatea tus guiones con IA técnica." },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="p-4 text-center text-xs text-neutral-500 bg-neutral-900/50">
        Creado por Miguelangel Tisera y desarrollado por CINE & TV MAT HYPERMEDIA C.A.
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-8 text-center pt-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ÉPICA: Tu director,<br /> tu guionista, tu escuela
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          YouTube tiene el conocimiento. Nosotros le pusimos IA para que lo domines.
        </p>
        <button
          className="px-8 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-[length:200%_auto] animate-gradient rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition"
        >
          Descargar App ÉPICA
        </button>
      </section>
      
      {/* Pain/Solution */}
      <section className="py-20 px-8 bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-950/50">
            <h3 className="text-xl font-bold text-red-400 mb-4">El Algoritmo te pierde</h3>
            <p className="text-neutral-400">¿Estás viendo cientos de videos sin un orden claro? Perderte en recomendaciones infinitas no es aprender cine.</p>
          </div>
          <div className="p-8 border border-cyan-900/50 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">ÉPICA te guía</h3>
            <p className="text-neutral-300">Rutas curadas, aprendizaje activo. Tú diriges tu propia formación audiovisual con ayuda de IA.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Domina el arte audiovisual</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 hover:bg-neutral-800/60 transition group hover:border-cyan-500/30"
            >
              <h3 className="text-xl font-semibold mb-4 text-cyan-300 group-hover:text-white transition">{feature.title}</h3>
              <p className="text-neutral-400 group-hover:text-neutral-300 transition">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">¿Trabajo final a última hora?</h2>
        <button
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-[length:200%_auto] animate-gradient rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition mb-12"
        >
          Descargar App Ahora
        </button>
        <div className="inline-block p-4 bg-white/5 rounded-xl border border-white/10">
           <div className="w-32 h-32 bg-neutral-950 flex items-center justify-center text-white font-mono text-xs border border-white/10 rounded-lg">
             [ QR Code ]
           </div>
        </div>
      </footer>
    </div>
  );
}

