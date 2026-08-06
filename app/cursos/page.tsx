import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function Cursos() {
  const { data: cursosAdmin } = await supabase
    .from("cursos")
    .select("*");

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold text-center text-blue-900 mb-4">
        Nuestros cursos y programas
      </h1>

      <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12">
        Aprende a tu ritmo con nuestros cursos online. Accede al contenido
        desde cualquier lugar, las veces que quieras y con materiales
        diseñados para ayudarte a alcanzar tus objetivos.
      </p>

      <h2 className="text-3xl font-bold text-blue-900 mb-6">
        Cursos destacados
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <Link
          href="/cursos/selectividad"
          className="curso hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎓 Intensivos Selectividad
          </h2>

          <p className="text-gray-700">
            ✔ Matemáticas
          </p>

          <p className="text-gray-700">
            ✔ Química
          </p>

          <p className="text-blue-700 font-semibold mt-4">
            Ver programa y precios →
          </p>
        </Link>

        <Link
          href="/cursos/temariobachillerato"
          className="curso hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📚 Bachillerato por temas
          </h2>

          <p className="text-gray-700">
            ✔ Matemáticas
          </p>

          <p className="text-gray-700">
            ✔ Química
          </p>

          <p className="font-bold text-green-700 mt-4">
            Desde 30 €/mes
          </p>

          <p className="text-blue-700 font-semibold mt-4">
            Ver programa y precios →
          </p>
        </Link>

        <Link
          href="/cursos/acceso25"
          className="curso hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎯 Acceso Mayores de 25
          </h2>

          <p className="text-gray-700">
            ✔ Asignaturas troncales y específicas
          </p>

          <p className="text-gray-700">
            ✔ Intensivos de Química y Matemáticas
          </p>

          <p className="font-bold text-green-700 mt-4">
            Desde 30 €/mes
          </p>

          <p className="text-blue-700 font-semibold mt-4">
            Ver programa y precios →
          </p>
        </Link>

      </div>

      <div className="my-16 border-t"></div>

      <h2 className="text-3xl font-bold text-blue-900 mb-8">
        Cursos disponibles
      </h2>

      {!cursosAdmin || cursosAdmin.length === 0 ? (

        <div className="curso text-center">

          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            Próximamente
          </h3>

          <p className="text-gray-600">
            Estamos preparando nuevos cursos. Muy pronto estarán disponibles.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cursosAdmin.map((curso) => (

            <div
              key={curso.id}
              className="curso hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >

              {curso.imagen && (
                <Image
                  src={curso.imagen}
                  alt={curso.titulo}
                  width={500}
                  height={300}
                  className="rounded-xl w-full h-56 object-cover mb-5"
                />
              )}

              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                {curso.titulo}
              </h3>

              <p className="text-gray-700 mb-4">
                {curso.descripcion}
              </p>

              {curso.precio && (
                <p className="text-2xl font-bold text-green-700 mb-5">
                  {curso.precio} €
                </p>
              )}

              {curso.video && (
                <Link
                  href={curso.video}
                  className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Ver curso
                </Link>
              )}

            </div>

          ))}

        </div>

      )}

    </main>
  );
}