import Link from "next/link";
import Image from "next/image";

export default function Academia() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Academia MENTE ABIERTA
      </h1>

      <h2 className="text-2xl font-semibold text-center text-blue-800 mb-10">
        Nuestros servicios
      </h2>

      {/* TARJETA ACADEMIA */}
      <div className="card flex flex-col md:flex-row items-center gap-8 mb-10">

        <div className="flex-1">
          <Link href="/clases">

            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              ACADEMIA Y CLASES PARTICULARES
            </h3>

            <p className="mb-3 text-gray-700">
              Especialistas en Selectividad (PAU), Química y Matemáticas.
            </p>

            <p className="mb-3 text-gray-700">
              En nuestra academia acompañamos a cada estudiante para que alcance
              su máximo potencial mediante una enseñanza cercana, práctica y
              personalizada.
            </p>

            <p className="mb-3 text-gray-700">
              Somos especialistas en la preparación de la Prueba de Acceso a la
              Universidad (PAU), ofreciendo clases particulares, programas
              intensivos y una planificación estratégica para afrontar los
              exámenes con seguridad y confianza.
            </p>

            <p className="mb-3 text-gray-700">
              Contamos con profesorado especializado, destacando la preparación
              de Química y otras asignaturas del ámbito científico.
            </p>

          </Link>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-900">
            Además, ofrecemos:
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Refuerzo escolar desde Primaria hasta Bachillerato.</li>
            <li>Preparación intensiva para Selectividad.</li>
            <li>Apoyo universitario en Química y Ciencias.</li>
            <li>Atención al alumnado con necesidades educativas especiales.</li>
            <li>Clases particulares individuales y en grupos reducidos.</li>
            <li>Cursos grabados.</li>
            <li>Técnicas de estudio y planificación del aprendizaje.</li>
          </ul>
        </div>

        <div className="w-full md:w-80 flex justify-center">
          <Image
            src="/clases.jpeg"
            alt="Clases online"
            width={350}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full max-w-sm"
          />
        </div>

      </div>

      {/* TARJETA CURSOS */}

      <div className="card flex flex-col md:flex-row items-center gap-8">

        <div className="flex-1">

          <Link href="/cursos">

            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              CURSOS
            </h3>

            <p className="mb-3 text-gray-700">
              Tenemos cursos grabados para poder aprender a tu ritmo y según tu
              disponibilidad.
            </p>

            <p className="mb-3 text-gray-700">
              ¿Quieres acceder a contenidos educativos en cualquier momento y
              desde cualquier lugar?
            </p>

            <p className="mb-3 text-gray-700">
              En nuestra plataforma de cursos grabados ofrecemos una amplia
              variedad de contenidos educativos.
            </p>

            <p className="mb-3 text-gray-700">
              Desde cursos de refuerzo escolar hasta programas especializados en
              Selectividad y Ciencias.
            </p>

            <p className="mb-3 text-gray-700">
              Accede a lecciones detalladas, ejercicios prácticos y recursos
              complementarios.
            </p>

            <p className="text-gray-700">
              Aprende cuando quieras y donde quieras, sin comprometer la calidad
              de tu educación.
            </p>

          </Link>

        </div>

        <div className="w-full md:w-80 flex justify-center">
          <Image
            src="/cursos.jpeg"
            alt="Cursos grabados"
            width={350}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full max-w-sm"
          />
        </div>

      </div>

    </main>
  );
}