import Link from "next/link";

export const metadata = {
  title: "Colaboraciones | Academia Mente Abierta",
  description:
    "Colaboraciones de Mente Abierta con asociaciones, centros, entidades y profesionales para ofrecer apoyo especializado, talleres, formación e intervención a medida.",
};

export default function Colaboraciones() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* CABECERA */}
        <section className="mb-12 rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="flex flex-col items-center gap-10">
            <div className="w-full">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-blue-900 md:text-5xl">
                Colaboraciones. Sumando recursos para seguir cuidando y
                acompañando
              </h1>

              <p className="text-lg leading-8 text-gray-700">
                En Mente Abierta creemos que el trabajo conjunto permite
                ofrecer una atención más completa, personalizada y adaptada a
                las necesidades de cada persona.
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-700">
                Por eso, colaboramos con asociaciones, centros, entidades,
                profesionales y otros proyectos que trabajan con personas,
                familias y colectivos que pueden beneficiarse de nuestros
                servicios.
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-700">
                Nuestro objetivo no es sustituir los recursos que ya existen,
                sino complementarlos y aportar nuevas posibilidades de
                intervención, apoyo y formación.
              </p>
            </div>
          </div>
        </section>

        {/* TARJETAS */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* SERVICIOS */}
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-blue-900">
              Servicios y apoyo especializado
            </h2>

            <p className="mb-4 leading-7 text-gray-700">
              Podemos colaborar con vuestra entidad ofreciendo servicios
              especializados en función de las necesidades de las personas
              usuarias. Las intervenciones pueden plantearse de forma puntual
              o continuada, adaptándonos a las características de cada entidad
              y colectivo.
            </p>

            <p className="mb-4 font-semibold text-gray-800">
              Entre nuestras áreas de trabajo se encuentran:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>• Terapia Ocupacional.</li>
              <li>• Autonomía y actividades de la vida diaria.</li>
              <li>• Neurodesarrollo.</li>
              <li>
                • Apoyo a personas con necesidades educativas especiales.
              </li>
              <li>• Apoyo educativo y refuerzo.</li>
              <li>• Estimulación cognitiva.</li>
              <li>
                • Intervención y acompañamiento en procesos de deterioro
                cognitivo.
              </li>
              <li>• Orientación y apoyo a familias.</li>
              <li>• Rehabilitación y promoción de la autonomía.</li>
            </ul>
          </article>

          {/* TALLERES */}
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-blue-900">
              Talleres y actividades
            </h2>

            <p className="mb-4 leading-7 text-gray-700">
              También podemos desarrollar talleres, charlas y actividades
              específicas para personas usuarias, familias, profesionales o
              grupos.
            </p>

            <p className="mb-4 font-semibold text-gray-800">
              Algunas posibilidades son:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>• Talleres de estimulación cognitiva.</li>
              <li>
                • Actividades para trabajar memoria, atención y funciones
                ejecutivas.
              </li>
              <li>
                • Talleres de autonomía y habilidades para la vida diaria.
              </li>
              <li>
                • Actividades relacionadas con organización y planificación.
              </li>
              <li>
                • Talleres y actividades para personas con necesidades
                educativas especiales.
              </li>
              <li>• Actividades relacionadas con neurodesarrollo.</li>
              <li>• Formación y orientación para familias.</li>
              <li>• Charlas y talleres dirigidos a profesionales.</li>
              <li>• Actividades educativas y de apoyo al aprendizaje.</li>
            </ul>

            <p className="mt-6 leading-7 text-gray-700">
              Las propuestas pueden diseñarse a medida, teniendo en cuenta las
              necesidades, edades y características del grupo.
            </p>
          </article>

          {/* PROYECTOS */}
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-blue-900">
              Proyectos y colaboraciones a medida
            </h2>

            <p className="mb-4 leading-7 text-gray-700">
              Cada entidad tiene unas necesidades diferentes. Por eso, también
              estamos abiertos a desarrollar colaboraciones específicas y
              proyectos conjuntos, desde actividades puntuales hasta programas
              de intervención más continuados.
            </p>

            <p className="mb-4 font-semibold text-gray-800">
              Podemos estudiar conjuntamente propuestas como:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>• Colaboraciones profesionales.</li>
              <li>• Programas específicos.</li>
              <li>• Actividades periódicas.</li>
              <li>• Talleres.</li>
              <li>• Formación.</li>
              <li>• Intervenciones puntuales.</li>
              <li>• Proyectos conjuntos.</li>
            </ul>

            <p className="mt-6 leading-7 text-gray-700">
              La modalidad puede ser presencial, online o combinada, y también
              podemos desplazarnos cuando el proyecto lo requiera.
            </p>
          </article>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-blue-900">
            Una colaboración adaptada a cada entidad
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-700">
            No buscamos ofrecer una propuesta cerrada.
            Preferimos conocer primero qué hacéis, a quién atendéis y cuáles son vuestras necesidades para valorar de qué manera Mente Abierta puede aportar valor.
            Podemos trabajar junto a los profesionales y recursos que ya forman parte de vuestra entidad, estableciendo una colaboración flexible y coordinada.
            Porque colaborar no significa hacer lo mismo.
            Significa sumar.
          </p>
        </section>

<section className="mt-16 rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-blue-900">
            ¿Trabajamos juntos?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-700">
            Si sois una asociación, centro, entidad, profesional o proyecto y creéis que puede existir un punto de encuentro, nos encantará conocer vuestra propuesta.
            Cuéntanos brevemente qué hacéis y qué tipo de colaboración tenéis en mente.
            Estudiaremos vuestra propuesta y nos pondremos en contacto para valorar las posibilidades.
          </p>

        </section>
        
        <section className="mt-16 rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-blue-900">
            ¿Hablamos de una posible colaboración?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-700">
            Cuéntanos qué necesita vuestra entidad y estudiaremos juntos la
            forma de colaboración que mejor se adapte a las personas y
            colectivos con los que trabajáis.
          </p>

          <Link
            href="/contacto"
            className="inline-block rounded-2xl bg-green-600 px-10 py-5 text-xl font-bold text-white transition hover:bg-green-700"
          >
            Solicitar asesoramiento
          </Link>
        </section>
      </div>
    </main>
  );
}