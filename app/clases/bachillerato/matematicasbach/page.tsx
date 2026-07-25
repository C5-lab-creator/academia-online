import Link from "next/link";
export default function MatematicasBachillerato() {
  return (
    <main>
      <h1>🎓 Matematicas</h1>

      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de matematicas para estudiantes de Bachillerato.</p>
       <p> Desarrollo esquemas y  conceptos esenciales asi como resolucion de ejercicios y modelos de exámenes para obtener resultados exitosos.</p>

    <div className="cursos-grid">
       <Link href="/clases/bachillerato/matematicasbach/primero" className="curso">
          <h2>🎓 1º bachillerato</h2>
          <p>Refuerzo durante todo el año</p>
       </Link>
         <Link href="/clases/bachillerato/matematicasbach/segundo" className="curso">
         <h2>🎓 2º bachillerato y PAU</h2>
         <p>Refuerzo durante todo el año y peparacion PAU</p>
       </Link>
       </div>

    </main>
  );
}