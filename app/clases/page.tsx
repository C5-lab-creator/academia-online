import Link from "next/link";

export default function Clases() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Nuestras clases
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Clases personalizadas adaptadas a cada etapa educativa y a las
        necesidades de cada alumno.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <Link href="/clases/bachillerato" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎓 Bachillerato
          </h2>

          <p className="text-gray-700">
            Química y asignaturas científicas.
          </p>

          <p className="text-gray-700">
            Preparación para la PAU.
          </p>

          <p className="text-gray-700">
            Selectividad.
          </p>
        </Link>

        <Link href="/clases/universidad" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 Universidad
          </h2>

          <p className="text-gray-700">
            Clases particulares para estudiantes universitarios de Química y
            otras ciencias.
          </p>
        </Link>        

        <Link href="/clases/pruebasdeacceso" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 Pruebas de acceso mayores de 25 años
          </h2>

          <p className="text-gray-700">
            Clases particulares para estudiantes de pruebas de acceso mayores de 25 años..
          </p>
        </Link>


        
        <Link href="/clases/uned" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 UNED
          </h2>

          <p className="text-gray-700">
            Clases particulares para estudiantes de la UNED.
          </p>
        </Link>

        <Link href="/clases/formacionprofesional" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 Formación profesional
          </h2>

          <p className="text-gray-700">
            Clases particulares para estudiantes de FP.
          </p>
        </Link>

        <Link href="/clases/primaria-eso" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📖 Primaria y ESO
          </h2>

          <p className="text-gray-700">
            Refuerzo escolar en todas las materias.
          </p>
        </Link>

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            👥 Clases Grupales
          </h2>

          <p className="text-gray-700">
            Grupos reducidos de 3 a 5 alumnos para favorecer un aprendizaje
            dinámico y personalizado.
          </p>
        </div>

        <Link href="/clases/alumnos-nee" className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧩 Alumnado con NEE
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>TEA.</li>
            <li>TDAH.</li>
            <li>Dificultades de aprendizaje.</li>
            <li>Adaptaciones y estrategias personalizadas.</li>
            <li>Asesoramiento individualizado.</li>
          </ul>
        </Link>

      </div>

    </main>
  );
}