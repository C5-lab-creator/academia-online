
import Image from "next/image";

export const metadata = {
  title: "Nuestro equipo | Mente Abierta Academia",
  description:
    "Conoce al equipo de Mente Abierta. Educación, terapia ocupacional, integración sensorial, estimulación cognitiva y atención personalizada.",
};

const team = [
  {
    name: "Sheila",
    image: "/sheila.jpg",
    alt: "Sheila, terapeuta ocupacional",
    role: "Graduada en Terapia Ocupacional",
    specialty:
      "Formación completa en Integración Sensorial por USC",
    paragraphs: [
      "Cuento con 4 años de experiencia en atención temprana, intervención directa, desarrollo de programas personalizados y asesoramiento a familias.",
      "Estoy especializada en infancia y envejecimiento normal y patológico, estimulación cognitiva en demencias, trastornos del neurodesarrollo, neurorrehabilitación e integración sensorial.",
      "Desarrollo programas personalizados dirigidos a niños, adultos y personas mayores trabajando memoria, atención, funciones ejecutivas, lenguaje y otras capacidades cognitivas.",
      "Además, ofrezco orientación y asesoramiento a familias para favorecer la continuidad de la intervención en el entorno cotidiano.",
    ],
    tags: [
      "Terapia ocupacional",
      "Integración sensorial",
      "Estimulación cognitiva",
      "Neurorrehabilitación",
    ],
  },
  {
    name: "Eduardo",
    image: "/eduardo.jpg",
    alt: "Eduardo, profesor de Química",
    role: "Graduado en Química",
    specialty:
      "Máster en Profesorado · Profesor de Química y Ciencias",
    paragraphs: [
      "Cuento con más de 8 años de experiencia en la preparación de estudiantes de Bachillerato y Universidad en academias presenciales y online.",
      "Ofrezco una metodología clara, práctica y orientada a conseguir los mejores resultados académicos adaptándome a las necesidades de cada estudiante.",
      "Especialista en la preparación de la Prueba de Acceso a la Universidad (PAU) y en la enseñanza de Química y otras materias del ámbito científico.",
    ],
    tags: [
      "Química",
      "Bachillerato",
      "Universidad",
      "Preparación PAU",
    ],
  },
];

