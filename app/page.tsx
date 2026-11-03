import Link from "next/link";
import Image from "next/image";
import OpinionesTemp from "./components/OpinionesTemp";
import { FlaskConical, Atom, Puzzle, Leaf } from "lucide-react";
import ScrollReveal from "./components/ScrollReveal";

export const metadata = {
  title: "Mente Abierta | Academia, Apoyo Educativo y Terapia Ocupacional",
  description:
    "Academia online, apoyo educativo, terapia ocupacional, estimulación cognitiva y rehabilitación física. Servicios adaptados a cada persona y familia.",
};

const ventajas = [
  { icon: "🎓", bg: "bg-blue-50", text: "Especialistas en Selectividad (PAU), Química y Ciencias." },
  { icon: "🧠", bg: "bg-green-50", text: "Programas de estimulación cognitiva para niños, adultos y personas mayores." },
  { icon: "👨‍🏫", bg: "bg-yellow-50", text: "Atención al alumnado con necesidades educativas especiales." },
  { icon: "🤝", bg: "bg-purple-50", text: "Asesoramiento y acompañamiento a familias." },
  { icon: "💻", bg: "bg-cyan-50", text: "Clases y sesiones online y presenciales." },
  { icon: "🎯", bg: "bg-orange-50", text: "Intervenciones personalizadas." },
  { icon: "⭐", bg: "bg-pink-50", text: "Profesionales especializados." },
  { icon: "❤️", bg: "bg-indigo-50", text: "Atención cercana, flexible y adaptada a cada persona." },
];

