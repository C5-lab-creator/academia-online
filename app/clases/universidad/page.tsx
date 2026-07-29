import Link from "next/link";

export default function Universidad() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🧪 Universidad
      </h1>

      <div className="space-y-8">

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué ofrecemos?
          </h2>

          <p className="text-gray-700">
            Clases particulares universitarias para estudiantes de grados y
            asignaturas relacionadas con Química, adaptadas a las necesidades
            de cada estudiante, con un enfoque práctico, cercano y
            personalizado.
          </p>
        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Asignaturas
          </h2> 
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link
              href="/clases/universidad/quimicageneral"
              className="curso"
            >
              <h3 className="text-xl font-bold text-blue-900 text-center">
                Química General
              </h3>
            </Link>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link
              href="/clases/universidad/organica"
              className="curso"
            >
              <h3 className="text-xl font-bold text-blue-900 text-center">
                Química Orgánica
              </h3>
            </Link>

            <Link
              href="/clases/universidad/inorganica"
              className="curso"
            >
              <h3 className="text-xl font-bold text-blue-900 text-center">
                Química Inorgánica
              </h3>
            </Link>

            <Link
              href="/clases/universidad/quifi"
              className="curso"
            >
              <h3 className="text-xl font-bold text-blue-900 text-center">
                Química Física
              </h3>
            </Link>

            <Link
              href="/clases/universidad/analitica"
              className="curso"
            >
              <h3 className="text-xl font-bold text-blue-900 text-center">
                Química Analítica
              </h3>
            </Link>

          </div>

        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Metodología
          </h2>

          <p className="text-gray-700">
            
          </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
             <li>Clases online con pizarra digital.</li>
             <li>Resolución de ejercicios y problemas universitarios.</li>
             <li>Preparación de parciales y exámenes finales.</li>
          </ul>
            
        </div>


        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Clases individuales adaptadas a cada estudiante.</li>
            <li>Grupos reducidos para llevar al día tus clases</li>
          </ul>

        </div>

      </div>

    </main>
  );
}