import Link from "next/link";
import Image from "next/image";
export const metadata = {
  title: "Mente Abierta | Academia y Terapia Ocupacional",
  description:
    "Academia especializada en química, matemáticas y selectividad. Terapia ocupacional y estimulación cognitiva. Trastorno del espectro autista, integración sensorial, rehabilitación física y asesoramiento a familias. Cursos, clases y atención personalizada.",
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
                📚 Nuestras Clases
              </h1>

              <p className="text-lg text-gray-700 leading-8">
                Ofrecemos clases particulares totalmente personalizadas para
                todas las etapas educativas. Desde Primaria hasta Universidad,
                pasando por Bachillerato, Formación Profesional, UNED,
                preparación de pruebas de acceso y apoyo especializado para
                alumnado con necesidades educativas especiales.
              </p>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/clases.jpeg"
                alt="Clases particulares"
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
            href="/clases/bachillerato"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🎓</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Bachillerato
            </h2>

            <p className="text-gray-700">
              Química, Matemáticas, Física y preparación específica para la
              PAU.
            </p>
          </Link>

          <Link
            href="/clases/universidad"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🧪</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Universidad
            </h2>

            <p className="text-gray-700">
              Química Analítica, Orgánica, Física, Bioquímica, Ciencia de los
              Materiales, Química General e Inorgánica.
            </p>
          </Link>

          <Link
            href="/clases/pruebasdeacceso"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🎯</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Pruebas de Acceso +25
            </h2>

            <p className="text-gray-700">
              Preparación personalizada para superar las pruebas de acceso a la
              universidad.
            </p>
          </Link>

          <Link
            href="/clases/uned"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🏫</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              UNED
            </h2>

            <p className="text-gray-700">
              Clases particulares para asignaturas de Física y Química de la
              UNED.
            </p>
          </Link>

          <Link
            href="/clases/formacionprofesional"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">📚</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Formación Profesional
            </h2>

            <p className="text-gray-700">
              Apoyo en asignaturas científicas adaptado a cada ciclo
              formativo.
            </p>
          </Link>

          <Link
            href="/clases/primaria-eso"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">📖</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Primaria y ESO
            </h2>

            <p className="text-gray-700">
              Refuerzo escolar personalizado en todas las materias.
            </p>
          </Link>


          <Link
            href="/clases/grupos"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">👥</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Clases grupales
            </h2>

            <p className="text-gray-700">
             Grupos reducidos de entre 3 y 5 alumnos para favorecer un aprendizaje dinámico, participativo y personalizado.
            </p>
          </Link>

          <Link
            href="/clases/alumnos-nee"
            className="curso hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-4">🧩</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Alumnado con NEE
            </h2>

            <p className="text-gray-700 mb-3">
              Intervención educativa adaptada para:
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>TEA</li>
              <li>TDAH</li>
              <li>Dificultades de aprendizaje</li>
              <li>Adaptaciones personalizadas</li>
            </ul>

          </Link>

        </div>

        {/* VENTAJAS */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            ¿Por qué elegir Mente Abierta?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

              <div className="text-5xl mb-4">⭐</div>

              <h3 className="font-bold text-blue-900 mb-3">
                Atención personalizada
              </h3>

              <p className="text-gray-700">
                Cada alumno recibe un plan adaptado a sus necesidades.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

              <div className="text-5xl mb-4">💻</div>

              <h3 className="font-bold text-blue-900 mb-3">
                Clases Online
              </h3>

              <p className="text-gray-700">
                Aprende desde cualquier lugar con pizarra digital.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

              <div className="text-5xl mb-4">📅</div>

              <h3 className="font-bold text-blue-900 mb-3">
                Horarios flexibles
              </h3>

              <p className="text-gray-700">
                Adaptamos las clases a tu disponibilidad.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

              <div className="text-5xl mb-4">🎯</div>

              <h3 className="font-bold text-blue-900 mb-3">
                Objetivos reales
              </h3>

              <p className="text-gray-700">
                Preparación para aprobar y mejorar el rendimiento académico.
              </p>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿No sabes qué modalidad elegir?
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Te asesoramos para encontrar la opción que mejor se adapte a tus
            necesidades.
          </p>

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