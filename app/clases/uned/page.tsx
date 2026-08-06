import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contact";

export default function Uned() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                🎓 Clases para la UNED
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Clases particulares de las asignaturas de Física y Química para
                estudiantes de la UNED, adaptadas al ritmo de estudio propio de
                la universidad a distancia. Nuestro objetivo es ayudarte a
                comprender los contenidos, superar las pruebas de evaluación y
                preparar los exámenes con seguridad.
              </p>

              <Link href="/reservas?servicio=uned">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una clase
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/uned.jpeg"
                alt="Clases UNED"
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

            <div className="text-5xl mb-4">📖</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Clases personalizadas
            </h3>

            <p className="text-gray-700 leading-7">
              Apoyo en todas las asignaturas de Física y Química de los grados
              de la UNED, adaptándonos al nivel y necesidades de cada alumno.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">📝</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Preparación de exámenes
            </h3>

            <p className="text-gray-700 leading-7">
              Desarrollo de esquemas, explicación de conceptos clave,
              resolución de ejercicios y modelos de examen para obtener los
              mejores resultados.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">💻</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Clases online
            </h3>

            <p className="text-gray-700 leading-7">
              Clases en directo mediante pizarra digital con seguimiento
              personalizado y flexibilidad horaria.
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
              <li>✅ Explicación clara y adaptada.</li>
              <li>✅ Esquemas y resúmenes personalizados.</li>
              <li>✅ Resolución guiada de ejercicios.</li>
              <li>✅ Preparación específica para exámenes.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Clases online con pizarra digital.</li>
              <li>✅ Material de apoyo actualizado.</li>
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

          <Link href="/reservas?servicio=uned">

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
            Si deseas consultar disponibilidad, resolver dudas sobre alguna
            asignatura o recibir asesoramiento personalizado, estaremos
            encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}