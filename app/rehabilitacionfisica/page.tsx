import Link from "next/link";
import Image from "next/image";
export const metadata = {
  title: "Mente Abierta | Academia y Terapia Ocupacional",
  description:
    "Centro de Terapia Ocupacional dirigdo al aprendizaje o reaprendizaje de habilidades tras patologías neurológicas (ictus, esclerosis múltiple, etc.). Promoción de autonomía y bienestar personal a través de programas específicos (escuela de espalda, etc.) ",
};
export default function RehabilitacionFisica() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
         REHABILITACIÓN FÍSICA Y PROMOCIÓN DE LA AUTONOMÍA
      </h1>

      <div className="space-y-5 text-gray-700 text-base md:text-lg mb-12">

        <p>
En Mente Abierta ofrecemos programas de rehabilitación física y promoción de la autonomía dirigidos a personas de todas las edades que desean mejorar su movilidad, reducir el dolor, recuperar capacidades funcionales o mantener su independencia en las actividades de la vida diaria.        </p>

        <p>
          Nuestro objetivo es ayudarte a alcanzar el mayor nivel posible de bienestar y autonomía mediante una intervención individualizada, adaptada a tus necesidades, objetivos y ritmo de recuperación.
        </p>

        <p>
          Trabajamos desde un enfoque integral, basado en la evidencia científica y centrado en la persona, diseñando programas específicos para mejorar la fuerza, el equilibrio, la coordinación, la flexibilidad, la resistencia y el control postural, favoreciendo una mejor calidad de vida.
        </p>

        <p>
          Las sesiones pueden realizarse de forma presencial u online, facilitando el acceso al tratamiento desde cualquier lugar.
        </p>

      </div>


{/* REHABILITACIÓN */}

<div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
  <div className="flex flex-col md:flex-row items-center gap-8">

    <div className="flex-1">

      <Link href="/rehabilitacionfisica/rehabilitacion">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 hover:text-blue-600 transition">
          REHABILITACIÓN FÍSICA
        </h2>
      </Link>

      <ul className="list-disc pl-6 space-y-3 text-gray-700">
        <li>
          Evaluación funcional. Realizamos una valoración completa para
          identificar las capacidades, limitaciones y objetivos de cada
          persona, elaborando un plan de intervención personalizado.
        </li>

        <li>
          Intervención especializada para personas con patologías neurológicas:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Daño cerebral adquirido.</li>
            <li>Enfermedad de Parkinson.</li>
            <li>Esclerosis múltiple.</li>
            <li>Otras enfermedades neurológicas.</li>
          </ul>
        </li>

        <li>
          Trabajamos para mejorar la movilidad, el equilibrio, la coordinación y
          la independencia funcional en las actividades de la vida diaria.
        </li>

        <li>
          Programas personalizados para personas con:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Artritis.</li>
            <li>Artrosis.</li>
            <li>Dolores musculares y articulares.</li>
            <li>Lesiones y limitaciones funcionales.</li>
          </ul>
        </li>

        <li>Asesoramiento y acompañamiento a familias.</li>

      </ul>

    </div>

    <div className="w-full md:w-96 flex justify-center">
      <Image
        src="/rehabilitacion.jpeg"
        alt="Rehabilitación física"
        width={450}
        height={300}
        className="rounded-2xl shadow-lg object-cover w-full"
      />
    </div>

  </div>
</div>

{/* ESCUELA DE ESPALDA */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <div className="flex flex-col md:flex-row items-center gap-8">

    <div className="flex-1">

      <Link href="/rehabilitacionfisica/escuelaespalda">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 hover:text-blue-600 transition">
          ESCUELA DE ESPALDA Y PROGRAMAS DE BIENESTAR Y PREVENCIÓN
        </h2>
      </Link>

      <ul className="list-disc pl-6 space-y-3 text-gray-700">

        <li>
          Programa dirigido a la prevención y tratamiento del dolor de espalda
          mediante ejercicio terapéutico, educación postural y entrenamiento
          funcional.
        </li>

        <li>
          Programas personalizados para mantener una buena condición física,
          prevenir el deterioro funcional y fomentar hábitos saludables.
        </li>

        <li>
          Promoción del envejecimiento activo y mejora de la calidad de vida.
        </li>

        <li>
          Asesoramiento y acompañamiento a familias para favorecer la continuidad
          del tratamiento en el domicilio.
        </li>

        <li>
          Intervenciones centradas en mejorar la autonomía, la independencia y el
          bienestar físico.
        </li>

      </ul>

    </div>

    <div className="w-full md:w-96 flex justify-center">

      <Image
        src="/escuelaespalda.jpeg"
        alt="Escuela de espalda"
        width={450}
        height={300}
        className="rounded-2xl shadow-lg object-cover w-full"
      />

    </div>

  </div>

</div>


    </main>
  );
}