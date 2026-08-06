import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contact";

export default function Bachillerato() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                🎓 Química Bachillerato
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Clases particulares de Química para estudiantes de
                Bachillerato, adaptadas al nivel, ritmo y objetivos de cada
                alumno. Ofrecemos apoyo durante todo el curso y preparación
                específica para la PAU mediante una metodología práctica,
                personalizada y orientada a resultados.
              </p>

              <Link href="/reservas?servicio=quimica2">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una clase
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/quimicabachillerato.jpeg"
                alt="Química Bachillerato"
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

            <div className="text-5xl mb-4">🧪</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              ¿Qué ofrecemos?
            </h2>

            <p className="text-gray-700 leading-7">
              Clases particulares de Química para Bachillerato con seguimiento
              continuo, explicación de contenidos, resolución de ejercicios y
              preparación de controles y exámenes.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">📚</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Preparación PAU
            </h2>

            <p className="text-gray-700 leading-7">
              Preparación específica de la PAU mediante resolución de modelos
              oficiales, simulacros de examen, técnicas de resolución y repaso
              de los contenidos más importantes.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">💻</div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Modalidades
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Clases individuales.</li>
              <li>Grupos reducidos.</li>
              <li>Clases online.</li>
              <li>Preparación intensiva PAU.</li>
            </ul>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Nuestra metodología
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <ul className="space-y-4 text-gray-700">
              <li>✅ Explicación clara y adaptada de todos los contenidos.</li>
              <li>✅ Resolución paso a paso de ejercicios.</li>
              <li>✅ Elaboración de esquemas y resúmenes.</li>
              <li>✅ Técnicas de estudio eficaces.</li>
            </ul>

            <ul className="space-y-4 text-gray-700">
              <li>✅ Simulacros de examen PAU.</li>
              <li>✅ Material propio y ejercicios personalizados.</li>
              <li>✅ Clases con pizarra digital.</li>
              <li>✅ Seguimiento individual del progreso.</li>
            </ul>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-12">

          <Link href="/reservas?servicio=quimica2">

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-5 rounded-2xl transition">
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
            Si deseas más información sobre las clases de Química de
            Bachillerato o la preparación de la PAU, estaremos encantados de
            ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}