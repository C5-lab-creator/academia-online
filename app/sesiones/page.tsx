import Link from "next/link";
import Image from "next/image";
export const metadata = {
  title: "Sesiones de Terapia Ocupacional | Mente Abierta",
  description:
    "Sesiones de terapia ocupacional para niños y adolescentes con autismo, TDAH, necesidades educativas y dificultades en el desarrollo, aprendizaje y autonomía."
};
export default function Clases() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                🖐️ Sesiones de Terapia Ocupacional
              </h1>

              <p className="text-lg text-gray-700 leading-8">
                Sesiones individuales dirigidas a la promoción de la autonomía personal y objetivos individuales.
              </p>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/demencias.jpeg"
                alt="Demencias"
                width={450}
                height={320}
                className="rounded-2xl shadow-lg object-cover w-full"
              />

            </div>

          </div>

        </div>

        {/* TARJETAS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Link
            href="/estimulacioncognitiva/envejecimiento"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">👴</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Estimulación cognitiva
            </h2>

            <p className="text-gray-700">
              Deterioro cognitivo y demencias
            </p>
          </Link>

          <Link
            href="/rehabilitacionfisica/rehabilitacion"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">💪</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Rehabilitación física
            </h2>

            <p className="text-gray-700">
              Daño cerebral adquirido, esclerosis múltiple, enfermedad de Párkinson, etc.</p>
          </Link>

          <Link
            href="/estimulacioncognitiva/neurodesarrollo"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🧠</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Neurodivergencia
            </h2>
            <p className="text-gray-700">
              Trastorno del espectro autista, TDAH, desórdenes de integración sensorial, etc.</p>
          </Link>

          <Link
            href="/rehabilitacionfisica/escuelaespalda"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🧘</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Programas de bienestar y promoción de la salud.
            </h2>

            <p className="text-gray-700">
              Escuela de espalda
            </p>
          </Link>
        </div>

        {/* CTA */}

        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Te asesoramos para encontrar la opción que mejor se adapte a tus
            necesidades.
          </h2>

          <Link href="/contacto">

            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition">
              Solicitar asesoramiento
            </button>

          </Link>

        </div>

      </div>

    </main>
  );
}