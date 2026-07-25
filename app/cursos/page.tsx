import Link from "next/link";
export default function Cursos() {
  return (
    <main>
      <h1>Nuestros cursos y programas</h1>
      <p>Cursos completos grabados a tu disposicion para que puedan aprender a tu ritmo</p>

      <div className="cursos">

       <Link href="/cursos/quimica" className="curso"> 
         <h2>🎓 Quimica selectividad</h2>
           <p>Intensivos quimica selectividad</p>
           <p>Preparación para la PAU.</p>
           <p>Pruebas de acceso universidad para mayores de 25 años</p>
       </Link>

  <Link href="/cursos/demencias" className="curso">
    <h2>🧪 Cursos completos para familiares y profesionales de enfermos de Alzheimer y otras demencias</h2>
     <p>Programas completos para familiares</p>
  </Link>

  <Link href="/cursos/autismo" className="curso">
    <h2>📖 Cursos completos para famiiares de niños con autismo</h2>
     <p>Dificultades sensoriales (alimentacion, aseo, vestido).</p>
     <p>Dificultades en la vida diaria</p>
     <p>Dificultades conductuales</p>
  </Link>

</div>
    </main>
  );
  }
