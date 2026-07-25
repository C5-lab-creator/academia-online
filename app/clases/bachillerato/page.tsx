import Link from "next/link";
export default function QuimicaBachillerato() {
  return (
    <main>
    <h1>🎓 Bachillerato</h1>

      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de Química y otras asignaturas científicas para estudiantes de Bachillerato.</p>
       <p>Desarrollo de esquemas y  conceptos esenciales</p>
       <p>Resolucion de ejercicios y modelos de exámenes</p>

       
    <div className="cursos-grid">
     <Link href="/clases/bachillerato/quimicabach" className="curso">
          <h2>🎓 Quimica</h2>
            <p>Refuerzo de la asignatura todo el año</p>
     </Link> 
          <Link href="/clases/bachillerato/matematicasbach" className="curso">
      <h2>🎓 Matematicas</h2>
           <p>Refuerzo de la asignatura todo el año</p>
     </Link>
     <Link href="/clases/bachillerato/fisicabach" className="curso">
         <h2>🎓 Fisica</h2>
            <p>Refuerzo de la asignatura todo el año</p>
     </Link>
    </div>

    </main>
  );
}