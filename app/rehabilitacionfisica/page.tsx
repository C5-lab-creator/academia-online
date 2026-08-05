import Link from "next/link";
import Image from "next/image";

export default function RehabilitacionFisica() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
         REHABILITACIÓN FÍSICA Y PROMOCIÓN DE LA AUTONOMÍA
      </h1>

      <div className="space-y-5 text-gray-700 text-base md:text-lg mb-12">

        <p>
          Nuestros programas de rehabilitación física están dirigidos a personas de cualquier edadque buscan mejorar su movilidad, fuerza y bienestar general, así como a aquellas que enfrentan desafíos físicos debido a lesiones, enfermedades o condiciones crónicas.
        </p>

        <p>
          Diseñamos intervenciones individualizadas para trabajar la fuerza,
          la flexibilidad, el equilibrio, la coordinación y otras habilidades
          esenciales para desenvolverse con mayor autonomía en el día a día.
        </p>

        <p>
          Las sesiones se realizan de forma online o presencial, adaptándose a las
          necesidades y objetivos de cada persona.
        </p>

        <p>
          Además de la intervención individual, ofrecemos asesoramiento y
          acompañamiento a familias, proporcionando orientación, estrategias
          prácticas y programas personalizados que favorecen la continuidad
          del trabajo en el entorno familiar.
        </p>

        <p>
          Trabajamos desde un enfoque integral, basado en la evidencia
          científica y centrado en las capacidades de cada persona, con el
          objetivo de mejorar su participación en la vida diaria, fomentar su
          independencia y contribuir a una mejor calidad de vida.
        </p>

      </div>


      {/* REHABILITACION */}

      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">

        <div className="flex-1">

          <Link href="/rehabilitacionfisica/rehabilitacion">

            <h2 className="text-2xl font-bold text-blue-900 mb-4 hover:text-blue-600">
              REHABILITACIÓN FÍSICA
            </h2>

          </Link>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Evaluación.</li>
            <li>Intervención personalizada. Daño cerebral adquirido, enfermedad de Parkinson, esclerosis múltiple.</li>
            <li>Asesoramiento y acompañamiento a familias.</li>
          </ul>

        </div>


        <div className="w-full md:w-80 flex justify-center">

          <Image
            src="/rehabilitacion.jpeg"
            alt="Intervención en rehabilitación"
            width={350}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full max-w-sm"
          />

        </div>

      </div>


      {/* ESCUELA DE ESPALDA */}

      <div className="flex flex-col md:flex-row items-center gap-8">

        <div className="flex-1">

          <Link href="/rehabilitacionfisica/escuelaespalda">

            <h2 className="text-2xl font-bold text-blue-900 mb-4 hover:text-blue-600">
              Escuela de espalda y programas de bienestar y prevención
            </h2>

          </Link>


          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Evaluación.</li>
            <li>Intervención personalizada. Artritis, artrosis, esclerosis múltiple, dolores musculares.</li>
            <li>Asesoramiento y acompañamiento a familias.</li>
          </ul>


        </div>


        <div className="w-full md:w-80 flex justify-center">

          <Image
            src="/escuelaespalda.jpeg"
            alt="Intervención en escuela de espalda"
            width={350}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full max-w-sm"
          />

        </div>

      </div>


    </main>
  );
}