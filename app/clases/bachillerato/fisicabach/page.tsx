import Link from "next/link";
export default function FisicaBachillerato() {
  return (
    <main>
      <h1>🎓 Fisica</h1>

      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de fisica para estudiantes de Bachillerato.</p>
       <p>Desarrollo de esquemas y  conceptos esenciales</p>
       <p>Resolucion de ejercicios y modelos de exámenes para obtener resultados exitosos.</p>


    <div className="cursos-grid">
       <Link href="/clases/bachillerato/fisicabach/1bach" className="curso">
          <h2>🎓 1º bachillerato</h2>
          <p>Refuerzo durante todo el año</p>
       </Link>
         <Link href="/clases/bachillerato/fisicabach/2bach" className="curso">
         <h2>🎓 2º bachillerato y PAU</h2>
         <p>Refuerzo durante todo el año y peparacion PAU</p>
       </Link>
       </div>

    </main>
  );
}