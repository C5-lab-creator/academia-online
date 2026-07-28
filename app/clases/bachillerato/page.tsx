import Link from "next/link";

export default function QuimicaBachillerato() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
        🎓 Bachillerato
      </h1>

      <div className="max-w-4xl mx-auto text-gray-700 text-lg space-y-4 mb-10">

        <h2 className="text-2xl font-bold text-blue-900">
          ¿Qué ofrecemos?
        </h2>

        <p>
          Clases particulares de Química y otras asignaturas científicas para
          estudiantes de Bachillerato.
        </p>

        <p>
          Desarrollo de esquemas y conceptos esenciales para comprender la
          materia.
        </p>

        <p>
          Resolución de ejercicios, preparación de exámenes y modelos de PAU.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Link
          href="/clases/bachillerato/quimicabach"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 Química
          </h2>

          <p className="text-gray-700">
            Refuerzo durante todo el curso y preparación para Selectividad.
          </p>
        </Link>

        <Link
          href="/clases/bachillerato/matematicasbach"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📐 Matemáticas
          </h2>

          <p className="text-gray-700">
            Refuerzo continuo y preparación para exámenes.
          </p>
        </Link>

        <Link
          href="/clases/bachillerato/fisicabach"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ⚛️ Física
          </h2>

          <p className="text-gray-700">
            Clases adaptadas al nivel del alumno y preparación para la PAU.
          </p>
        </Link>

      </div>

    </main>
  );
}