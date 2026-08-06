import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contactForm";

export default function AlumnosNEE() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                🧩 Alumnos con Necesidades Educativas Especiales
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Ofrecemos un apoyo educativo totalmente personalizado para
                alumnado con necesidades educativas especiales, adaptando la
                enseñanza a las características, capacidades y ritmo de cada
                estudiante para favorecer su aprendizaje, autonomía y bienestar.
              </p>

              <Link href="/reservas?servicio=nee">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una sesión
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/nee.jpeg"
                alt="Necesidades Educativas Especiales"
                width={450}
                height={320}
                className="rounded-2xl shadow-lg object-cover w-full"
              />

            </div>

          </div>

        </div>

        {/* TARJETAS */}

        <div className="grid md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">📚</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              ¿Qué ofrecemos?
            </h2>

            <p className="text-gray-700 leading-7">
              Clases de refuerzo adaptadas a las necesidades de cada alumno,
              potenciando sus capacidades y favoreciendo un aprendizaje
              significativo.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🧠</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Metodología
            </h2>

            <p className="text-gray-700 leading-7">
              Diseñamos intervenciones individualizadas utilizando apoyos
              visuales, estrategias adaptadas y recursos específicos para cada
              estudiante, respetando siempre su ritmo de aprendizaje.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">⭐</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              ¿En qué ayudamos?
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>TEA.</li>
              <li>TDAH.</li>
              <li>Dificultades de aprendizaje.</li>
              <li>Apoyo escolar personalizado.</li>
            </ul>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Nuestro apoyo incluye
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">

            <ul className="space-y-4">
              <li>✅ Adaptaciones y estrategias para el aprendizaje.</li>
              <li>✅ Organización y gestión del tiempo.</li>
              <li>✅ Planificación de tareas y deberes.</li>
              <li>✅ Preparación de exámenes.</li>
              <li>✅ Técnicas de estudio personalizadas.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Apoyos visuales y recursos didácticos.</li>
              <li>✅ Comprensión de instrucciones.</li>
              <li>✅ Desarrollo de habilidades comunicativas.</li>
              <li>✅ Coordinación con la familia.</li>
              <li>✅ Seguimiento individualizado.</li>
            </ul>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-12">

          <Link href="/reservas?servicio=nee">

            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Reservar una sesión
            </button>

          </Link>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si deseas conocer cómo podemos ayudarte o resolver cualquier duda,
            ponte en contacto con nosotros. Estaremos encantados de asesorarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}