import Link from "next/link";
import ContactForm from "./contact";

export default function Matematicas() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🎓 Matemáticas
      </h1>

      <div className="space-y-8">

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700 mb-3">
            Clases particulares de Matemáticas durante todo el año, adaptadas
            al nivel y necesidades de cada estudiante.
          </p>

          <p className="text-gray-700 mb-3">
            Desarrollo de esquemas, explicación de conceptos esenciales y
            resolución de dudas para mejorar la comprensión de la asignatura.
          </p>

          <p className="text-gray-700">
            Resolución de ejercicios, preparación de controles y modelos de
            exámenes para conseguir mejores resultados académicos.
          </p>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Clases individuales.</li>
            <li>Grupos reducidos.</li>
            <li>Clases intensivas antes de exámenes.</li>
          </ul>

          <Link href="/reservas?servicio=matematicas1">
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
          Si necesitas más información sobre las clases de Matemáticas o
          quieres consultar disponibilidad, escríbenos y te responderemos lo
          antes posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>

    </main>
  );
}