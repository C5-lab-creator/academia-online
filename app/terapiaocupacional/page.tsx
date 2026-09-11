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
          Ayudamos a niños y jóvenes, adultos y personas mayores a ganar autonomía y participar en las actividades que dan sentido a su día a día. 
         </p>
         <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto mb-16">
          Valoración e intervención individualizada · Asesoramiento a familias · Adaptación del entorno 
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
                Especialistas en atención temprana y rehabilitación, neurodesarrollo, envejecimiento y demencias
              </p>

              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                ¿En qué te podemos ayudar?
              </h3>

              <ul className="grid md:grid-cols-2 gap-2 text-gray-700 mb-8">
                <li>✔ Terapia ocupacional infantil</li>
                <li>✔ Terapia ocupacional para mayores.</li>
                <li>✔ Neurorrehabilitación</li>
                <li>✔ Adaptaciones del hogar</li>
                <li>✔ Promoción de la salud y bienestar: escuela de espalda.</li>
                <li>✔ Asesoramiento a familias</li>
  
              </ul>
        <div className="grid md:grid-cols-2 gap-2 text-gray-700 mb-8">

            <h3 className="text-xl font-bold text-blue-700 mb-4">🧠
              ¿Tu hijo tiene dificultades en el día a día?
            </h3>

            <ul className="text-gray-500">
              <li>Dificultades para vestirse</li>
              <li>Dificultades en la alimentación, rechazo a texturas o determinados alimentos, etc.</li>
              <li>Problemas de atención o aprendizaje</li>
              <li>Necesita apoyo para ganar autonomía, etc.</li>
            </ul>
        </div>
        
        <div className="grid md:grid-cols-2 gap-2 text-gray-700 mb-8">

            <h3 className="text-xl font-bold text-blue-700 mb-4">
              ¿Tu familiar ha perdido capacidades?
            </h3>

            <ul className="text-gray-500">💪
              <li>Después de un ictus</li>
              <li>Tras una lesión neurológica</li> 
              <li>Necesita recuperar autonomía</li> 
              <li>Tiene dificultades en actividades cotidianas.</li>
            </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-2 text-gray-700 mb-8">

            <h3 className="text-xl font-bold text-blue-700 mb-4">👴
              ¿Has notado cambios en una persona mayor?
            </h3>

            <ul className="text-gray-500">
              <li>Ya no hace cosas que antes hacía sola</li>
              <li>Se desorienta</li>
              <li>Tiene dificultades para organizar tareas</li>
              <li>Ha perdido autonomía</li>
            </ul>
        
        </div>
              <Link
                href="/sesiones"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Más información →
              </Link>

            </div>

          </div>

        </section>
                {/* CTA */}

        <div className="text-center mb-14">

          <Link href="https://wa.me/34604332608?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20los%20servicios%20de%20Academia%20Mente%20Abierta."
      target="_blank">
            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              ¿No sabes si la Terapia Ocupacional puede ayudarte? Cuéntanos qué te está ocurriendo y valoraremos contigo cómo podemos ayudarte.
            </button>
          </Link>

        </div>

        {/* TARJETA CURSOS */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition duration-300">

          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 p-8">

            {/* Contenido */}
            <div className="flex-1">

              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                ¿Eres familiar y profesional y quieres aprender más?
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
                <li>✔ Vídeos.</li>
                <li>✔ Material descargable.</li>
                <li>✔ Casos prácticos.</li>
                <li>✔ Recursos complementarios.</li>
                <li>✔ Acceso permanente.</li>
                <li>✔ Seguimiento y asesoramiento individualizado en casos reales</li>
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