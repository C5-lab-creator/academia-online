import Link from "next/link";

export default function QuimicaBachillerato() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🎓 Química Bachillerato
      </h1>

      <div className="space-y-8">

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700 mb-3">
            Clases particulares de Química y otras asignaturas científicas
            para estudiantes de Bachillerato, adaptadas al nivel y necesidades
            de cada alumno.
          </p>

          <p className="text-gray-700">
            Desarrollo de esquemas y explicación de conceptos esenciales,
            resolución de ejercicios y modelos de exámenes para conseguir
            mejores resultados académicos.
          </p>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Cursos disponibles
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Link
              href="/clases/bachillerato/quimicabach/1"
              className="curso hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                🎓 1º Bachillerato
              </h3>

              <p className="text-gray-700">
                Refuerzo durante todo el año, explicación de contenidos,
                resolución de ejercicios y preparación de exámenes.
              </p>
            </Link>


            <Link
              href="/clases/bachillerato/quimicabach/2"
              className="curso hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                🎓 2º Bachillerato y PAU
              </h3>

              <p className="text-gray-700">
                Refuerzo durante todo el año y preparación específica para la
                PAU mediante ejercicios y modelos de examen.
              </p>
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}