import Link from "next/link";
import Image from "next/image";
import OpinionesTemp from "./components/OpinionesTemp";



export default function Home() {
  return (
    <main>
<OpinionesTemp />


      <div className="flex items-center gap-4 p-6"></div>

      {/* Presentación */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 py-8 max-w-7xl mx-auto">
        {/* Texto */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold mb-6">
            ACADEMIA MENTE ABIERTA. Especialistas en Selectividad, Ciencias y
            desarrollo cognitivo
          </h3>

          <p className="mb-4 text-base md:text-lg">
            En Mente Abierta creemos que cada persona aprende, crece y desarrolla
            su potencial de una manera única. Por ello, hemos creado un espacio
            online que integra educación, estimulación cognitiva y bienestar,
            ofreciendo servicios especializados y adaptados a cada etapa de la
            vida.
          </p>

          <p className="mb-4 text-base md:text-lg">
            Nuestro propósito es acompañar a estudiantes, familias y personas de
            todas las edades mediante una atención cercana, profesional y de
            calidad, favoreciendo el aprendizaje, la autonomía y el desarrollo
            personal.
          </p>

          <p className="font-semibold italic text-lg">
            "Un mismo espacio donde la excelencia académica, la intervención
            especializada y el acompañamiento personalizado se unen para ayudarte
            a alcanzar tus objetivos."
          </p>
        </div>

        {/* Imagen */}
        <div className="flex justify-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Mente Abierta"
            width={450}
            height={450}
            className="rounded-xl shadow-lg w-64 sm:w-80 md:w-[450px] h-auto"
          />
        </div>
      </section>

      {/* Tarjetas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-6xl mx-auto">
        <Link
          href="/academia"
          className="border rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-3">ACADEMIA</h3>
          <p>
            Especialistas en Selectividad (PAU), Química y Matemáticas.
          </p>
        </Link>

        <Link
          href="/estimulacioncognitiva"
          className="border rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-3">ESTIMULACIÓN COGNITIVA</h3>
          <p>
            Entrenamos la mente para potenciar la autonomía, el aprendizaje y la
            calidad de vida.
          </p>
        </Link>
      </section>

      {/* Ventajas */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          ¿Por qué elegir Mente Abierta?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base md:text-lg">
          <p>✔ Especialistas en Selectividad (PAU), Química y Ciencias.</p>
          <p>✔ Programas de estimulación cognitiva para niños, adultos y personas mayores.</p>
          <p>✔ Atención al alumnado con necesidades educativas especiales.</p>
          <p>✔ Asesoramiento y acompañamiento a familias.</p>
          <p>✔ Clases y sesiones completamente online.</p>
          <p>✔ Intervenciones personalizadas.</p>
          <p>✔ Profesionales especializados.</p>
          <p>✔ Atención cercana, flexible y adaptada a cada persona.</p>
        </div>
      </section>
    </main>
  );
}