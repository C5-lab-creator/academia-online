import Link from "next/link";
import Image from "next/image";
export const metadata = {
  title: "Mente Abierta | Academia y Terapia Ocupacional",
  description:
    "Academia especializada en química, matemáticas y selectividad. Terapia ocupacional y estimulación cognitiva. Trastorno del espectro autista, integración sensorial, rehabilitación física y asesoramiento a familias. Cursos, clases y atención personalizada.",
};
export default function EstimulacionCognitiva() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        Estimulación Cognitiva
      </h1>

      <div className="space-y-5 text-gray-700 text-base md:text-lg mb-12">
        <p>
          Nuestros programas de estimulación cognitiva están dirigidos a niños
          con necesidades educativas especiales, adultos y personas mayores que
          desean potenciar o mantener sus capacidades cognitivas.
        </p>

        <p>
          Diseñamos intervenciones individualizadas para trabajar la memoria, la
          atención, el lenguaje, el razonamiento, las funciones ejecutivas y
          otras habilidades esenciales para desenvolverse con mayor autonomía en
          el día a día.
        </p>

        <p>
          Las sesiones se realizan de forma online, adaptándose a las
          necesidades y objetivos de cada persona, tanto en procesos de
          envejecimiento saludable y deterioro cognitivo como en dificultades de
          aprendizaje, trastornos del neurodesarrollo y otras situaciones que
          puedan beneficiarse de una intervención especializada.
        </p>

        <p>
          Además de la intervención individual, ofrecemos asesoramiento y
          acompañamiento a familias, proporcionando orientación, estrategias
          prácticas y programas personalizados que favorecen la continuidad del
          trabajo en el entorno familiar.
        </p>

        <p>
          Trabajamos desde un enfoque integral, basado en la evidencia
          científica y centrado en las capacidades de cada persona, con el
          objetivo de mejorar su participación en la vida diaria, fomentar su
          independencia y contribuir a una mejor calidad de vida.
        </p>
      </div>

      {/* Envejecimiento */}

      <div className="card flex flex-col md:flex-row items-center gap-8 mb-10">

        <div className="flex-1">

          <Link href="/estimulacioncognitiva/envejecimiento">

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              INTERVENCIÓN EN ENVEJECIMIENTO NORMAL Y PATOLÓGICO
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Evaluación.</li>
              <li>Intervención personalizada. Deterioro cognitivo y demencias, esclerosis múltiple, etc.</li>
              <li>Asesoramiento y acompañamiento a familias.</li>
            </ul>

          </Link>

        </div>

        <div className="w-full md:w-80 flex justify-center">
          <Image
            src="/envejecimiento.jpeg"
            alt="Intervención en envejecimiento"
            width={350}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full max-w-sm"
          />
        </div>

      </div>

      {/* Neurodesarrollo */}

      <div className="card flex flex-col md:flex-row items-center gap-8">

        <div className="flex-1">

          <Link href="/estimulacioncognitiva/neurodesarrollo">

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              INTERVENCIÓN EN TRASTORNOS DEL NEURODESARROLLO
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Evaluación.</li>
              <li>Intervención personalizada. Trastorno del espectro autista, TDAH, desórdenes de integración sensorial, etc.</li>
              <li>Asesoramiento y acompañamiento a familias.</li>
            </ul>

          </Link>

        </div>

        <div className="w-full md:w-80 flex justify-center">
          <Image
            src="/neurodesarrollo.jpeg"
            alt="Intervención en neurodesarrollo"
            width={350}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full max-w-sm"
          />
        </div>

      </div>

    </main>
  );
}