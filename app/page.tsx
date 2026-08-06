import Link from "next/link";
import Image from "next/image";
import OpinionesTemp from "./components/OpinionesTemp";
import {
  FlaskConical,
  Atom,
  Puzzle,
  Leaf,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-gray-50">

      <OpinionesTemp />

      {/* HERO */}
      <section className="w-full max-w-[1700px] mx-auto px-8 py-12">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 lg:p-12">

{/* TÍTULO */}
<div className="mb-12">

  <div className="flex items-center justify-between gap-6">

    {/* Icono izquierdo */}
    <div className="bg-sky-100 rounded-full p-4 flex-shrink-0">
      <FlaskConical className="w-12 h-12 lg:w-16 lg:h-16 text-sky-600" />
    </div>

    {/* Título */}
    <h1 className="flex-1 text-center text-5xl lg:text-7xl font-extrabold text-blue-900 leading-none">
      ACADEMIA MENTE ABIERTA
    </h1>

    {/* Icono derecho */}
    <div className="bg-green-100 rounded-full p-4 flex-shrink-0">
      <Puzzle className="w-12 h-12 lg:w-16 lg:h-16 text-green-600" />
    </div>

  </div>

  <h2 className="mt-6 text-center text-3xl lg:text-5xl font-bold text-blue-900 leading-tight">
    Especialistas en Selectividad, Ciencias y desarrollo cognitivo
  </h2>

</div>

          {/* CONTENIDO */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

            {/* Texto */}
            <div className="flex-1">

              <p className="mb-5 text-lg text-gray-700 leading-8">
                En Mente Abierta creemos que cada persona aprende, crece y
                desarrolla su potencial de una manera única. Por ello, hemos
                creado un espacio online que integra educación, estimulación
                cognitiva y bienestar, ofreciendo servicios especializados y
                adaptados a cada etapa de la vida.
              </p>

              <p className="mb-5 text-lg text-gray-700 leading-8">
                Nuestro propósito es acompañar a estudiantes, familias y
                personas de todas las edades mediante una atención cercana,
                profesional y de calidad, favoreciendo el aprendizaje, la
                autonomía y el desarrollo personal.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-700 rounded-xl p-6 mt-8">

                <p className="font-semibold italic text-lg text-blue-900">
                  "Un mismo espacio donde la excelencia académica, la
                  intervención especializada y el acompañamiento personalizado
                  se unen para ayudarte a alcanzar tus objetivos."
                </p>

              </div>

            </div>

            {/* Imagen */}
            <div className="w-full lg:w-2/5 flex justify-center">

              <Image
                src="/logo.png"
                alt="Mente Abierta"
                width={450}
                height={450}
                priority
                className="rounded-3xl shadow-xl object-cover w-full max-w-md"
              />

            </div>

          </div>

        </div>

      </section>

      {/* TARJETAS PRINCIPALES */}
      <section className="max-w-7xl mx-auto px-6 pb-12">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {/* TARJETA ACADEMIA */}
    <Link
      href="/academia"
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
    >

      <div className="p-8 h-full flex flex-col">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h3 className="text-3xl font-bold text-blue-900 mb-2">
              ACADEMIA
            </h3>

            <div className="w-20 h-1 bg-blue-600 rounded-full"></div>

          </div>

          <div className="flex gap-3">

            <div className="bg-sky-100 rounded-full p-4">
              <FlaskConical className="w-10 h-10 text-sky-600" />
            </div>

            <div className="bg-blue-100 rounded-full p-4">
              <Atom className="w-10 h-10 text-blue-700" />
            </div>

          </div>

        </div>

        <p className="text-gray-700 text-lg leading-8 flex-1">
          Especialistas en Selectividad (PAU), Química y Matemáticas.
        </p>

        <div className="mt-8">

          <span className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold group-hover:bg-blue-800 transition">
            Descubrir más →
          </span>

        </div>

      </div>

    </Link>



    {/* TARJETA TERAPIA OCUPACIONAL */}

    <Link
      href="/estimulacioncognitiva"
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
    >

      <div className="p-8 h-full flex flex-col">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h3 className="text-3xl font-bold text-blue-900 mb-2">
              TERAPIA OCUPACIONAL
            </h3>

            <div className="w-20 h-1 bg-green-600 rounded-full"></div>

          </div>

          <div className="flex gap-3">

            <div className="bg-green-100 rounded-full p-4">
              <Puzzle className="w-10 h-10 text-green-600" />
            </div>

            <div className="bg-lime-100 rounded-full p-4">
              <Leaf className="w-10 h-10 text-lime-600" />
            </div>

          </div>

        </div>

        <p className="text-gray-700 text-lg leading-8 flex-1">
          Entrenamos cuerpo y mente para potenciar la autonomía, el aprendizaje
          y la calidad de vida.
        </p>

        <div className="mt-8">

          <span className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-xl font-semibold group-hover:bg-green-800 transition">
            Descubrir más →
          </span>

        </div>

      </div>

    </Link>

  </div>

</section>

{/* VENTAJAS */}
      {/* VENTAJAS */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

          <h3 className="text-3xl font-bold text-center text-blue-900 mb-10">
            ¿Por qué elegir Mente Abierta?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-blue-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎓</div>
              <p className="font-medium text-gray-700">
                Especialistas en Selectividad (PAU), Química y Ciencias.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🧠</div>
              <p className="font-medium text-gray-700">
                Programas de estimulación cognitiva para niños, adultos y personas mayores.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <p className="font-medium text-gray-700">
                Atención al alumnado con necesidades educativas especiales.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤝</div>
              <p className="font-medium text-gray-700">
                Asesoramiento y acompañamiento a familias.
              </p>
            </div>

            <div className="bg-cyan-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">💻</div>
              <p className="font-medium text-gray-700">
                Clases y sesiones completamente online.
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <p className="font-medium text-gray-700">
                Intervenciones personalizadas.
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">⭐</div>
              <p className="font-medium text-gray-700">
                Profesionales especializados.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">❤️</div>
              <p className="font-medium text-gray-700">
                Atención cercana, flexible y adaptada a cada persona.
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}