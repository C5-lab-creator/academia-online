import Link from "next/link";
import Image from "next/image";
export const metadata = {
  title: "Terapia Ocupacional | Mente Abierta",
  description:
    "Terapia ocupacional y apoyo especializado para mejorar la autonomía, participación y desarrollo de cada persona, con intervención adaptada a sus necesidades."
};
export default function Academia() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* CABECERA */}
        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-4">
          Academia MENTE ABIERTA
        </h1>

        <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto mb-16">
          Formación personalizada para personas en todas las etapas de la vida.
          Ofrecemos sesiones individuales, asesoramiento a familias,
          cursos online y apoyo especializado para ayudarte a alcanzar tus objetivos.
        </p>

        {/* TARJETA SESIONES */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition duration-300 mb-14">

          <div className="flex flex-col lg:flex-row items-center gap-10 p-8">

            {/* Imagen */}
            <div className="w-full lg:w-2/5 flex justify-center">
              <Image
                src="/rehabilitacion.jpeg"
                alt="Rehabilitacion"
                width={500}
                height={350}
                className="rounded-2xl shadow-lg object-cover w-full max-w-md"
              />
            </div>

            {/* Contenido */}
            <div className="flex-1">

              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                Sesiones de Terapia Ocupacional
              </h2>

              <p className="text-gray-700 mb-4">
                Especialistas en atención temprana y rehabilitación, neurodesarrollo y demencias
              </p>

              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                ¿Qué ofrecemos?
              </h3>

              <ul className="grid md:grid-cols-2 gap-2 text-gray-700 mb-8">
                <li>✔ Apoyo alumnado con necesidades educativas especiales</li>
                <li>✔ Asesoramiento a familias</li>
                <li>✔ Rehabilitación física y promoción de la autonomía</li>
                <li>✔ Programas escuela de espalda.</li>
                <li>✔ Estimulación cognitiva en demencias.</li>
                <li>✔ Atención a alumnado con NEE.</li>
              </ul>

              <Link
                href="/sesiones"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Más información →
              </Link>

            </div>

          </div>

        </section>

        {/* TARJETA CURSOS */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition duration-300">

          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 p-8">

            {/* Contenido */}
            <div className="flex-1">

              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                Cursos online
              </h2>

              <p className="text-gray-700 mb-4">
                Aprende a tu ritmo con nuestros cursos grabados disponibles
                las 24 horas del día.
              </p>

              <p className="text-gray-700 mb-4">
                Accede desde cualquier lugar y en cualquier momento a contenidos
                de alta calidad diseñados por profesionales.
              </p>

              <p className="text-gray-700 mb-6">
                Disponemos de cursos dirigidos a familias y profesionales.
              </p>

              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Incluyen
              </h3>

              <ul className="grid md:grid-cols-2 gap-2 text-gray-700 mb-8">
                <li>✔ Vídeos en alta calidad.</li>
                <li>✔ Aprende a tu ritmo.</li>
                <li>✔ Material descargable.</li>
                <li>✔ Casos prácticos.</li>
                <li>✔ Recursos complementarios.</li>
                <li>✔ Acceso desde cualquier dispositivo.</li>
                <li>✔ Formación flexible.</li>
                <li>✔ Acceso permanente.</li>
                <li>✔ Seguimiento y asesoramiento individualizado</li>
              </ul>

              <Link
                href="/cursosterapia"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Ver cursos →
              </Link>

            </div>

            {/* Imagen */}
            <div className="w-full lg:w-2/5 flex justify-center">
              <Image
                src="/demencias.jpeg"
                alt="Cursos online"
                width={500}
                height={350}
                className="rounded-2xl shadow-lg object-cover w-full max-w-md"
              />
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}