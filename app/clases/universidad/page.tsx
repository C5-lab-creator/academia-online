import Link from "next/link";

export default function Universidad() {
  return (
    <main>
      <h1>🧪 Universidad</h1>

      <div className="curso">
        <h2>¿Qué ofrecemos?</h2>
        <p>
          Clases particulares universitarias para estudiantes de grados y
          asignaturas relacionados con Química, adaptadas a las necesidades de
          cada estudiante, con un enfoque práctico y personalizado.
        </p>
      </div>

      <div className="cursos-grid">
        <Link href="/clases/universidad/organica" className="curso">
          <h2>Química Orgánica</h2>
        </Link>

        <Link href="/clases/universidad/inorganica" className="curso">
          <h2>Química Inorgánica</h2>
        </Link>

        <Link href="/clases/universidad/quifi" className="curso">
          <h2>Química Física</h2>
        </Link>

        <Link href="/clases/universidad/analitica" className="curso">
          <h2>Química Analítica</h2>
        </Link>
      </div>
    </main>
  );
}