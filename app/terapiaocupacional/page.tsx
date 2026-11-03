import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

export const metadata = {
  title: "Terapia Ocupacional | Mente Abierta",
  description:
    "Terapia ocupacional y apoyo especializado para mejorar la autonomía, participación y desarrollo de cada persona, con intervención adaptada a sus necesidades.",
};

const whatsappUrl = `https://wa.me/34604332608?text=${encodeURIComponent(
  "Hola, me gustaría recibir información sobre los servicios de Academia Mente Abierta."
)}`;

const ayudamos = [
  "Terapia ocupacional infantil",
  "Terapia ocupacional para mayores",
  "Neurorrehabilitación",
  "Adaptaciones del hogar",
  "Promoción de la salud y bienestar: escuela de espalda",
  "Asesoramiento a familias",
];

const situaciones = [
  {
    title: "🧠 ¿Tu hijo tiene dificultades en el día a día?",
    items: [
      "Dificultades para vestirse",
      "Dificultades en la alimentación o rechazo a determinadas texturas",
      "Problemas de atención o aprendizaje",
      "Necesita apoyo para ganar autonomía",
    ],
  },
  {
    title: "💪 ¿Tu familiar ha perdido capacidades?",
    items: [
      "Después de un ictus",
      "Tras una lesión neurológica",
      "Necesita recuperar autonomía",
      "Tiene dificultades en actividades cotidianas",
    ],
  },
  {
    title: "👴 ¿Has notado cambios en una persona mayor?",
    items: [
      "Ya no hace cosas que antes hacía sola",
      "Se desorienta",
      "Tiene dificultades para organizar tareas",
      "Ha perdido autonomía",
    ],
  },
];

const incluyen = [
  "Vídeos",
  "Material descargable",
  "Casos prácticos",
  "Recursos complementarios",
  "Acceso permanente",
  "Seguimiento y asesoramiento individualizado en casos reales",
];

const cardClass =
  "group block bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden lg:hover:-translate-y-1 hover:shadow-2xl transition duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300";

const imgClass =
  "rounded-xl sm:rounded-2xl shadow-lg object-cover w-full max-w-md h-44 sm:h-60 lg:h-auto";

const listClass =
  "grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-gray-700 text-[15px] sm:text-base leading-snug mb-6 sm:mb-8";

const btnClass =
  "flex sm:inline-flex w-full sm:w-auto justify-center items-center min-h-[48px] bg-blue-700 group-hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition";

export default function TerapiaOcupacional() {
  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* CABECERA */}
        <h1
          className="font-extrabold text-center text-blue-900 mb-3 sm:mb-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 7vw, 3rem)" }}
        >
          Academia MENTE ABIERTA
        </h1>

        <p className="text-center text-base sm:text-lg text-gray-600 max-w-4xl mx-auto mb-4 sm:mb-6 leading-7">
          Ayudamos a niños y jóvenes, adultos y personas mayores a ganar
          autonomía y participar en las actividades que dan sentido a su día a
          día.
        </p>

        <p className="text-center text-sm sm:text-lg text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-16 leading-7">
          Valoración e intervención individualizada · Asesoramiento a familias ·
          Adaptación del entorno
        </p>

        {/* TARJETA SESIONES */}
        <ScrollReveal>
          <Link href="/sesiones" className={`${cardClass} mb-8 sm:mb-14`}>
            <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-10 p-4 sm:p-8">
              {/* Imagen */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <Image
                  src="/rehabilitacion.jpeg"
                  alt="Rehabilitación"
                  width={500}
                  height={350}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={imgClass}
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight">
                  Sesiones de Terapia Ocupacional
                </h2>

                <p className="text-gray-700 mb-5 sm:mb-6 leading-7">
                  Especialistas en atención temprana y rehabilitación,
                  neurodesarrollo, envejecimiento y demencias.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
                  ¿En qué te podemos ayudar?
                </h3>

                <ul className={listClass}>
                  {ayudamos.map((t) => (
                    <li key={t}>✔ {t}</li>
                  ))}
                </ul>

                {/* Situaciones: cajas separadas en móvil, dos columnas en escritorio */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {situaciones.map((s) => (
                    <div
                      key={s.title}
                      className="grid md:grid-cols-2 gap-2 md:gap-4 rounded-xl bg-blue-50/60 p-4 text-gray-700"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-blue-700 leading-snug">
                        {s.title}
                      </h3>

                      <ul className="list-disc pl-5 space-y-1 text-[15px] sm:text-base text-gray-600 leading-snug">
                        {s.items.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <span className={btnClass}>Más información →</span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center mb-8 sm:mb-14 max-w-3xl mx-auto">
          <p className="text-lg sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6 leading-snug">
            ¿No sabes si la Terapia Ocupacional puede ayudarte? Cuéntanos qué
            te está ocurriendo y valoraremos contigo cómo podemos ayudarte.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex sm:inline-flex w-full sm:w-auto justify-center items-center min-h-[56px] bg-green-600 hover:bg-green-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition"
          >
            Cuéntanos tu caso por WhatsApp
          </a>
        </div>

        {/* TARJETA CURSOS */}
        <ScrollReveal>
          <Link href="/cursosterapia" className={cardClass}>
            <div className="flex flex-col-reverse lg:flex-row items-center gap-5 sm:gap-10 p-4 sm:p-8">
              {/* Contenido */}
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6 leading-tight">
                  ¿Eres familiar y profesional y quieres aprender más?
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
                  Disponemos de cursos dirigidos a familias y profesionales.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
                  Incluyen
                </h3>

                <ul className={listClass}>
                  {incluyen.map((t) => (
                    <li key={t}>✔ {t}</li>
                  ))}
                </ul>

                <span className={btnClass}>Ver cursos →</span>
              </div>

              {/* Imagen */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <Image
                  src="/demencias.jpeg"
                  alt="Cursos online"
                  width={500}
                  height={350}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={imgClass}
                />
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </main>
  );
}