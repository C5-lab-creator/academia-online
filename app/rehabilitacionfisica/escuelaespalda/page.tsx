import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contactForm";

export default function Escuelaespalda() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Escuela de Espalda
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Nuestro programa de Escuela de Espalda está diseñado para prevenir
                y tratar el dolor de espalda mediante ejercicio terapéutico,
                educación postural y entrenamiento funcional, ayudando a mejorar
                la movilidad, disminuir el dolor y favorecer una vida más activa
                y saludable.
              </p>

              <Link href="/reservas?servicio=escuelaespalda">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una valoración
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/escuelaespalda.jpeg"
                alt="Escuela de espalda"
                width={450}
                height={320}
                className="rounded-2xl shadow-lg object-cover w-full"
              />

            </div>

          </div>

        </div>

        {/* SERVICIOS */}

        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          ¿Qué ofrecemos?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-14">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🩺</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Valoración inicial
            </h3>

            <p className="text-gray-700 leading-7">
              Evaluación funcional completa para conocer las necesidades de cada
              persona y diseñar un tratamiento totalmente personalizado.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🏃</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Intervención personalizada
            </h3>

            <p className="text-gray-700 leading-7">
              Programas de ejercicio terapéutico, fortalecimiento,
              flexibilización y entrenamiento funcional adaptados a cada caso.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Seguimiento y asesoramiento
            </h3>

            <p className="text-gray-700 leading-7">
              Educación, recomendaciones y seguimiento para mantener los
              resultados obtenidos y prevenir recaídas.
            </p>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            ¿Cómo trabajamos?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">

            <ul className="space-y-4">
              <li>✅ Valoración inicial.</li>
              <li>✅ Análisis de la postura y movilidad.</li>
              <li>✅ Objetivos individualizados.</li>
              <li>✅ Ejercicio terapéutico.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Educación postural.</li>
              <li>✅ Ergonomía en actividades de la vida diaria.</li>
              <li>✅ Seguimiento personalizado.</li>
              <li>✅ Prevención de recaídas.</li>
            </ul>

          </div>

        </div>

        {/* ÁREAS DE INTERVENCIÓN */}

        <div className="bg-blue-900 text-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            ¿En qué podemos ayudarte?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-lg">

            <p>✔ Dolor de espalda.</p>
            <p>✔ Educación postural.</p>
            <p>✔ Ergonomía en las actividades de la vida diaria.</p>
            <p>✔ Artritis y artrosis.</p>
            <p>✔ Disfunciones musculares.</p>
            <p>✔ Mejora de la postura y la movilidad.</p>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-14">

          <Link href="/reservas?servicio=escuelaespalda">

            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Reservar una valoración
            </button>

          </Link>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si tienes cualquier duda sobre nuestro programa de Escuela de
            Espalda o deseas recibir asesoramiento personalizado, estaremos
            encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}