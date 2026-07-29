import Link from "next/link";
import ContactForm from "./contact";

export default function QuimicaBachillerato() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
        🎓 FP
      </h1>

      <div className="max-w-4xl mx-auto text-gray-700 text-lg space-y-4 mb-10">

        <h2 className="text-2xl font-bold text-blue-900">
          ¿Qué ofrecemos?
        </h2>

        <p>
          Clases particulares de asignaturas científicas para
          estudiantes de FP. Si tienes dudas pregúntanos sobre la asignatura que te está costando entender
        </p>

        <p>
          Desarrollo de esquemas y conceptos esenciales para comprender la
          materia.
        </p>

      </div>

      <section className="mt-12">

        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          Envíanos un mensaje
        </h2>

        <p className="text-gray-700 mb-6">
          Para más información sobre las clases de Química Analítica,
          disponibilidad y reservas, escríbenos y te responderemos lo antes
          posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>
    </main>
  );
}