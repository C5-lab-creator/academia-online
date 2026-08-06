import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function CursosTerapia() {

  const { data: cursosAdmin } = await supabase
    .from("cursosterapia")
    .select("*");


  return (

    <main className="max-w-7xl mx-auto px-6 py-8">


      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Cursos de Terapia Ocupacional
      </h1>


      <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-10">
        Formación online dirigida a familiares, profesionales y cualquier
        persona interesada en la salud, la rehabilitación y la promoción de la
        autonomía. Aprende a tu ritmo con acceso permanente al contenido.
      </p>



      <h2 className="text-3xl font-bold text-blue-900 mb-8">
        Cursos destacados
      </h2>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">



        <Link
          href="/cursosterapia/demencias"
          className="curso bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition"
        >

          <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
            <Image
  src="/demencias.jpeg"
  alt="Curso de Alzheimer y otras demencias"
  width={600}
  height={300}
  className="w-full h-48 object-cover"
/>
          </div>


          <div className="p-6">

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              🧠 Alzheimer y otras demencias
            </h2>


            <p className="text-gray-700">
              ✔ Formación para familiares.
            </p>

            <p className="text-gray-700">
              ✔ Formación para profesionales.
            </p>


            <p className="text-blue-700 font-semibold mt-4">
              Ver programa y precios →
            </p>

          </div>

        </Link>




        <Link
          href="/cursosterapia/autismo"
          className="curso bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition"
        >

          <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
            <Image
  src="/autismo.jpeg"
  alt="Curso de Autismo"
  width={600}
  height={300}
  className="w-full h-48 object-cover"
/>
          </div>


          <div className="p-6">


            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              🧩 Autismo
            </h2>


            <p className="text-gray-700">
              ✔ Procesamiento sensorial.
            </p>

            <p className="text-gray-700">
              ✔ Actividades de la vida diaria.
            </p>

            <p className="text-gray-700">
              ✔ Estrategias de intervención.
            </p>


            <p className="text-blue-700 font-semibold mt-4">
              Ver programa y precios →
            </p>


          </div>


        </Link>





        <Link
          href="/cursosterapia/escuela-espalda"
          className="curso bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition"
        >


          <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
            <Image
  src="/bienestar.jpeg"
  alt="Curso de Bienestar y Prevención"
  width={600}
  height={300}
  className="w-full h-48 object-cover"
/>
          </div>



          <div className="p-6">


            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              🦴 Bienestar y prevención
            </h2>


            <p className="text-gray-700">
              ✔ Escuela de espalda.
            </p>


            <p className="text-gray-700">
              ✔ Prevención del dolor y mejora de la movilidad.
            </p>


            <p className="text-gray-700">
              ✔ Envejecimiento activo.
            </p>



            <p className="text-blue-700 font-semibold mt-4">
              Ver programa y precios →
            </p>


          </div>


        </Link>


      </div>





      <div className="my-16 border-t"></div>





      <h2 className="text-3xl font-bold text-blue-900 mb-8">
        Más cursos
      </h2>





      {!cursosAdmin || cursosAdmin.length === 0 ? (


        <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100 text-center p-8">


          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            Próximamente
          </h3>


          <p className="text-gray-600">
            Estamos preparando nuevos cursos de formación. Muy pronto estarán
            disponibles.
          </p>


        </div>



      ) : (


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


          {cursosAdmin.map((curso) => (


            <div
              key={curso.id}
              className="curso bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition"
            >


              {curso.imagen && (

                <Image
                  src={curso.imagen}
                  alt={curso.titulo}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover"
                />

              )}



              <div className="p-6">


                <h2 className="text-2xl font-bold text-blue-900 mb-3">
                  {curso.titulo}
                </h2>



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


            </div>


          ))}


        </div>


      )}


    </main>

  );

}