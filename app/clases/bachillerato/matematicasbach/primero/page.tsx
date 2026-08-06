import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contact";

export default function Matematicas() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                🎓 Matemáticas
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Clases particulares de Matemáticas para estudiantes de ESO,
                Bachillerato y otras etapas educativas, adaptadas al nivel,
                ritmo y objetivos de cada alumno. Nuestro objetivo es que el
                estudiante comprenda los conceptos, gane seguridad y mejore sus
                resultados académicos.
              </p>

              <Link href="/reservas?servicio=matematicas1">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una clase
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/matematicasbachillerato.jpeg"
                alt="Clases de Matemáticas"
                width={450}
                height={320}
                className="rounded-2xl shadow-lg object-cover w-full"
              />

            </div>

          </div>

        </div>

        {/* SERVICIOS */}

        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          ¿Qué ofrecemos?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-14">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">📐</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Refuerzo personalizado
            </h3>

            <p className="text-gray-700 leading-7">
              Explicaciones claras adaptadas al nivel de cada alumno para
              comprender los conceptos matemáticos de forma sencilla.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">📝</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Preparación de exámenes
            </h3>

            <p className="text-gray-700 leading-7">
              Resolución de ejercicios, modelos de examen, recuperación de
              asignaturas y preparación para pruebas importantes.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">💻</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Clases online
            </h3>

            <p className="text-gray-700 leading-7">
              Clases mediante pizarra digital con seguimiento continuo y
              materiales personalizados.
            </p>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Nuestra metodología
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">

            <ul className="space-y-4">
              <li>✅ Explicaciones paso a paso.</li>
              <li>✅ Resolución guiada de ejercicios.</li>
              <li>✅ Técnicas para mejorar el razonamiento matemático.</li>
              <li>✅ Preparación de controles y exámenes.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Clases online con pizarra digital.</li>
              <li>✅ Material personalizado.</li>
              <li>✅ Seguimiento continuo.</li>
              <li>✅ Adaptación al ritmo del estudiante.</li>
            </ul>

          </div>

        </div>

        {/* MODALIDADES */}

        <div className="bg-blue-900 text-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            Modalidades
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-lg">

            <p>✔ Clases individuales.</p>
            <p>✔ Grupos reducidos.</p>
            <p>✔ Clases intensivas antes de exámenes.</p>
            <p>✔ Modalidad online.</p>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-14">

          <Link href="/reservas?servicio=matematicas1">

            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Reservar una clase
            </button>

          </Link>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si deseas conocer nuestros horarios, resolver dudas o recibir
            asesoramiento personalizado sobre nuestras clases de Matemáticas,
            estaremos encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}