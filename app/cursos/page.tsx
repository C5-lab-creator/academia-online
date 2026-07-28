import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Cursos() {

  const { data: cursosAdmin } = await supabase
    .from("cursos")
    .select("*")
    .eq("publicado", true)
    .order("created_at", { ascending: false });


  return (
    <main>

      <h1>Nuestros cursos y programas</h1>

      <p>
        Cursos completos grabados a tu disposición para que puedas aprender a tu ritmo.
      </p>


      <div className="cursos">


        {/* CURSOS FIJOS */}

        <Link href="/cursos/quimica" className="curso">
          <h2>🎓 Química selectividad</h2>
          <p>Intensivos química selectividad.</p>
          <p>Preparación para la PAU.</p>
          <p>
            Pruebas de acceso universidad para mayores de 25 años.
          </p>
        </Link>



        <Link href="/cursos/demencias" className="curso">
          <h2>
            🧪 Cursos completos para familiares y profesionales de enfermos de Alzheimer y otras demencias
          </h2>

          <p>
            Programas completos para familiares.
          </p>

        </Link>



        <Link href="/cursos/autismo" className="curso">

          <h2>
            📖 Cursos completos para familiares de niños con autismo
          </h2>

          <p>
            Dificultades sensoriales (alimentación, aseo, vestido).
          </p>

          <p>
            Dificultades en la vida diaria.
          </p>

          <p>
            Dificultades conductuales.
          </p>

        </Link>



        {/* CURSOS CREADOS DESDE ADMIN */}

        {cursosAdmin?.map((curso) => (

          <div 
            key={curso.id} 
            className="curso"
          >

            {curso.imagen && (
              <img
                src={curso.imagen}
                alt={curso.titulo}
                width="300"
              />
            )}


            <h2>
              {curso.titulo}
            </h2>


            <p>
              {curso.descripcion}
            </p>


            {curso.precio && (
              <p>
                Precio: {curso.precio} €
              </p>
            )}


            {curso.video && (
              <Link href={curso.video}>
                Ver curso
              </Link>
            )}


          </div>

        ))}


      </div>


    </main>
  );
}