import Link from "next/link";
import ContactForm from "./contactForm";

export default function PrimariaYESO() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        📖 Primaria y ESO
      </h1>

      <div className="space-y-8">

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700">
            Clases particulares de refuerzo para estudiantes de Primaria y ESO,
            adaptadas a las necesidades de cada alumno, con un enfoque práctico,
            cercano y completamente personalizado.
          </p>
        </div>

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Asignaturas
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Lengua y Literatura.</li>
            <li>Matemáticas.</li>
            <li>Ciencias Naturales y Biología.</li>
            <li>Ciencias Sociales, Historia y Geografía.</li>
            <li>Inglés y Francés.</li>
          </ul>
        </div>

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Metodología
          </h2>

          <p className="text-gray-700">
            Las clases se centran en la comprensión de la teoría, la resolución
            de ejercicios y la preparación de controles y exámenes,
            adaptándose al ritmo y a los objetivos de cada estudiante.
          </p>
        </div>

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Clases individuales o en grupos reducidos.</li>
            <li>Clases online con pizarra digital.</li>
            <li>Resolución de ejercicios, tareas y boletines.</li>
          </ul>

          <Link href="/reservas?servicio=primariayeso">
            <button className="boton-reservar">
              Reservar una clase
            </button>
          </Link>
        </div>

      </div>

      <section className="mt-12">

        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          ¿Necesitas más información?
        </h2>

        <p className="text-gray-700 mb-6">
          Si tienes cualquier duda sobre las clases o quieres asesoramiento
          personalizado, envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>

    </main>
  );
}