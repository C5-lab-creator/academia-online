import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Academia MENTE ABIERTA</h1>

      <h1>Nuestros servicios</h1>

      {/* TARJETA ACADEMIA */}
      <div className="card flex items-start gap-8">
        <div className="flex-1">
          <Link href="/clases">
            <h3>ACADEMIA Y CLASES PARTICULARES</h3>

            <p>Especialistas en Selectividad (PAU), Química y Matemáticas.</p>

            <p>
              En nuestra academia acompañamos a cada estudiante para que alcance
              su máximo potencial mediante una enseñanza cercana, práctica y
              personalizada.
            </p>

            <p>
              Somos especialistas en la preparación de la Prueba de Acceso a la
              Universidad (PAU), ofreciendo clases particulares, programas
              intensivos y una planificación estratégica para afrontar los
              exámenes con seguridad y confianza.
            </p>

            <p>
              Contamos con profesorado especializado, destacando la preparación
              de Química y otras asignaturas del ámbito científico.
            </p>
          </Link>

          <h3>Además, ofrecemos:</h3>

          <ul>
            <li>Refuerzo escolar desde Primaria hasta Bachillerato.</li>
            <li>Preparación intensiva para Selectividad.</li>
            <li>Apoyo universitario en Química y Ciencias.</li>
            <li>Atención al alumnado con necesidades educativas especiales.</li>
            <li>Clases particulares individuales y en grupos reducidos.</li>
            <li>Cursos grabados.</li>
            <li>Técnicas de estudio y planificación del aprendizaje.</li>
          </ul>
        </div>

        <div className="w-80 flex-shrink-0">
          <Image
            src="/clases.jpeg"
            alt="Clases online"
            width={350}
            height={250}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* TARJETA CURSOS */}
      <div className="card flex items-start gap-8 mt-8">
        <div className="flex-1">
          <Link href="/cursos">
            <h3>CURSOS</h3>

            <p>
              Tenemos cursos grabados para poder aprender a tu ritmo y según tu
              disponibilidad.
            </p>

            <p>
              ¿Quieres acceder a contenidos educativos en cualquier momento y
              desde cualquier lugar?
            </p>

            <p>
              En nuestra plataforma de cursos grabados ofrecemos una amplia
              variedad de contenidos educativos.
            </p>

            <p>
              Desde cursos de refuerzo escolar hasta programas especializados en
              Selectividad y Ciencias.
            </p>

            <p>
              Accede a lecciones detalladas, ejercicios prácticos y recursos
              complementarios.
            </p>

            <p>
              Aprende cuando quieras y donde quieras, sin comprometer la calidad
              de tu educación.
            </p>
          </Link>
        </div>

        <div className="w-80 flex-shrink-0">
          <Image
            src="/cursos.jpeg"
            alt="Cursos grabados"
            width={350}
            height={250}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </main>
  );
}