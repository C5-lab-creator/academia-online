import Link from "next/link";
import ContactForm from "./contact";

export default function Matematicas() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🎓 Matemáticas Bachillerato
      </h1>

      <div className="space-y-8">

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700 mb-3">
            Clases particulares de Matemáticas para estudiantes de Bachillerato,
            adaptadas al nivel y objetivos de cada alumno.
          </p>

          <p className="text-gray-700">
            Preparación de la asignatura para superar la PAU mediante la
            comprensión de conceptos, práctica de ejercicios y preparación de
            modelos de examen.
          </p>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Preparación PAU
          </h2>

          <p className="text-gray-700">
            Preparamos los exámenes de acceso a la universidad mediante clases
            personalizadas, resolución de ejercicios, repaso de contenidos
            importantes y simulacros de examen adaptados al modelo de la prueba.
          </p>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Clases individuales.</li>
            <li>Grupos reducidos.</li>
            <li>Clases intensivas de preparación PAU.</li>
          </ul>

          <Link href="/reservas?servicio=matematicas2">
            <button className="boton-reservar">
              Reservar
            </button>
          </Link>

        </div>

      </div>


      <section className="mt-12">

        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          Envíanos un mensaje
        </h2>

        <p className="text-gray-700 mb-6">
          Si necesitas más información sobre las clases de Matemáticas o la
          preparación de la PAU, escríbenos y te responderemos lo antes posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>

    </main>
  );
}