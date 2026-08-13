import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contact";
export const metadata = {
  title: "Clases en Grupo de Bachillerato, PAU y Universidad | Mente Abierta",
  description:
    "Clases online en grupo para Bachillerato, preparación de PAU y estudiantes universitarios, con grupos reducidos, apoyo docente y resolución de ejercicios.",
};

export default function FormacionProfesional() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Clases grupales
              </h1>

            <a
              href="/GRUPOS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              📄 Ver modalidades grupales
            </a>
              <p className="text-gray-700 text-lg leading-8 mb-6">
                Aprender en grupo es una forma dinámica y motivadora de alcanzar tus objetivos académicos. En Mente Abierta ofrecemos clases en grupos reducidos para que cada alumno reciba una atención personalizada sin renunciar a los beneficios del aprendizaje colaborativo.
                Trabajamos asignaturas como Química, Matemáticas, Física, Biología, Lengua, Inglés y otras materias, adaptando el ritmo de las clases al nivel y las necesidades del grupo. Nuestro objetivo es que los estudiantes comprendan los contenidos, ganen confianza y mejoren sus resultados académicos.
                Los grupos reducidos favorecen la participación, la resolución de dudas y el intercambio de ideas, creando un ambiente de estudio cercano y motivador.
              </p>


            </div>

            <div className="w-full md:w-96">

              <Image
                src="/grupos.jpeg"
                alt="Grupos"
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
              Clases de apoyo en pequeños grupos por niveles
              
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4"></div>

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

            <div className="text-5xl mb-4"></div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Modalidades
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Trae a tu amigo</li>
              <li>Nivel 0</li>
              <li>Alto rendimiento, dirigido a estudiantes que quieren acceder a estudios de alta nota de corte.</li>
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
              <li>✅ Clases online en directo gabadas, para que puedas acceder a ellas incluso después de la clase.</li>
              <li>✅ Grupos pequeños y definidos por niveles y categorías</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Clases online con pizarra digital, grabadas, para que puedas acceder al contenido en todo momento</li>
              <li>✅ Material personalizado.</li>
              <li>✅ Preparación de exámenes.</li>
              <li>✅ Seguimiento continuo del progreso.</li>
            </ul>

          </div>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Envíanos un mensaje
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si necesitas más información sobre nuestras clases en grupo o quieres consultar disponibilidad, estaremos
            encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}