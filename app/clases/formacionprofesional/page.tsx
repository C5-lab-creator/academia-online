import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contact";

export default function FormacionProfesional() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                🎓 Formación Profesional (FP)
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Clases particulares para estudiantes de Formación Profesional
                adaptadas a cada ciclo formativo. Te ayudamos a comprender los
                contenidos, superar las asignaturas y afrontar con éxito los
                exámenes mediante una enseñanza totalmente personalizada.
              </p>

              <Link href="/reservas?servicio=formacionprofesional">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una clase
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/formacionprofesional.jpeg"
                alt="Formación Profesional"
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
              Clases de apoyo para asignaturas científicas de Formación
              Profesional, adaptadas a las necesidades de cada estudiante y a
              los contenidos de su ciclo formativo.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🧠</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Metodología
            </h2>

            <p className="text-gray-700 leading-7">
              Explicación clara de los conceptos, resolución de ejercicios,
              elaboración de esquemas y preparación de pruebas adaptándonos al
              ritmo de aprendizaje de cada alumno.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🎯</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Modalidades
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Clases individuales.</li>
              <li>Grupos reducidos.</li>
              <li>Clases online.</li>
              <li>Preparación de exámenes.</li>
            </ul>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            ¿Cómo trabajamos?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">

            <ul className="space-y-4">
              <li>✅ Explicación paso a paso de la teoría.</li>
              <li>✅ Resolución de ejercicios y casos prácticos.</li>
              <li>✅ Elaboración de esquemas y resúmenes.</li>
              <li>✅ Técnicas de estudio adaptadas.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Clases online con pizarra digital.</li>
              <li>✅ Material personalizado.</li>
              <li>✅ Preparación de exámenes.</li>
              <li>✅ Seguimiento continuo del progreso.</li>
            </ul>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-12">

          <Link href="/reservas?servicio=formacionprofesional">

            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Reservar una clase
            </button>

          </Link>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Envíanos un mensaje
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si necesitas más información sobre nuestras clases de Formación
            Profesional o quieres consultar disponibilidad, estaremos
            encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}