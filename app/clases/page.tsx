import Link from "next/link";

export default function Clases() {
  return (
    <main>
      <h1>Nuestras clases</h1>

      <div className="cursos">

  <Link href="/clases/bachillerato" className="curso">
    <h2>🎓 Bachillerato</h2>
    <p>Química y asignaturas científicas</p>
    <p>Preparación para la PAU.</p>
    <p>Selectividad</p>
  </Link>

  <Link href="/clases/universidad" className="curso">
    <h2>🧪 Universidad</h2>
    <p>Clases particulares para estudiantes de grados y asignaturas relacionadas con Química y ciencias.</p>
  </Link>

  <Link href="/clases/primaria-eso" className="curso">
    <h2>📖 Primaria y ESO</h2>
    <p>Refuerzo de todas las materias.</p>
  </Link>

  <div className="curso">
    <h2>👥 Grupales</h2>
    <p>Grupos reducidos de 3 a 5 alumnos.</p>
  </div>

  <Link href="/clases/alumnos-nee" className="curso">
    <h2>🧩 Alumnos con NEE</h2>
    <p>TEA</p>
    <p>TDAH</p>
    <p>Dificultades en el aprendizaje</p>
    <p>Adaptaciones y estrategias para el aprendizaje</p>
    <p>Asesoramiento personalizado</p>
  </Link>

</div>
    </main>
  );
  }
