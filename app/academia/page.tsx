import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

export const metadata = {
  title: "Academia Online | Bachillerato, PAU y Refuerzo Educativo | Mente Abierta",
  description:
    "Academia online con clases y cursos de Química, Matemáticas y refuerzo educativo para Bachillerato, PAU y universidad. Aprende con apoyo personalizado y a tu ritmo.",
};

const ofrecemosClases = [
  "Refuerzo escolar.",
  "Preparación para Selectividad.",
  "Clases de Física y Química.",
  "Clases de Matemáticas.",
  "Apoyo universitario.",
  "Atención a alumnado con NEE.",
  "Clases individuales.",
  "Grupos reducidos.",
  "Técnicas de estudio.",
  "Planificación del aprendizaje.",
];

const incluyenCursos = [
  "Vídeos en alta calidad.",
  "Aprende a tu ritmo.",
  "Material descargable.",
  "Casos prácticos.",
  "Recursos complementarios.",
  "Acceso desde cualquier dispositivo.",
  "Formación flexible.",
  "Acceso permanente.",
  "Tutorías individuales.",
];

const cardClass =
  "group block bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden lg:hover:-translate-y-1 hover:shadow-2xl transition duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300";

const imgClass =
  "rounded-xl sm:rounded-2xl shadow-lg object-cover w-full max-w-md h-44 sm:h-60 lg:h-auto";

const listClass =
  "grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-gray-700 text-[15px] sm:text-base leading-snug mb-6 sm:mb-8";

const btnClass =
  "flex sm:inline-flex w-full sm:w-auto justify-center items-center min-h-[48px] bg-blue-700 group-hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition";

export default function Academia() {
  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* CABECERA */}
        <h1
          className="font-extrabold text-center text-blue-900 mb-3 sm:mb-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 7vw, 3rem)" }}
        >
          ACADEMIA MENTE ABIERTA
        </h1>

        <p className="text-center text-base sm:text-lg text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-10 leading-7">
          Formación personalizada para estudiantes de todas las edades.
          Ofrecemos clases particulares, preparación para Selectividad (PAU),
          cursos online y apoyo especializado para ayudarte a alcanzar tus
          objetivos académicos con una metodología práctica, cercana y eficaz.
        </p>

        {/* TARIFAS */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <a
            href="/TARIFAS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto justify-center items-center min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
          >
            📄 Tarifas curso 2026/27
          </a>
        </div>

        {/* TARJETA ACADEMIA */}
        <Link href="/clases" className={`${cardClass} mb-8 sm:mb-14`}>
          <section>
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-10 p-4 sm:p-8">
                {/* Imagen */}
                <div className="w-full lg:w-2/5 flex justify-center">
                  <Image
                    src="/clases.jpeg"
                    alt="Clases online"
                    width={500}
                    height={350}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={imgClass}
                  />
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0 w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight">
                    Academia Online y Clases Particulares
                  </h2>

                  <p className="text-gray-700 mb-3 sm:mb-4 leading-7">
                    Especialistas en la preparación de la Prueba de Acceso a la
                    Universidad (PAU), Química y Matemáticas.
                  </p>

                  <p className="text-gray-700 mb-3 sm:mb-4 leading-7">
                    Acompañamos a cada estudiante con una enseñanza
                    personalizada, adaptándonos a sus necesidades para mejorar
                    el rendimiento académico y alcanzar sus objetivos.
                  </p>

                  <p className="text-gray-700 mb-5 sm:mb-6 leading-7">
                    Nuestro profesorado cuenta con amplia experiencia en la
                    enseñanza de Ciencias y en la preparación de exámenes
                    oficiales.
                  </p>

                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
                    ¿Qué ofrecemos?
                  </h3>

                  <ul className={listClass}>
                    {ofrecemosClases.map((t) => (
                      <li key={t}>✔ {t}</li>
                    ))}
                  </ul>

                  {/* Botón visual, sin enlace anidado */}
                  <span className={btnClass}>Más información →</span>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </Link>

        {/* TARJETA CURSOS */}
        <Link href="/cursos" className={cardClass}>
          <section>
            <ScrollReveal>
              <div className="flex flex-col-reverse lg:flex-row items-center gap-5 sm:gap-10 p-4 sm:p-8">
                {/* Contenido */}
                <div className="flex-1 min-w-0 w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight">
                    Clases Online sin profesor
                  </h2>

                  <p className="text-gray-700 mb-3 sm:mb-4 leading-7">
                    Aprende a tu ritmo con nuestros cursos grabados disponibles
                    las 24 horas del día.
                  </p>

                  <p className="text-gray-700 mb-3 sm:mb-4 leading-7">
                    Accede desde cualquier lugar y en cualquier momento a
                    contenidos de alta calidad diseñados por profesionales.
                  </p>

                  <p className="text-gray-700 mb-5 sm:mb-6 leading-7">
                    Disponemos de cursos de refuerzo escolar, Selectividad,
                    Ciencias y más formación especializada.
                  </p>

                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
                    Incluyen
                  </h3>

                  <ul className={listClass}>
                    {incluyenCursos.map((t) => (
                      <li key={t}>✔ {t}</li>
                    ))}
                  </ul>

                  {/* Botón visual, sin enlace anidado */}
                  <span className={btnClass}>Ver cursos →</span>
                </div>

                {/* Imagen */}
                <div className="w-full lg:w-2/5 flex justify-center">
                  <Image
                    src="/cursos.jpeg"
                    alt="Cursos online"
                    width={500}
                    height={350}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={imgClass}
                  />
                </div>
              </div>
            </ScrollReveal>
          </section>
        </Link>
      </div>
    </main>
  );
}