export default function Equipo() {
  return (
    <main className="min-h-screen bg-[#f6f9f7] text-slate-700">

      {/* DECORACIÓN SUPERIOR */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#eaf3f5] via-white to-[#edf5ec]">

        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="mx-auto max-w-4xl text-center">

            <span className="mb-6 inline-flex items-center rounded-full border border-green-200 bg-white/80 px-5 py-2 text-sm font-semibold tracking-wide text-green-800 shadow-sm">
              MENTE ABIERTA ACADEMIA
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#173c58] sm:text-5xl md:text-6xl">
              Nuestro equipo.
              <span className="block text-[#729d68]">
                Nuestra filosofía.
              </span>
            </h1>

            <div className="mx-auto my-7 h-1 w-20 rounded-full bg-[#91b66c]" />

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Aprender, crecer y desarrollar el potencial de cada persona.
              Un equipo comprometido con la educación, la salud y el
              bienestar.
            </p>

          </div>
        </div>
      </div>


      {/* INTRODUCCIÓN */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_10px_45px_rgba(30,64,90,0.06)]">

          <div className="grid md:grid-cols-[5px_1fr]">

            <div className="bg-gradient-to-b from-[#719b72] to-[#b4ce8c]" />

            <div className="p-8 md:p-12">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#789b70]">
                Quiénes somos
              </span>

              <h2 className="mb-7 mt-3 text-3xl font-bold text-[#173c58] md:text-4xl">
                Un espacio para aprender y desarrollarse
              </h2>

              <div className="space-y-5 text-base leading-8 text-slate-600 md:text-lg">

                <p>
                  En Mente Abierta creemos que la educación, la ciencia y
                  el desarrollo cognitivo son herramientas capaces de
                  transformar vidas. Por ello, hemos creado un espacio
                  online donde unimos la excelencia académica, la
                  intervención especializada y el acompañamiento
                  personalizado para ofrecer una respuesta integral a
                  las necesidades de cada persona.
                </p>

                <p>
                  Nuestro proyecto nace de la unión de dos ámbitos
                  complementarios: la educación y la terapia ocupacional.
                </p>

                <p>
                  Esta combinación nos permite acompañar tanto a
                  estudiantes que desean alcanzar sus metas académicas
                  como a niños, adultos y personas mayores que buscan
                  potenciar, mantener o recuperar sus capacidades
                  cognitivas.
                </p>

                <p>
                  Creemos en una atención cercana, rigurosa y adaptada a
                  cada persona. Apostamos por una enseñanza de calidad,
                  programas personalizados y una metodología basada en
                  la evidencia científica.
                </p>

                <p className="font-medium text-[#315c4a]">
                  Cada persona tiene un potencial único. Nuestro
                  compromiso es proporcionar las herramientas necesarias
                  para desarrollarlo con confianza, autonomía y éxito.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* EQUIPO */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="mb-12 text-center">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#789b70]">
            Las personas detrás del proyecto
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#173c58] md:text-4xl">
            Conoce a nuestro equipo
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">
            Profesionales con formación y experiencia, unidos por
            una misma forma de entender el aprendizaje y el desarrollo
            personal.
          </p>

        </div>


        <div className="grid items-stretch gap-8 lg:grid-cols-2">

          {team.map((person) => (
            <article
              key={person.name}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_12px_40px_rgba(30,64,90,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(30,64,90,0.13)]"
            >

              {/* FRANJA SUPERIOR */}
              <div className="h-2 bg-gradient-to-r from-[#719b72] via-[#9dbb83] to-[#d5e6c0]" />

              <div className="flex flex-1 flex-col p-7 sm:p-10">

                {/* FOTO */}
                <div className="mb-7 flex justify-center">

                  <div className="rounded-[2rem] bg-gradient-to-br from-[#dcebd5] to-[#e2edf3] p-2 shadow-inner">

                    <Image
                      src={person.image}
                      alt={person.alt}
                      width={260}
                      height={260}
                      className="h-48 w-48 rounded-[1.5rem] object-cover sm:h-56 sm:w-56"
                    />

                  </div>
                </div>


                {/* NOMBRE Y PROFESIÓN */}
                <div className="mb-8 text-center">

                  <h3 className="text-3xl font-extrabold tracking-tight text-[#173c58]">
                    {person.name}
                  </h3>

                  <div className="mx-auto my-4 h-1 w-12 rounded-full bg-[#91b66c]" />

                  <p className="text-lg font-bold text-[#648b65]">
                    {person.role}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {person.specialty}
                  </p>

                </div>


                {/* DESCRIPCIÓN */}
                <div className="flex-1 space-y-5 border-t border-slate-100 pt-7">

                  {person.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}

                </div>


                {/* ESPECIALIDADES */}
                <div className="mt-8 border-t border-slate-100 pt-7">

                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    Áreas de especialización
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {person.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#dcebd5] bg-[#f1f7ed] px-4 py-2 text-sm font-medium text-[#42684c]"
                      >
                        {tag}
                      </span>
                    ))}

                  </div>
                </div>

              </div>
            </article>
          ))}

        </div>
      </section>


     

{/* CIERRE */}
<section className="!bg-gradient-to-r !from-[#173c58] !to-[#285b60] rounded-3xl px-6 py-20 text-center shadow-lg">

  <div className="mx-auto max-w-3xl">

    <h2
      className="!text-white text-3xl font-extrabold leading-tight md:text-4xl"
      style={{ color: "#ffffff" }}
    >
      En Mente Abierta, creemos en tu potencial.
    </h2>

    <p
      className="!text-white mt-6 text-lg leading-relaxed md:text-xl"
      style={{ color: "#ffffff" }}
    >
      Educación, acompañamiento y atención personalizada para
      ayudarte a avanzar y alcanzar tus objetivos.
    </p>

    <div className="mx-auto mt-9 h-1 w-16 rounded-full bg-[#b3d28b]" />

  </div>
</section>


    </main>
  );
}
