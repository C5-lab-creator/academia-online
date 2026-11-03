import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Clases Online de Bachillerato, PAU y universidad | Academia Mente Abierta",
  description:
    "Clases online de Química y Matemáticas para Bachillerato, PAU y universidad, con apoyo personalizado, resolución de ejercicios y preparación de exámenes.",
};

const whatsappUrl = `https://wa.me/34604332608?text=${encodeURIComponent(
  "Hola, me gustaría recibir información sobre los servicios de Academia Mente Abierta."
)}`;

const tarjetas = [
  {
    href: "/clases/bachillerato",
    icon: "🎓",
    title: "Bachillerato",
    text: "Química, Matemáticas, Física y preparación específica para la PAU.",
  },
  {
    href: "/clases/universidad",
    icon: "🧪",
    title: "Universidad",
    text: "Química Analítica, Orgánica, Física, Bioquímica, Ciencia de los Materiales, Química General e Inorgánica.",
  },
  {
    href: "/clases/pruebasdeacceso",
    icon: "🎯",
    title: "Pruebas de Acceso +25",
    text: "Preparación personalizada para superar las pruebas de acceso a la universidad.",
  },
  {
    href: "/clases/uned",
    icon: "🏫",
    title: "UNED",
    text: "Clases particulares para asignaturas de Física y Química de la UNED.",
  },
  {
    href: "/clases/formacionprofesional",
    icon: "📚",
    title: "Formación Profesional",
    text: "Apoyo en asignaturas científicas adaptado a cada ciclo formativo.",
  },
  {
    href: "/clases/primaria-eso",
    icon: "📖",
    title: "Primaria y ESO",
    text: "Refuerzo escolar personalizado en todas las materias.",
  },
  {
    href: "/clases/grupos",
    icon: "👥",
    title: "Clases grupales",
    text: "Grupos reducidos de entre 3 y 5 alumnos para favorecer un aprendizaje dinámico, participativo y personalizado.",
  },
  {
    href: "/clases/alumnos-nee",
    icon: "🧩",
    title: "Alumnado con NEE",
    text: "Intervención educativa adaptada para:",
    list: ["TEA", "TDAH", "Dificultades de aprendizaje", "Adaptaciones personalizadas"],
  },
];

const ventajas = [
  { icon: "⭐", title: "Atención personalizada", text: "Cada alumno recibe un plan adaptado a sus necesidades." },
  { icon: "💻", title: "Clases Online", text: "Aprende desde cualquier lugar con pizarra digital." },
  { icon: "📅", title: "Horarios flexibles", text: "Adaptamos las clases a tu disponibilidad." },
  { icon: "🎯", title: "Objetivos reales", text: "Preparación para aprobar y mejorar el rendimiento académico." },
];

export default function Clases() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50 via-white to-green-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* CABECERA */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight">
                📚 Nuestras Clases
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8">
                Ofrecemos clases particulares totalmente personalizadas para
                todas las etapas educativas. Desde Primaria hasta Universidad,
                pasando por Bachillerato, Formación Profesional, UNED,
                preparación de pruebas de acceso y apoyo especializado para
                alumnado con necesidades educativas especiales.
              </p>
            </div>

            <div className="w-full md:w-96">
              <Image
                src="/clases.jpeg"
                alt="Clases particulares"
                width={450}
                height={320}
                sizes="(max-width: 768px) 100vw, 384px"
                className="rounded-xl sm:rounded-2xl shadow-lg object-cover w-full h-44 sm:h-60 md:h-auto"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <a
              href="/TARIFAS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto justify-center items-center min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              📄 Tarifas curso 2026/27
            </a>
          </div>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {tarjetas.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="curso !p-5 sm:!p-6 lg:hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-4">{t.icon}</div>

              <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4 leading-tight">
                {t.title}
              </h2>

              <p className={`text-gray-700 leading-7 ${t.list ? "mb-3" : ""}`}>{t.text}</p>

              {t.list && (
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {t.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>

        {/* VENTAJAS */}
        <div className="mt-12 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-6 sm:mb-10 leading-tight">
            ¿Por qué elegir Mente Abierta?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {ventajas.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center"
              >
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-4">{v.icon}</div>

                <h3 className="font-bold text-blue-900 mb-2 sm:mb-3 leading-tight">
                  {v.title}
                </h3>

                <p className="text-gray-700 text-sm sm:text-base leading-snug">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-20">
          <h2 className="text-xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4 leading-snug">
            ¿No sabes qué modalidad elegir o tienes dudas sobre una asignatura
            concreta que no sale en la web?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-7">
            Pregúntanos y te asesoramos para encontrar la opción que mejor se
            adapte a tus necesidades.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex sm:inline-flex w-full sm:w-auto justify-center items-center min-h-[56px] bg-green-600 hover:bg-green-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition"
          >
            Solicitar asesoramiento
          </a>
        </div>
      </div>
    </main>
  );
}