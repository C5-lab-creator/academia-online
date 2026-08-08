import Link from "next/link";
export const metadata = {
  title: "Clases de Bachillerato y PAU Online | Mente Abierta",
  description:
    "Clases particulares de fisica y prepración selectividad.",
};

export default function FisicaBachillerato() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🎓 Física Bachillerato
      </h1>

      <div className="space-y-8">

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700 mb-3">
            Clases particulares de Física para estudiantes de Bachillerato,
            adaptadas al nivel y necesidades de cada alumno.
          </p>

          <p className="text-gray-700 mb-3">
            Desarrollo de esquemas y explicación de los conceptos esenciales
            para facilitar la comprensión de la materia.
          </p>

          <p className="text-gray-700">
            Resolución de ejercicios y modelos de exámenes para obtener
            mejores resultados académicos.
          </p>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Cursos disponibles
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Link
              href="/clases/bachillerato/fisicabach/1bach"
              className="curso hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                🎓 1º Bachillerato
              </h3>

              <p className="text-gray-700">
                Refuerzo durante todo el año, explicación de teoría,
                resolución de ejercicios y preparación de exámenes.
              </p>
            </Link>


            <Link
              href="/clases/bachillerato/fisicabach/2bach"
              className="curso hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                🎓 2º Bachillerato y PAU
              </h3>

              <p className="text-gray-700">
                Refuerzo durante todo el año y preparación PAU mediante
                ejercicios y modelos de examen.
              </p>
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}