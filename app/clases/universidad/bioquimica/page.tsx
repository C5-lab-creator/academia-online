import Link from "next/link";
import ContactForm from "./contact";

export default function Universidad() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🧪 Bioquimica
      </h1>

      <div className="space-y-8">

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700">
            Clases particulares de bioquimica para estudiantes
            universitarios, adaptadas al nivel y objetivos de cada
            alumno.
          </p>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Metodología
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li> Las clases se centran en la comprensión de la teoría, la resolución
            de problemas y la preparación de prácticas y exámenes. Se adaptan
            al ritmo de aprendizaje y a las necesidades de cada estudiante.</li>
            <li>Clases online con pizarra digital.</li>
            <li>Resolución de ejercicios y boletines.</li>
            <li>Preparación de exámenes universitarios.</li>
          </ul>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Clases individuales.</li>
            <li>Clases grupales.</li>
          </ul>

          <Link href="/reservas?servicio=quimicaanalitica">
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