export default function Home() {
  return (
    <main className="bg-gray-50 overflow-x-hidden">
      <OpinionesTemp />

      {/* HERO */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 py-6 sm:py-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-5 sm:p-8 lg:p-12">
          {/* TÍTULO */}
          <div className="mb-8 sm:mb-12 w-full min-w-0">
            {/* MÓVIL */}
            <div className="md:hidden w-full">
              <div className="flex items-center justify-center gap-3">
                <div className="bg-sky-100 rounded-full p-2.5 flex-shrink-0">
                  <FlaskConical className="w-8 h-8 text-sky-600" />
                </div>
                <div className="bg-green-100 rounded-full p-2.5 flex-shrink-0">
                  <Puzzle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <h1
                className="mt-4 w-full text-center font-extrabold text-blue-900 leading-tight"
                style={{ fontSize: "clamp(1.35rem, 6vw, 1.7rem)" }}
              >
                ACADEMIA MENTE ABIERTA
              </h1>
            </div>

            {/* ESCRITORIO */}
            <div className="hidden md:flex items-center justify-center gap-4 w-full">
              <div className="bg-sky-100 rounded-full p-4 flex-shrink-0">
                <FlaskConical className="w-12 h-12 lg:w-16 lg:h-16 text-sky-600" />
              </div>

              <h1
                className="text-center font-extrabold text-blue-900 leading-tight whitespace-nowrap"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                ACADEMIA MENTE ABIERTA
              </h1>

              <div className="bg-green-100 rounded-full p-4 flex-shrink-0">
                <Puzzle className="w-12 h-12 lg:w-16 lg:h-16 text-green-600" />
              </div>
            </div>

            {/* SUBTÍTULOS */}
            <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-center text-blue-900">
              <h2 className="font-bold leading-snug text-base sm:text-xl lg:text-[2rem]">
                <span className="block">ACADEMIA</span>
                <span className="block text-sm sm:text-lg lg:text-[1.6rem] font-semibold text-blue-800">
                  Especialistas en Selectividad y Ciencias
                </span>
              </h2>

              <h2 className="font-bold leading-snug text-base sm:text-xl lg:text-[2rem]">
                <span className="block">TERAPIA OCUPACIONAL</span>
                <span className="block text-sm sm:text-lg lg:text-[1.6rem] font-semibold text-blue-800">
                  Infancia y neurodesarrollo · Rehabilitación · Envejecimiento y demencias
                </span>
              </h2>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Texto */}
            <div className="flex-1 min-w-0">
              <p className="mb-4 sm:mb-5 text-base sm:text-lg text-gray-700 leading-7 sm:leading-8">
                En Mente Abierta creemos que cada persona aprende, crece y
                desarrolla su potencial de una manera única. Por ello, hemos
                creado un espacio online que integra educación, estimulación
                cognitiva y bienestar, ofreciendo servicios especializados y
                adaptados a cada etapa de la vida.
              </p>

              <p className="mb-4 sm:mb-5 text-base sm:text-lg text-gray-700 leading-7 sm:leading-8">
                Nuestro propósito es acompañar a estudiantes, familias y
                personas de todas las edades mediante una atención cercana,
                profesional y de calidad, favoreciendo el aprendizaje, la
                autonomía y el desarrollo personal.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-700 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8">
                <p className="font-semibold italic text-base sm:text-lg text-blue-900 leading-7">
                  “Un mismo espacio donde la excelencia académica, la
                  intervención especializada y el acompañamiento personalizado
                  se unen para ayudarte a alcanzar tus objetivos.”
                </p>
              </div>
            </div>

            {/* Imagen: oculta en móvil porque el logo ya está en la cabecera */}
            <div className="hidden lg:flex w-full lg:w-2/5 justify-center lg:self-start">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {/* TARJETA ACADEMIA */}
          <Link
            href="/academia"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden lg:hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="p-5 sm:p-8 h-full flex flex-col">
              <ScrollReveal>
                <div className="flex items-start sm:items-center justify-between gap-3 mb-5 sm:mb-8">
                  <div className="min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2 leading-tight">
                      ACADEMIA ONLINE
                    </h3>
                    <div className="w-16 sm:w-20 h-1 bg-blue-600 rounded-full"></div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                    <div className="bg-sky-100 rounded-full p-2.5 sm:p-4">
                      <FlaskConical className="w-6 h-6 sm:w-10 sm:h-10 text-sky-600" />
                    </div>
                    <div className="bg-blue-100 rounded-full p-2.5 sm:p-4">
                      <Atom className="w-6 h-6 sm:w-10 sm:h-10 text-blue-700" />
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-8 flex-1">
                  Especialistas en Selectividad (PAU), Química y Matemáticas.
                </p>

                <div className="mt-5 sm:mt-8">
                  <span className="flex sm:inline-flex w-full sm:w-auto justify-center items-center min-h-[48px] bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold group-hover:bg-blue-800 transition">
                    Descubrir más →
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </Link>

          {/* TARJETA TERAPIA OCUPACIONAL */}
          <Link
            href="/terapiaocupacional"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden lg:hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="p-5 sm:p-8 h-full flex flex-col">
              <ScrollReveal>
                <div className="flex items-start sm:items-center justify-between gap-3 mb-5 sm:mb-8">
                  <div className="min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2 leading-tight">
                      TERAPIA OCUPACIONAL
                    </h3>
                    <div className="w-16 sm:w-20 h-1 bg-green-600 rounded-full"></div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                    <div className="bg-green-100 rounded-full p-2.5 sm:p-4">
                      <Puzzle className="w-6 h-6 sm:w-10 sm:h-10 text-green-600" />
                    </div>
                    <div className="bg-lime-100 rounded-full p-2.5 sm:p-4">
                      <Leaf className="w-6 h-6 sm:w-10 sm:h-10 text-lime-600" />
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-8 flex-1">
                  Entrenamos cuerpo y mente para potenciar la autonomía, el
                  aprendizaje y la calidad de vida.
                </p>

                <div className="mt-5 sm:mt-8">
                  <span className="flex sm:inline-flex w-full sm:w-auto justify-center items-center min-h-[48px] bg-green-700 text-white px-6 py-3 rounded-xl font-semibold group-hover:bg-green-800 transition">
                    Descubrir más →
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </Link>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <ScrollReveal>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-6 sm:mb-10 leading-tight">
              ¿Por qué elegir Mente Abierta?
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {ventajas.map((v) => (
                <div
                  key={v.icon}
                  className={`${v.bg} rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center hover:shadow-lg transition`}
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{v.icon}</div>
                  <p className="font-medium text-gray-700 text-sm sm:text-base leading-snug">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}