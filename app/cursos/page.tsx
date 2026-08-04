import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function Cursos() {
  const { data: cursosAdmin, error } = await supabase
    .from("cursos")
    .select("*")
console.log("CURSOS:", cursosAdmin);
console.log("ERROR:", JSON.stringify(error, null, 2));

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Nuestros cursos y programas
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Cursos completos grabados para que puedas aprender a tu ritmo,
        desde cualquier lugar y cuando quieras.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* QUÍMICA */}

        <Link
          href="/cursos/selectividad"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎓 Intensivos selectividad
          </h2>

          <p className="text-gray-700">
            Curso selectividad matemáticas
          </p>

          <p className="text-gray-700">
            Curso selectividad química
          </p>

        </Link>
        <Link
          href="/cursos/temariobachillerato"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎓 2º bachillerato por temas
          </h2>

          <p className="text-gray-700">
            Matemáticas
          </p>

          <p className="text-gray-700">
            Quimica
          </p>

          <p className="text-gray-700">
            30 EUROS AL MES
          </p>


        </Link>

        <Link
          href="/cursos/acceso25"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎓 Preparación acceso mayores de 25
          </h2>

          <p className="text-gray-700">
            Asignaturas troncales
          </p>

          <p className="text-gray-700">
            Asignaturas específicas
          </p>


        </Link>
        {/* DEMENCIAS */}

        <Link
          href="/cursos/demencias"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧠 Alzheimer y otras demencias
          </h2>

          <p className="text-gray-700">
            Formación completa para familiares y profesionales.
          </p>
        </Link>

        {/* AUTISMO */}

        <Link
          href="/cursos/autismo"
          className="curso"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📖 Autismo
          </h2>

          <p className="text-gray-700">
            Dificultades sensoriales.
          </p>

          <p className="text-gray-700">
            Vida diaria.
          </p>

          <p className="text-gray-700">
            Conducta y estrategias.
          </p>
        </Link>

{/* BIENESTAR Y PREVENCIÓN. ESCUELA DE ESPALDA */}

<Link
  href="/cursos/escuela-espalda"
  className="curso"
>
  <h2 className="text-2xl font-bold text-blue-900 mb-4">
    🦴 Bienestar y prevención
  </h2>

  <p className="text-gray-700">
    Escuela de espalda.
  </p>

  <p className="text-gray-700">
    Prevención del dolor y mejora de la movilidad en artrosis y otras patologias.
  </p>

  <p className="text-gray-700">
    Envejecimiento activo.
  </p>
</Link>
        {/* CURSOS ADMIN */}

        {cursosAdmin?.map((curso) => (

          <div
            key={curso.id}
            className="curso"
          >

            {curso.imagen && (
              <Image
                src={curso.imagen}
                alt={curso.titulo}
                width={400}
                height={250}
                className="rounded-xl mb-4 w-full h-52 object-cover"
              />
            )}

            <h2 className="text-2xl font-bold text-blue-900 mb-3">
              {curso.titulo}
            </h2>

            <p className="text-gray-700 mb-3">
              {curso.descripcion}
            </p>

            {curso.precio && (
              <p className="font-semibold text-green-700 mb-4">
                Precio: {curso.precio} €
              </p>
            )}

            {curso.video && (
              <Link
                href={curso.video}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Ver curso
              </Link>
            )}

          </div>

        ))}

      </div>

    </main>
  );
}