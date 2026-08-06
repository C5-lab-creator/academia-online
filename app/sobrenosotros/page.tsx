import Image from "next/image";

export default function Equipo() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* CABECERA */}
        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-4">
          NUESTRO EQUIPO. NUESTRA FILOSOFÍA
        </h1>

        <h2 className="text-center text-xl text-gray-600 max-w-4xl mx-auto mb-10">
          Aprender, crecer y desarrollar el potencial de cada persona.
        </h2>


        {/* INTRODUCCIÓN */}
        <div className="max-w-5xl mx-auto text-gray-700 text-lg leading-relaxed mb-16">

          <p className="mb-5">
            En Mente Abierta creemos que la educación, la ciencia y el desarrollo
            cognitivo son herramientas capaces de transformar vidas. Por ello,
            hemos creado un espacio online donde unimos la excelencia académica,
            la intervención especializada y el acompañamiento personalizado para
            ofrecer una respuesta integral a las necesidades de cada persona.
          </p>

          <p className="mb-5">
            Nuestro proyecto nace de la unión de dos ámbitos complementarios:
            la educación y la terapia ocupacional.
          </p>

          <p className="mb-5">
            Esta combinación nos permite acompañar tanto a estudiantes que desean
            alcanzar sus metas académicas como a niños, adultos y personas mayores
            que buscan potenciar, mantener o recuperar sus capacidades cognitivas.
          </p>

          <p className="mb-5">
            Creemos en una atención cercana, rigurosa y adaptada a cada persona.
            Apostamos por una enseñanza de calidad, programas personalizados y
            una metodología basada en la evidencia científica.
          </p>

          <p>
            Cada persona tiene un potencial único. Nuestro compromiso es
            proporcionar las herramientas necesarias para desarrollarlo con
            confianza, autonomía y éxito.
          </p>

        </div>


        {/* TARJETAS EQUIPO */}
        <div className="grid lg:grid-cols-2 gap-10">


          {/* SHEILA */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition duration-300">

            <div className="p-8 text-center">

              <Image
                src="/sheila.jpg"
                alt="Sheila"
                width={260}
                height={260}
                className="rounded-2xl shadow-lg object-cover mx-auto mb-6"
              />

              <h2 className="text-3xl font-bold text-blue-900 mb-3">
                Sheila
              </h2>

              <h3 className="text-lg font-semibold text-gray-600 mb-6">
                Graduada en Terapia Ocupacional.
                Formación completa en Integración Sensorial por USC.
              </h3>


              <p className="text-gray-700 text-left mb-4">
                Cuento con 4 años de experiencia en atención temprana,
                intervención directa, desarrollo de programas personalizados y
                asesoramiento a familias.
              </p>

              <p className="text-gray-700 text-left mb-4">
                Estoy especializada en infancia y envejecimiento normal y
                patológico, estimulación cognitiva en demencias, trastornos del
                neurodesarrollo, neurorrehabilitación e integración sensorial.
              </p>

              <p className="text-gray-700 text-left mb-4">
                Desarrollo programas personalizados dirigidos a niños, adultos y
                personas mayores trabajando memoria, atención, funciones
                ejecutivas, lenguaje y otras capacidades cognitivas.
              </p>

              <p className="text-gray-700 text-left">
                Además, ofrezco orientación y asesoramiento a familias para
                favorecer la continuidad de la intervención en el entorno
                cotidiano.
              </p>

            </div>

          </section>



          {/* EDUARDO */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition duration-300">

            <div className="p-8 text-center">

              <Image
                src="/eduardo.jpg"
                alt="Eduardo"
                width={260}
                height={260}
                className="rounded-2xl shadow-lg object-cover mx-auto mb-6"
              />


              <h2 className="text-3xl font-bold text-blue-900 mb-3">
                Eduardo
              </h2>

              <h3 className="text-lg font-semibold text-gray-600 mb-6">
                Graduado en Química · Máster en Profesorado · Profesor de
                Química y Ciencias
              </h3>


              <p className="text-gray-700 text-left mb-4">
                Cuento con más de 8 años de experiencia en la preparación de
                estudiantes de Bachillerato y Universidad en academias
                presenciales y online.
              </p>

              <p className="text-gray-700 text-left mb-4">
                Ofrezco una metodología clara, práctica y orientada a conseguir
                los mejores resultados académicos adaptándome a las necesidades
                de cada estudiante.
              </p>

              <p className="text-gray-700 text-left">
                Especialista en la preparación de la Prueba de Acceso a la
                Universidad (PAU) y en la enseñanza de Química y otras materias
                del ámbito científico.
              </p>


            </div>

          </section>


        </div>

      </div>
    </main>
  );
}